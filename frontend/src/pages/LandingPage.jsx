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
    <div className="min-h-screen flex flex-col">
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
            Explore & Share <span className="text-primary">Amazing Products</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Catalogo helps you discover products from around the world, list your own, and
            manage everything in one place.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => navigate("/signup")}>
              Get Started
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-5xl w-full">
          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">🛍️ Browse Products</h3>
              <p className="text-muted-foreground">
                Explore a wide variety of products added by other users.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">➕ List Your Products</h3>
              <p className="text-muted-foreground">
                Easily add your products and manage them from your dashboard.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">⚡ Quick Management</h3>
              <p className="text-muted-foreground">
                Update product info, track availability, and handle everything smoothly.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Catalogo. All rights reserved.
      </footer>
    </div>
  );
}
