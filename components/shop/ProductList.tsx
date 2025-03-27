"use client";

import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { EmptyState } from "../common/EmptyState";

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  if (products.length === 0) {
    return <EmptyState message="No products found" />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
