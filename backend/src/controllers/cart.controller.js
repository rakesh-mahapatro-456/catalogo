import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

// GET CART
export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: null }).populate("items.product");
  if (!cart) return res.json({ cart: [], total: 0 });

  res.json({
    cart: cart.items,
    total: cart.total,
  });
};

// ADD TO CART
export const addToCart = async (req, res) => {
  const { productId, qty } = req.body;

  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: "Product not found" });

  let cart = await Cart.findOne({ user: null }).populate("items.product");
  if (!cart) {
    cart = new Cart({ user: null, items: [], total: 0 });
  }

  // ✅ Check if product already exists in cart
  const existingItem = cart.items.find(
    (item) => item.product._id.toString() === productId
  );

  if (existingItem) {
    existingItem.qty += qty;
  } else {
    cart.items.push({ product: product._id, qty });
  }

  // ✅ Recalculate total using each item's actual product price
  cart.total = cart.items.reduce((sum, item) => {
    const itemPrice = item.product?.price || 0;
    return sum + itemPrice * item.qty;
  }, 0);

  await cart.save();

  // repopulate to ensure product details are returned in response
  const updatedCart = await Cart.findById(cart._id).populate("items.product");

  res.status(201).json({ message: "Added to cart", cart: updatedCart });
};

// REMOVE FROM CART
export const removeFromCart = async (req, res) => {
  const { id } = req.params;

  const cart = await Cart.findOne({ user: null }).populate("items.product");
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const itemIndex = cart.items.findIndex(
    (item) => item.product._id.toString() === id
  );

  if (itemIndex === -1)
    return res.status(404).json({ message: "Item not found in cart" });

  // If qty > 1, reduce by 1
  if (cart.items[itemIndex].qty > 1) {
    cart.items[itemIndex].qty -= 1;
  } else {
    // else remove entire item
    cart.items.splice(itemIndex, 1);
  }

  // Recalculate total properly
  cart.total = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0
  );

  await cart.save();
  res.json({ message: "Item updated", cart });
};

// CHECKOUT
export const checkoutCart = async (req, res) => {
  const { name, email, cartItems } = req.body;

  if (!cartItems || cartItems.length === 0)
    return res.status(400).json({ message: "Cart is empty" });

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0
  );

  const receipt = {
    name,
    email,
    total,
    timestamp: new Date().toISOString(),
  };

  res.status(200).json({
    message: "Checkout successful",
    receipt,
  });
};
