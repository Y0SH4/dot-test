"use client";

import { useState, useEffect } from "react";
import { ProductList } from "@/components/shop/ProductList";
import { PageTitle } from "@/components/common/PageTitle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { EmptyState } from "@/components/common/EmptyState";
import { Search } from "lucide-react";

// Mock products data
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    description:
      "Premium wireless headphones with noise cancellation technology.",
    price: 2499000,
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    category: "Electronics",
    stock: 15,
  },
  {
    id: "2",
    name: "Smart Watch",
    description: "Track your fitness and stay connected with this smartwatch.",
    price: 3499000,
    imageUrl:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80",
    category: "Electronics",
    stock: 10,
  },
  {
    id: "3",
    name: "Laptop Backpack",
    description:
      "Durable backpack with padded compartments for laptop and accessories.",
    price: 899000,
    imageUrl:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
    category: "Accessories",
    stock: 25,
  },
  {
    id: "4",
    name: "Coffee Maker",
    description: "Programmable coffee maker for the perfect cup every morning.",
    price: 1299000,
    imageUrl:
      "https://images.unsplash.com/photo-1572119865084-43c285814d63?w=500&q=80",
    category: "Home",
    stock: 8,
  },
  {
    id: "5",
    name: "Desk Lamp",
    description: "Adjustable LED desk lamp with multiple brightness levels.",
    price: 599000,
    imageUrl:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80",
    category: "Home",
    stock: 20,
  },
  {
    id: "6",
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse for increased productivity.",
    price: 449000,
    imageUrl:
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&q=80",
    category: "Electronics",
    stock: 30,
  },
];

export default function ProductsPage() {
  const [products] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search - already done with state
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <PageTitle
        title="Shop Products"
        description="Browse our collection of high-quality products"
      />

      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
          <Button type="submit">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </form>
      </div>

      {filteredProducts.length > 0 ? (
        <ProductList products={filteredProducts} />
      ) : (
        <EmptyState
          message="No products found matching your search criteria."
          actionLabel="Clear Search"
          onAction={() => setSearchTerm("")}
        />
      )}
    </div>
  );
}
