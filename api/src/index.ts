import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { randomUUID } from 'node:crypto';
import { db } from './db.js';
import productsRouter from './routes/products.js';


// Beskriver en produkt som skickas från kundvagnen
interface CreateOrderItemRequest {
  productId: number;
  quantity: number;
}

// Beskriver info som frontend skickar när en order skapas
interface CreateOrderRequest {
  idempotencyKey: string;
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

app.use(cors())
app.use(express.json())

// Routes
app.use('/api/products', productsRouter)

app.get('/', (req, res) => {
  res.json({ message: 'API:et fungerar!' })
})

app.post('/api/orders', async (req, res) => {
  const orderData = req.body as CreateOrderRequest

  if (
    typeof orderData.idempotencyKey !== 'string' ||
    orderData.idempotencyKey.trim() === ''
  ) {
    return res.status(400).json({
      error: 'Beställningen saknar en giltig nyckel',
    })
  }

  const existingOrder = await db.order.findUnique({
    where: {
      idempotencyKey: orderData.idempotencyKey,
    },
  });

  if (existingOrder) {
    return res.status(200).json({
      message: 'Ordern finns redan',
      orderNumber: existingOrder.orderNumber,
      totalPrice: existingOrder.totalPrice,
    });
  }

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
  const products = await db.product.findMany({
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

  try {
    const createdOrder = await db.order.create({
      data: {
        orderNumber: orderNumber,
        idempotencyKey: orderData.idempotencyKey,
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

    return res.status(201).json({
      message: 'Order skapad',
      orderNumber: createdOrder.orderNumber,
      totalPrice: createdOrder.totalPrice,
    });
  } catch (error) {
    try {
      // Ett samtidigt anrop kan redan ha sparat ordern
      const savedOrder = await db.order.findUnique({
        where: {
          idempotencyKey: orderData.idempotencyKey,
        },
      });

      if (savedOrder) {
        return res.status(200).json({
          message: 'Ordern finns redan',
          orderNumber: savedOrder.orderNumber,
          totalPrice: savedOrder.totalPrice,
        });
      }
    } catch (lookupError) {
      console.error('Kunde inte kontrollera ordern:', lookupError);
    }

    console.error('Kunde inte spara ordern:', error);

    return res.status(500).json({
      error: 'Beställningen kunde inte sparas',
    });
  }
});



app.get('/api/orders/:orderNumber', async (req, res) => {
  const orderNumber = req.params.orderNumber;

  const order = await db.order.findUnique({
    where: {
      orderNumber: orderNumber,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) {
    return res.status(404).json({
      error: 'Ordern kunde inte hittas',
    });
  }

  return res.status(200).json(order);
});

app.listen(PORT, () => {
  console.log(`Server körs på http://localhost:${PORT}`)
})
