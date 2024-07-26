import { ICartItem } from "@/interfaces/ICartItem";
import { PizzaSize } from "@/types/PizzaSize";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { randomUUID } from "expo-crypto";
import { Product } from "@/types/Product";

interface ICartContext {
  items: ICartItem[];
  addItem: (product: Product, size: PizzaSize) => void;
  updateQuantity: (itemID: string, amount: -1 | 1) => void;
  total: number;
}

const CartContext = createContext<ICartContext>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
});

export default function CartProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<ICartItem[]>([]);

  const addItem = (product: Product, size: PizzaSize) => {
    const existingItem = items.find(
      (item) => item.product.name === product.name && item.size === size
    );

    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return;
    }

    const newCartItem: ICartItem = {
      id: randomUUID(),
      product,
      product_id: product.id,
      quantity: 1,
      size,
    };

    setItems((prev) => [...prev, newCartItem]);
  };

  const updateQuantity = (itemID: string, amount: -1 | 1) => {
    // console.log(itemID, amount);
    const updatedItems = items
      .map((item) =>
        item.id !== itemID
          ? item
          : { ...item, quantity: item.quantity + amount }
      )
      .filter((item) => item.quantity > 0);

    setItems(updatedItems);
  };

  const total = items.reduce(
    (sum, item) => (sum += item.product.price * item.quantity),
    0
  );

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, total }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
