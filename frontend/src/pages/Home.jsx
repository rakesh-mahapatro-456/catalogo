import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "@/components/custom/ProductCard";
import { getProducts } from "@/store/feature/product/productThunk.js";
import { LoaderThree } from "../components/ui/loader.jsx";

export default function Home() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderThree />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
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
              <ProductCard key={prod._id} product={prod} />
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
