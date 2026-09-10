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

  return res.status(200).json({
    message: 'Orderdata mottagen',
    order: orderData,
  })

})

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});