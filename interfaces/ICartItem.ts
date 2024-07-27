import { PizzaSize } from "@/types/PizzaSize";
import { Product } from "@/types/Product";

export interface ICartItem {
  id: string;
  product: Product;
  product_id: number;
  size: PizzaSize;
  quantity: number;
}
