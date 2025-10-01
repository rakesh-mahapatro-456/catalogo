import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./src/models/product.model.js"; // adjust path if needed
import axios from "axios";

dotenv.config();

// Replace this with your user's ID
const USER_ID = "68dce2f9190ea3e419b86ea1";

const seedProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Fetch 30 products from DummyJSON using axios
    const { data } = await axios.get("https://dummyjson.com/products?limit=30");

    // Transform products to match your schema
    const products = data.products.map((product) => ({
      prodName: product.title,
      description: product.description,
      price: product.price,
      stock: product.stock,
      imageUrl: product.thumbnail || product.images[0] || "",
      createdBy: USER_ID,
    }));

    // Insert products
    await Product.insertMany(products);
    console.log("30 products inserted successfully!");

    // Disconnect
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (err) {
    console.error("Error seeding products:", err);
    process.exit(1);
  }
};

// Run the seed script
seedProducts();
