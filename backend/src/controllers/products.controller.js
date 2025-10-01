import Product from "../models/product.model.js";
import User from "../models/user.model.js";

// CREATE PRODUCT
export const createProduct = async (req, res) => {
  const userId = req.user.id;
  const { name, description, price, stock, imageUrl } = req.body;

  // Validation
  if (!name || !description || price == null || stock == null || !imageUrl) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (price < 0 || stock < 0) {
    return res
      .status(400)
      .json({ message: "Price and stock must be non-negative" });
  }

  // verify user exists
  const existingUser = await User.findById(userId);
  if (!existingUser) {
    return res.status(400).json({ message: "User doesn't exist" });
  }

  // Create product
  const newProduct = await Product.create({
    prodName :name,
    description,
    price,
    stock,
    imageUrl,
    createdBy: userId,
  });

  res.status(201).json({
    message: "Product created successfully",
    product: newProduct,
  });
};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {

    const userId = req.user.id;
    const { name, description, price, stock, imageUrl } = req.body; 
    const productId = req.params.id;

    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(400).json({ message: "User doesn't exist" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Role-based access
    if (existingUser.role !== "admin" && product.createdBy.toString() !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Update only provided fields
    if (name) product.name = name;
    if (description) product.description = description;
    if (price != null) {
      if (price < 0) return res.status(400).json({ message: "Price must be non-negative" });
      product.price = price;
    }
    if (stock != null) {
      if (stock < 0) return res.status(400).json({ message: "Stock must be non-negative" });
      product.stock = stock;
    }
    if (imageUrl) product.imageUrl = imageUrl;

    await product.save();

    res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  
};


// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  const products = await Product.find({}).populate("createdBy", "name email");

  res.status(200).json({
    message: "Products fetched successfully",
    products,
  });
};

// GET ALL PRODUCTS by ID
export const getProductsById = async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);

  res.status(200).json({
    message: "Products fetched successfully",
    product,
  });
};

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.id;

  // Verify user exists
  const existingUser = await User.findById(userId);
  if (!existingUser) {
    return res.status(400).json({ message: "User doesn't exist" });
  }

  // Find the product
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  // Role-based access: only admin or product owner can delete
  if (
    existingUser.role !== "admin" &&
    product.createdBy.toString() !== userId
  ) {
    return res.status(403).json({ message: "Access denied" });
  }

  await product.deleteOne();

  res.status(200).json({
    message: "Product deleted successfully",
    productId: product._id,
  });
};
