import { supabase } from "@/lib/supabase";
import { useMutation } from "@tanstack/react-query";
import { TablesInsert } from "@/database.types";

type InsertOrder = TablesInsert<"order_items">;

export const useInsertOrderItems = () => {
  return useMutation({
    async mutationFn(items: InsertOrder[]) {
      const { data: newProduct, error } = await supabase
        .from("order_items")
        .insert(items)
        .select();

      if (error) {
        throw new Error(error.message);
      }

      return newProduct;
    },
  });
};
