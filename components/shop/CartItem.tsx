"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CartItem as ICartItem } from "@/types/product";
import { useCartStore } from "@/lib/store/useCartStore";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface CartItemProps {
  item: ICartItem;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();
  const { product, quantity } = item;

  return (
    <div className="flex items-center gap-4 py-4 border-b">
      <div className="relative h-20 w-20 rounded overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-grow">
        <h3 className="font-medium">{product.name}</h3>
        <p className="text-gray-500 text-sm">{formatCurrency(product.price)}</p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => updateQuantity(product.id, quantity - 1)}
        >
          <Minus className="h-4 w-4" />
        </Button>

        <span className="w-10 text-center">{quantity}</span>

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => updateQuantity(product.id, quantity + 1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="text-right min-w-[80px]">
        <p className="font-medium">
          {formatCurrency(product.price * quantity)}
        </p>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-red-500"
        onClick={() => removeItem(product.id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
