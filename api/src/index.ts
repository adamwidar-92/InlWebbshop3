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

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});

