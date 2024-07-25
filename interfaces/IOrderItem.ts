import { PizzaSize } from "@/types/PizzaSize";
import { IProduct } from "./IProduct";

export interface IOrderItem {
  id: number;
  product_id: number;
  products: IProduct;
  order_id: number;
  size: PizzaSize;
  quantity: number;
}
