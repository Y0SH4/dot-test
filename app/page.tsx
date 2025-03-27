import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, ShoppingBag } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-16 md:py-24">
      <div className="container px-4 mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Manage Tasks and Shop <br className="hidden md:inline" />
          <span className="text-primary">All in One Place</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-muted-foreground">
          TaskShop combines task management and shopping, helping you organize
          your tasks and shop for your needs.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button asChild size="lg" className="text-lg">
            <Link href="/tasks">
              <CheckCircle className="mr-2 h-5 w-5" />
              Manage Tasks
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-lg">
            <Link href="/products">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Shop Now
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
