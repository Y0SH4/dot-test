"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { useCartStore } from "@/lib/store/useCartStore";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, 1);
  };

  return (
    <Card
      className="overflow-hidden h-full flex flex-col cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => router.push(`/products/${product.id}`)}
    >
      <div className="relative h-48 w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-lg">{product.name}</CardTitle>
        <p className="text-xl font-bold text-primary">
          {formatCurrency(product.price)}
        </p>
      </CardHeader>
      <CardContent className="p-4 pt-2 flex-grow">
        <p className="text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
