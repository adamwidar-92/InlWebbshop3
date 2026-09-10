import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { randomUUID } from 'node:crypto';


// Beskriver en produkt som skickas från kundvagnen
interface CreateOrderItemRequest {
  productId: number;
  quantity: number;
}

// Beskriver info som frontend skickar när en order skapas
interface CreateOrderRequest {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  items: CreateOrderItemRequest[];
}
// Skapar ett unikt ordernummer
function createOrderNumber(): string {
  return `ORD-${randomUUID().toUpperCase()}`;
}
const app = express();
const PORT = process.env.PORT || 3000;
// Skapar anslutningen till DB
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/orders', async (req, res) => {
  const orderData = req.body as CreateOrderRequest

  const deliveryFields = [
    orderData.customerName,
    orderData.email,
    orderData.phone,
    orderData.address,
  ]

  const hasInvalidDeliveryDetails = deliveryFields.some(
    (field) => typeof field !== 'string' || field.trim() === ''
  )
  if (hasInvalidDeliveryDetails) {
    return res.status(400).json({
      error: "Alla leveransuppgifter måste fyllas i",
    })
  }
  // Kontrollerar att kundvagnen innehåller minst en produkt
  if (!Array.isArray(orderData.items) || orderData.items.length === 0) {
    return res.status(400).json({
      error: 'Kundvagnen måste innehålla minst en produkt',
    });
  }

  // Kontrollerar att varje orderrad har giltig produkt-id och antal
  const hasInvalidItem = orderData.items.some(
    (item) =>
      !Number.isInteger(item.productId) ||
      item.productId <= 0 ||
      !Number.isInteger(item.quantity) ||
      item.quantity <= 0
  );
  if (hasInvalidItem) {
    return res.status(400).json({
      error: 'Varje produkt måste ha ett giltigt produkt-id och antal',
    });
  }
  // Hämtar alla produkt idn som kunden vill beställa
  const productIds = orderData.items.map((item) => item.productId)
  // Hämtar samma produkter från DB
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });

  const hasMissingProduct = orderData.items.some(
    (item) => !products.some((product) => product.id === item.productId)
  );
  if (hasMissingProduct) {
    return res.status(400).json({
      error: 'En eller flera produkter finns inte',
    });
  }

  // Beräknar orderns totalpris med priser från DB
  let totalPrice = 0;

  for (const item of orderData.items) {
    const product = products.find(
      (product) => product.id === item.productId
    );
    if (product) {
      totalPrice = totalPrice + product.price * item.quantity;
    }
  }

  // Förbereder orderraderna som sparas i DB
  const itemsToCreate = orderData.items.map((item) => {
    const product = products.find(
      (product) => product.id === item.productId
    );

    if (!product) {
      throw new Error("Produkten kunde inte hittas");
    }

    return {
      quantity: item.quantity,
      price: product.price,
      productId: item.productId,
    };
  });

  const orderNumber = createOrderNumber();

  // Sparar ordern och orderraderna i DB
  const createdOrder = await prisma.order.create({
    data: {
      orderNumber: orderNumber,
      customerName: orderData.customerName,
      email: orderData.email,
      phone: orderData.phone,
      address: orderData.address,
      totalPrice: totalPrice,
      items: {
        create: itemsToCreate,
      },
    },
  });

  // 201 betyder att ordern är skapad
  return res.status(201).json({
    message: 'Order skapad',
    orderNumber: createdOrder.orderNumber,
    totalPrice: createdOrder.totalPrice,
  });

})

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});