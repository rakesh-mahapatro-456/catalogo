import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const CheckoutModal = ({ open, onClose, onSubmit, total }) => {
  const [form, setForm] = useState({ name: "", email: "" });

  const handleSubmit = () => {
    if (!form.name || !form.email) {
      alert("Please fill in all fields");
      return;
    }
    onSubmit(form);
    setForm({ name: "", email: "" });
  };

  const handleOpenChange = (isOpen) => {
    if (!isOpen) onClose?.();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md mx-auto space-y-4">
        <DialogHeader>
          <DialogTitle>🧾 Checkout Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div>
            <Label>Name</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Enter your name"
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Enter your email"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Total: <strong>₹{total.toFixed(2)}</strong>
          </p>
        </div>

        <DialogFooter>
          <Button className="w-full" onClick={handleSubmit}>
            Confirm & Checkout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};


export default CheckoutModal;