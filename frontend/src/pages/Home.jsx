import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "@/components/custom/ProductCard";
import { getProducts } from "@/store/feature/product/productThunk.js";
import { LoaderThree } from "../components/ui/loader.jsx";
import { addToCart } from "@/store/feature/cart/cartThunk.js";
import { toast } from "sonner";
import { Button } from "@/components/ui/button"; 
import {  ShoppingCart } from "lucide-react";

export default function Home() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleAdd = (productId,prodName) => {
   dispatch(addToCart({ productId, qty: 1 }));
    toast.success(`${prodName} added to cart!`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderThree />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Page Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Explore Our Products
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Browse through a variety of high-quality products just for you.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products && products.length > 0 ? (
            products.map((prod) => (
              <div
                key={prod._id}
                className="flex flex-col justify-between rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* ProductCard handles image, title, description, price */}
                <ProductCard product={prod} />

                {/* Add to Cart Button */}
                <div className="p-4 border-t border-gray-100 dark:border-gray-700">
                  <Button
                    variant="default"
                    className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                    onClick={() => handleAdd(prod._id,prod.prodName)}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 text-lg">
              No products found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
