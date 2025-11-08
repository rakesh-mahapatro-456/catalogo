import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ReceiptModal = ({ open, onClose, receipt }) => {
  const handleOpenChange = (isOpen) => {
    if (!isOpen) onClose?.();
  };

  if (!receipt) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md mx-auto space-y-4">
        <DialogHeader>
          <DialogTitle>🎉 Checkout Successful</DialogTitle>
        </DialogHeader>

        <div className="text-sm text-muted-foreground space-y-2">
          <p><strong>Name:</strong> {receipt.name}</p>
          <p><strong>Email:</strong> {receipt.email}</p>
          <p><strong>Total:</strong> ₹{receipt.total.toFixed(2)}</p>
          <p><strong>Timestamp:</strong> {new Date(receipt.timestamp).toLocaleString()}</p>
        </div>

        <DialogFooter>
          <Button className="w-full" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};


export default ReceiptModal;