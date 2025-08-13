import { IProduct } from "./IProduct";

export interface IOrder {
 id: number;
  userId: number; // foreign key to the User entity
  // orderDate: Date; // unused field
  status: string;
  watches: IProduct[];
  totalAmount: number;
  shippingAddress?: string;
  billingAddress?: string;
  paymentMethod?: string;
  trackingNumber?: string;
  notes?: string;
  createdAt?: Date; // this is the order date
  currency?: string; // Currency used for the order
  paymentStatus?: string; // Status of the payment (e.g., Paid, Pending, Failed)
}
