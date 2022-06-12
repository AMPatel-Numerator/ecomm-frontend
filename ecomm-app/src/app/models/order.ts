import { Item } from "./item";

export interface Order {
  id?: number;
  number?: number;
  userId?: number;
  items?: Item[];
  totalAmount?: number;
  address?: string;
}
