"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/useCartStore";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { ShoppingCart, ArrowLeft, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";

// Mock products data
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    description:
      "Premium wireless headphones with noise cancellation technology. Enjoy immersive sound quality with up to 20 hours of battery life. Includes a carrying case and charging cable.",
    price: 149.99,
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    category: "Electronics",
    stock: 15,
  },
  {
    id: "2",
    name: "Smart Watch",
    description:
      "Track your fitness and stay connected with this smartwatch. Features include heart rate monitoring, GPS, and water resistance. Compatible with iOS and Android devices.",
    price: 199.99,
    imageUrl:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80",
    category: "Electronics",
    stock: 10,
  },
  // ...rest of the products
];

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { addItem } = useCartStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const productId = params.id as string;

  useEffect(() => {
    // Simulate API call
    const loadProduct = async () => {
      try {
        setIsLoading(true);
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const foundProduct = mockProducts.find((p) => p.id === productId);

        if (!foundProduct) {
          setError("Product not found");
          return;
        }

        setProduct(foundProduct);
      } catch (error) {
        setError(`Failed to load product ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
    }
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

  if (error || !product) {
    return (
      <div className="container mx-auto py-8 px-4">
        <ErrorMessage
          title="Product Error"
          message={error || "Product not found"}
        />
        <Button className="mt-4" onClick={() => router.push("/products")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Button
        variant="ghost"
        onClick={() => router.push("/products")}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Button>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-2xl font-semibold text-primary mb-4">
            {formatCurrency(product.price)}
          </p>

          <div className="mb-6">
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm font-medium">Category:</span>
            <span className="px-2 py-1 bg-muted rounded-md text-sm">
              {product.category}
            </span>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm font-medium">Availability:</span>
            <span
              className={`text-sm ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}
            >
              {product.stock > 0
                ? `In Stock (${product.stock} available)`
                : "Out of Stock"}
            </span>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-none"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-none"
                  onClick={incrementQuantity}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full md:w-auto"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
