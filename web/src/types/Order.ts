// importerar Product typen så att en orderrad kan innehålla produktinformation
import type { Product } from "./Product";

// Beskriver kundens leveransuppgifter
export interface DeliveryDetails {
    customerName: string;
    email: string;
    phone: string;
    address: string;
}

// Beskriver en produkt som ingår i ordern
export interface OrderItem {
    id: number;
    quantity: number;
    price: number;
    product: Product;
}

// Beskriver en fullständig order och (Extends deliverydetails) gör så att Order får kundens leveransuppgifter
export interface Order extends DeliveryDetails {
    id: number;
    orderNumber: string;
    totalPrice: number;
    createdAt: string;
    items: OrderItem[]; // En array med orderns produkter
}