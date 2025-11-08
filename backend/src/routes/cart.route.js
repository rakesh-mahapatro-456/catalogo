import express from "express";
import {
  getCart,
  addToCart,
  removeFromCart,
  checkoutCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/", getCart);
router.post("/", addToCart);
router.delete("/:id", removeFromCart);
router.post("/checkout", checkoutCart);

export default router;
