import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  removeFromCart,
  checkoutCart,
} from "@/store/feature/cart/cartThunk.js";

import { LoaderThree } from "@/components/ui/loader.jsx";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash2, ShoppingBag } from "lucide-react";

import  CheckoutModal  from "@/components/custom/CheckoutModal";
import  ReceiptModal  from "@/components/custom/ReceiptModal";

export default function Cart() {
  const dispatch = useDispatch();
  const { cart = [], total = 0, loading } = useSelector((state) => state.cart);

  const [showCheckout, setShowCheckout] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleCheckoutSubmit = async (form) => {
    const res = await dispatch(
      checkoutCart({ name: form.name, email: form.email, cartItems: cart })
    );

    if (res.payload?.receipt) {
      setReceipt(res.payload.receipt);
      setShowCheckout(false);
      setShowReceipt(true);
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
    <div className="max-w-2xl mx-auto p-6">
      <Card className="shadow-md border rounded-2xl">
        <CardHeader className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-primary" />
            Your Cart
          </h2>
          <span className="text-sm text-muted-foreground">
            {cart.length} {cart.length === 1 ? "item" : "items"}
          </span>
        </CardHeader>

        <CardContent>
          {cart.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <ShoppingBag className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p>No items in cart.</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {cart.map((item) => (
                <li
                  key={item._id}
                  className="flex justify-between items-center border rounded-xl p-3 hover:bg-muted transition"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{item.product.prodName}</span>
                    <span className="text-sm text-muted-foreground">
                      Qty: {item.qty}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-semibold">
                      ₹{(item.product.price * item.qty).toFixed(2)}
                    </span>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => dispatch(removeFromCart(item.product._id))}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>

        {cart.length > 0 && (
          <>
            <Separator className="my-4" />
            <CardFooter className="flex justify-between items-center">
              <div className="text-lg font-semibold">Total: ₹{total.toFixed(2)}</div>
              <Button
                className="bg-primary text-white hover:bg-primary/90"
                onClick={() => setShowCheckout(true)}
              >
                Checkout
              </Button>
            </CardFooter>
          </>
        )}
      </Card>

      {/* Checkout Modal */}
      <CheckoutModal
        open={showCheckout}
        onClose={() => setShowCheckout(false)}
        onSubmit={handleCheckoutSubmit}
        total={total}
      />

      {/* Receipt Modal */}
      <ReceiptModal
        open={showReceipt}
        onClose={() => setShowReceipt(false)}
        receipt={receipt}
      />
    </div>
  );
}
