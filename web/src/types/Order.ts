import type { Product } from "./Product";

export interface DeliveryDetails {
    customerName: string;
    email: string;
    phone: string;
    address: string;
}

export interface OrderItem {
    id: number;
    quantity: number;
    price: number;
    product: Product;
}

export interface Order extends DeliveryDetails {
    id: number;
    orderNumber: string;
    totalPrice: number;
    createdAt: string;
    items: OrderItem[];
}