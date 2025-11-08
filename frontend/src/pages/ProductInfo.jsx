import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductsById } from "@/store/feature/product/productThunk";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Package, IndianRupee, ShoppingCart, AlertCircle,FileText } from "lucide-react";
import {clearSelectedProduct} from "@/store/feature/product/productSlice.js";
import { LoaderThree } from "../components/ui/loader.jsx";
import { addToCart } from "@/store/feature/cart/cartThunk.js";
import { toast } from "sonner";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(clearSelectedProduct());
    if (id) dispatch(getProductsById(id));
  }, [dispatch, id]);

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  const handleAdd = (prod) => {
    dispatch(addToCart({ productId: prod._id, qty: 1 }));
    toast.success(`${prod.prodName} added to cart!`);
  };

  if (loading) {
        return (
          <div className="flex items-center justify-center h-screen">
            <LoaderThree />
          </div>
        );
      }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>{error}</span>
            <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
              Go Back
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!selectedProduct) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Alert>
          <Package className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>No product details found</span>
            <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
              Go Back
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const { prodName, description, price, stock, imageUrl, createdBy } = selectedProduct;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-2xl font-bold text-muted-foreground">Product Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Product Image */}
        <div className="lg:col-span-1">
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="relative mb-6 group">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={prodName}
                    className="w-full aspect-[4/3] object-cover rounded-lg shadow-lg transition-transform group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full aspect-[4/3] rounded-lg shadow-lg bg-gradient-to-br from-primary/20 to-primary/5 flex flex-col items-center justify-center text-primary">
                    <Package className="h-16 w-16 mb-4 opacity-40" />
                    <p className="text-center text-sm font-medium px-4 line-clamp-3">{prodName}</p>
                  </div>
                )}
                <Badge
                  variant="secondary"
                  className="absolute top-2 right-2 text-xs bg-background/90 backdrop-blur-sm"
                >
                  Stock: {stock}
                </Badge>
              </div>

              <Button
                variant="ghost"
                className="w-full gap-2"
                onClick={() => handleAdd(selectedProduct)}
              >
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Product Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl leading-tight">{prodName}</CardTitle>
              <p className="text-xl text-muted-foreground">
                Created by {createdBy?.name || "Unknown"}
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <IndianRupee className="h-4 w-4" />
                  <span>{price}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ShoppingCart className="h-4 w-4" />
                  <span>{stock} in stock</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-3">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Description
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {description || "No description available for this product."}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
