import { PizzaSize } from "@/types/PizzaSize";
import { IProduct } from "./IProduct";

export interface ICartItem {
  id: string;
  product: IProduct;
  product_id: number;
  size: PizzaSize;
  quantity: number;
}
