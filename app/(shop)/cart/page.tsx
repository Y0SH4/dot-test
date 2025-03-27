"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/common/PageTitle";
import { useCartStore } from "@/lib/store/useCartStore";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { CartItem } from "@/components/shop/CartItem";
import { EmptyState } from "@/components/common/EmptyState";
import { ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { toast } from "react-hot-toast";

export default function CartPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { items, totalItems, totalPrice, clearCart } = useCartStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const handleCheckout = () => {
    toast.success(
      "Order placed successfully! This is a demo, so no actual order was placed.",
    );
    clearCart();
    router.push("/products");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <PageTitle
        title="Shopping Cart"
        description={`You have ${totalItems} item${totalItems !== 1 ? "s" : ""} in your cart`}
      />

      {items.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="border rounded-lg overflow-hidden">
              <div className="p-4 bg-muted/50 border-b">
                <h3 className="font-medium">Cart Items</h3>
              </div>

              <div className="divide-y">
                {items.map((item) => (
                  <div key={item.product.id} className="p-4">
                    <CartItem item={item} />
                  </div>
                ))}
              </div>

              <div className="p-4 border-t flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearCart}
                  className="text-red-500"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>

          <div>
            <div className="border rounded-lg overflow-hidden sticky top-20">
              <div className="p-4 bg-muted/50 border-b">
                <h3 className="font-medium">Order Summary</h3>
              </div>

              <div className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatCurrency(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between font-medium text-lg pt-3 border-t">
                    <span>Total</span>
                    <span>{formatCurrency(totalPrice)}</span>
                  </div>
                </div>

                <Button className="w-full mt-6" onClick={handleCheckout}>
                  Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  className="w-full mt-3"
                  onClick={() => router.push("/products")}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <EmptyState
          title="Your cart is empty"
          message="You haven't added any products to your cart yet."
          actionLabel="Browse Products"
          actionHref="/products"
        />
      )}
    </div>
  );
}
