import { Item } from "./item";

export interface Order {
  orderId?: number;
  itemsCount?: number;
  userId?: number;
  items?: Item[];
  totalAmount?: number;
  address?: string;
  status?:string;
}
