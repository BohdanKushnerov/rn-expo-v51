import { PizzaSize } from "@/types/PizzaSize";
import { Product } from "@/types/Product";

export interface IOrderItem {
  id: number;
  product_id: number;
  product: Product;
  order_id: number;
  size: PizzaSize;
  quantity: number;
}
