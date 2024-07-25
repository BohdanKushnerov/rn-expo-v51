import { OrderStatus } from "@/types/OrderStatus";
import { IOrderItem } from "./IOrderItem";

export interface IOrder {
  id: number;
  created_at: string;
  total: number;
  user_id: string;
  status: OrderStatus;

  order_items?: IOrderItem[];
}
