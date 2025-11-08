import { Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/custom/AppSidebar";
import { SidebarTrigger } from "./components/ui/sidebar";

import ProtectedRoute from "./components/custom/ProtectedRoute";

import { getUserInfo } from "./store/feature/auth/authThunk";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

// Pages
import Home from "./pages/Home";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductInfo from "./pages/ProductInfo";
import Cart from "./pages/Cart";

import "./App.css";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Fetch user info only if authenticated and user is missing
  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(getUserInfo());
    }
  }, [isAuthenticated, user, dispatch]);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen">
        {/* Sidebar only for authenticated users */}
        {isAuthenticated && <AppSidebar />}

        {/* Main Content */}
        <main className="flex-1 h-full overflow-auto">
          {isAuthenticated && <SidebarTrigger />}

          <Routes>
            {/* Protected routes */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products/create"
              element={
                <ProtectedRoute>
                  <CreateProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products/edit/:id"
              element={
                <ProtectedRoute>
                  <EditProduct />
                </ProtectedRoute>
              }
            />

            <Route
              path="/products/:id"
              element={
                <ProtectedRoute>
                  <ProductInfo />
                </ProtectedRoute>
              }
            />

            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />

            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<LandingPage />} />

            {/* Redirect unknown routes */}
            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>
        </main>
      </div>
    </SidebarProvider>
  );
}

export default App;
