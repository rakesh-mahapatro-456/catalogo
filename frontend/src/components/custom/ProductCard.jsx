import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Pencil,
  Trash2,
  Package,
  Calendar,
  DollarSign,
  Eye,
} from "lucide-react";
import { deleteProduct } from "@/store/feature/product/productThunk.js";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "@/store/feature/product/productSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  if (!product) return null;

  // Determine if user can edit/delete
const canEditOrDelete = user?.role === "admin" ;

  return (
    <Card className="w-full h-full flex flex-col shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border rounded-xl">
      {/* Product image with Stock Badge */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <img
          src={product.imageUrl}
          alt={product.prodName}
          className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover hover:scale-105 transition-transform duration-500"
        />
        {/* Stock Badge on top-right corner */}
        <div className="absolute top-2 right-2">
          <Badge
            variant={product.stock > 0 ? "default" : "destructive"}
            className="px-1.5 py-0.5 text-xs font-medium"
          >
            {product.stock} in stock
          </Badge>
        </div>
      </div>

      {/* Title & Creator */}
      <CardHeader className="space-y-2">
        <CardTitle className="text-lg sm:text-xl font-bold leading-tight">
          {product.prodName}
        </CardTitle>
      </CardHeader>

      {/* Description + Price/Added */}
      <CardContent className="space-y-2 flex-1">
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {product.description}
        </p>

        <Separator />

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-sm font-medium">
          <div className="flex items-center gap-1 text-muted-foreground">
            <span>Price:</span>
            <span className="font-bold text-primary">
              ₹{product.price?.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center gap-1 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{new Date(product.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>

      {/* Footer Actions */}
      <CardFooter className="flex flex-wrap gap-2 pt-4 bg-muted/50">
        <Button
          variant="default"
          className="flex-1 min-w-[100px] gap-2 transition-colors"
          onClick={() => navigate(`/products/${product._id}`)}
        >
          <Eye className="h-4 w-4" />
          View
        </Button>

        {canEditOrDelete && (
          <>
            <Button
              variant="outline"
              className="flex-1 min-w-[100px] gap-2 hover:bg-accent transition-colors"
              onClick={() => navigate(`/products/edit/${product._id}`)}
            >
              <Pencil className="h-4 w-4" />
              Edit
            </Button>

            <Button
              variant="destructive"
              className="flex-1 min-w-[100px] gap-2 hover:bg-red-600 transition-colors"
              onClick={async () => {
                await dispatch(deleteProduct(product._id));
                toast(message);
                await dispatch(clearMessage());
              }}
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
