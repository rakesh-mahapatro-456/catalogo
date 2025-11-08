import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); 

const createToken = (user) => {
  return jwt.sign({ id: user._id,role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};


export const signup = async (req, res) => {
  const { name, email, password, username } = req.body;

  // Validation
  if (!name || !email || !password || !username) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = new User({
    name,
    username,
    email,
    passwordHash: hashedPassword,
  });

  // Save to DB
  await newUser.save();

  // Generate JWT
  const token = createToken(newUser);

  // Return response
  return res.status(201).json({
    message: "User registered successfully",
    token,
    user: {
    _id: newUser._id,
    name: newUser.name,
    username: newUser.username,
    email: newUser.email,
    role: newUser.role, 
  },

  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Check password
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Generate JWT
  const token = createToken(user);

  // Return response with user data
  return res.status(200).json({
    message: "Login successful",
    token,
    user: {
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
};

export const getUserInfo = async(req,res)=>{
  const userId = req.user.id;

  const user = await User.findById(userId).select("-passwordHash"); 
  if (!user) {
    return res.status(404).json({ message: "User doesn't exist" });
  }

  return res.status(200).json(user);

}






