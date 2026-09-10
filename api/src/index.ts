import cors from 'cors';
import express from 'express';


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
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/orders', (req, res) => {
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

  return res.status(200).json({
    message: 'Orderdata mottagen',
    order: orderData,
  })

})

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
})