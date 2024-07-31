import { ICartItem } from "@/interfaces/ICartItem";
import { PizzaSize } from "@/types/PizzaSize";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { randomUUID } from "expo-crypto";
import { Product } from "@/types/Product";
import { useInsertOrder } from "@/api/orders";
import { useRouter } from "expo-router";
import { Order } from "@/types/Order";
import { useInsertOrderItems } from "@/api/order-items";
import { initializePaymentSheet, openPaymentSheet } from "@/lib/stripe";

interface ICartContext {
  items: ICartItem[];
  addItem: (product: Product, size: PizzaSize) => void;
  updateQuantity: (itemID: string, amount: -1 | 1) => void;
  total: number;
  checkout: () => void;
}

const CartContext = createContext<ICartContext>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
  checkout: () => {},
});

export default function CartProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<ICartItem[]>([]);

  const { mutate: insertOrder } = useInsertOrder();
  const { mutate: insertOrderItems } = useInsertOrderItems();
  const router = useRouter();

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

  const clearCart = () => {
    setItems([]);
  };

  const checkout = async () => {
    await initializePaymentSheet(Math.floor(total * 100));
    const payed = await openPaymentSheet();

    if (!payed) return;

    insertOrder(
      { total },
      {
        onSuccess: saveOrderItems,
      }
    );
  };

  const saveOrderItems = (order: Order) => {
    const orderItems = items.map((cartItem) => ({
      order_id: order.id,
      product_id: cartItem.product_id,
      quantity: cartItem.quantity,
      size: cartItem.size,
    }));

    insertOrderItems(orderItems, {
      onSuccess: () => {
        clearCart();
        // router.push(`/(user)/orders/${order.id}`);
        router.push("/(user)/orders");
      },
    });
  };

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQuantity, total, checkout }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
