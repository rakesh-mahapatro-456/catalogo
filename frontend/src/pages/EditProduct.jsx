import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductsById,
  updateProduct,
} from "@/store/feature/product/productThunk";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { LoaderThree } from "../components/ui/loader";

export default function EditProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedProduct, loading } = useSelector((state) => state.product);

  const [prodName, setProdName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  // Load product data
  useEffect(() => {
    dispatch(getProductsById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedProduct) {
      setProdName(selectedProduct.prodName || "");
      setDescription(selectedProduct.description || "");
      setPrice(selectedProduct.price || 0);
      setStock(selectedProduct.stock || 0);
      setImageUrl(selectedProduct.imageUrl || "");
    }
  }, [selectedProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        updateProduct({
          id,
          name: prodName,
          description,
          price,
          stock,
          imageUrl,
        })
      ).unwrap();

      toast("Product updated successfully!");
      navigate("/home");
    } catch (err) {
      toast("Failed to update product");
    }
  };

  if (loading || !selectedProduct) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderThree />
      </div>
    );
  }

  return (
    <form
      className="w-full min-h-full p-6 overflow-y-auto bg-background space-y-6"
      onSubmit={handleSubmit}
    >
      <h1 className="text-3xl font-bold mb-4">Edit Product</h1>
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <Label>Product Name</Label>
          <Input
            value={prodName}
            onChange={(e) => setProdName(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2 col-span-2">
          <Label>Description</Label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Price</Label>
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            min={0}
            step={0.01}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Stock</Label>
          <Input
            type="number"
            value={stock}
            onChange={(e) => setStock(parseInt(e.target.value))}
            min={0}
            required
          />
        </div>
        <div className="flex flex-col gap-2 col-span-2">
          <Label>Image URL</Label>
          <Input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>
      </div>
      <Button type="submit" className="mt-6 w-full">
        Save Product
      </Button>
    </form>
  );
}
