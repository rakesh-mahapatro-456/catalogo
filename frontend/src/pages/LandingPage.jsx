import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ModeToggle } from "@/components/mode-toggle";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Redirect authenticated users to /home
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navbar */}
      <header className="w-full border-b bg-background">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Catalogo</h1>

          <div className="flex items-center gap-4">
            <ModeToggle />
            <Button variant="outline" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button onClick={() => navigate("/signup")}>Sign Up</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-3xl space-y-6">
          <h2 className="text-5xl font-bold tracking-tight">
            Shop Smart with <span className="text-primary">Catalogo</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover, add, and manage products in one seamless experience — powered by MERN and ShadCN UI.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => navigate("/products")}>
              Explore Products
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-5xl w-full">
          <Card className="shadow-sm hover:shadow-md transition">
            <CardContent className="p-6 text-center space-y-2">
              <h3 className="text-xl font-semibold">🛍️ Browse Products</h3>
              <p className="text-muted-foreground">
                Explore a curated catalog of mock products with real-time listings and prices.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition">
            <CardContent className="p-6 text-center space-y-2">
              <h3 className="text-xl font-semibold">🛒 Add to Cart</h3>
              <p className="text-muted-foreground">
                Add your favorite products to the cart and track quantities effortlessly.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition">
            <CardContent className="p-6 text-center space-y-2">
              <h3 className="text-xl font-semibold">💳 Checkout</h3>
              <p className="text-muted-foreground">
                Experience a clean, mock checkout process with total summaries and receipts.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Catalogo. Built with ❤️ using MERN + ShadCN UI.
      </footer>
    </div>
  );
}
