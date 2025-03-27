import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product } from "@/types/product";
import { toast } from "react-hot-toast";

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      addItem: (product, quantity = 1) => {
        const { items } = get();
        const existingItem = items.find(
          (item) => item.product.id === product.id,
        );

        if (existingItem) {
          get().updateQuantity(product.id, existingItem.quantity + quantity);
          toast.success("Product quantity updated in cart");
        } else {
          set((state) => {
            const newItems = [...state.items, { product, quantity }];
            return {
              items: newItems,
              totalItems: calculateTotalItems(newItems),
              totalPrice: calculateTotalPrice(newItems),
            };
          });
          toast.success("Product added to cart");
        }
      },
      removeItem: (productId) => {
        set((state) => {
          const newItems = state.items.filter(
            (item) => item.product.id !== productId,
          );
          return {
            items: newItems,
            totalItems: calculateTotalItems(newItems),
            totalPrice: calculateTotalPrice(newItems),
          };
        });
        toast.success("Product removed from cart");
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => {
          const newItems = state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item,
          );
          return {
            items: newItems,
            totalItems: calculateTotalItems(newItems),
            totalPrice: calculateTotalPrice(newItems),
          };
        });
      },
      clearCart: () => {
        set({ items: [], totalItems: 0, totalPrice: 0 });
        toast.success("Cart cleared");
      },
    }),
    {
      name: "cart-storage",
    },
  ),
);

const calculateTotalItems = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.quantity, 0);
};

const calculateTotalPrice = (items: CartItem[]): number => {
  return items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
};
