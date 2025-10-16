import { ProductType } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OrderStoreType {
  products: ProductType[];
  clearOrder: () => void;
  setProducts: (products: ProductType[]) => void;
}

export const useOrder = create<OrderStoreType>()(
  persist(
    (set) => ({
      products: [],
      clearOrder: () => set({ products: [] }),
      setProducts: (product) =>
        set(() => ({
          products: product,
        })),
    }),
    { name: "order" }
  )
);

export default useOrder;