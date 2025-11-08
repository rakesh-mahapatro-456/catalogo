import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./src/routes/user.route.js";
import productRoutes from "./src/routes/product.route.js";
import cartRoutes from "./src/routes/cart.route.js";

dotenv.config();

const app = express(); 
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  //credentials: true
};
app.use(cors(corsOptions));

app.use(express.json());

//routes
app.use('/api/v1/user',userRoutes);
app.use('/api/v1/products',productRoutes);
app.use("/api/v1/cart", cartRoutes);


// ⛔️ Global error handler - must be at the end
app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const start = async()=>{
    const connectDB = await mongoose.connect(process.env.MONGO_URI);

    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
        console.log("Connected to MongoDB:", connectDB.connection.host);
    })
}

start();