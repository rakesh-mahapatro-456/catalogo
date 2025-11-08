import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "@/store/feature/product/productThunk.js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { LoaderThree } from "../components/ui/loader";
import { clearMessage } from "@/store/feature/product/productSlice";

export default function LeadForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading,message } = useSelector((state) => state.product);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    imageUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createProduct(formData));
      toast(message);
      await dispatch(clearMessage())
      navigate("/home");
    } catch (err) {
      toast("Failed to create product");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderThree />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl">
        <h1 className="text-2xl font-semibold mb-6">Create New Product</h1>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Name */}
          <div className="flex flex-col gap-2 md:col-span-2">
            <Label>Name</Label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="h-12 text-base"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2 md:col-span-2">
            <Label>Description</Label>
            <Input
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="h-12 text-base"
            />
          </div>

          {/* Price */}
          <div className="flex flex-col gap-2">
            <Label>Price</Label>
            <Input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="h-12 text-base"
            />
          </div>

          {/* Stock */}
          <div className="flex flex-col gap-2">
            <Label>Stock</Label>
            <Input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              className="h-12 text-base"
            />
          </div>

          {/* Image URL */}
          <div className="flex flex-col gap-2 md:col-span-2">
            <Label>Image URL</Label>
            <Input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              required
              className="h-12 text-base"
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-2">
            <Button type="submit" className="w-full mt-4 h-12 text-base">
              Create Product
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
