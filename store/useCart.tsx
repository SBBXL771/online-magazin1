import { ProductType } from '@/types';
import { count } from 'console';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartProduct extends ProductType {
  count: number;
}

interface CartState {
  products: CartProduct[];
  addCart: (product: ProductType) => void;
  removeProduct: (id: number) => void;
  clearCart: () => void;
  incrementProduct: (id: number) => void;
  decrementProduct: (id: number) => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      products: [],

      addCart: (product: ProductType) =>
        set((state) => {
          const foundProduct = state.products.find(
            (item) => item.id === product.id,
          );
          if (foundProduct) {
            return {
              products: state.products.map((item) =>
                item.id === product.id
                  ? { ...item, count: item.count + 1 }
                  : item,
              ),
            };
          }
          return {
            products: [...state.products, { ...product, count: 1 }],
          };
        }),

      removeProduct: (id: number) =>
        set((state) => ({
          products: state.products.filter((product) => product.id !== id),
        })),

      clearCart: () => set({ products: [] }),

      incrementProduct: (id: number) =>
        set((state) => ({
          products: state.products.map((product) =>
            product.id === id
              ? { ...product, count: product.count + 1 }
              : product,
          ),
        })),

      decrementProduct: (id: number) =>
        set((state) => ({
          products: state.products
            .map((product) =>
              product.id === id
                ? { ...product, count: product.count - 1 }
                : product,
            )
            .filter((product) => product.count > 0),
        })),
    }),
    { name: 'cart' },
  ),
);
