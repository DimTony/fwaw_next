import mongoose from "mongoose";

let isConnected = false; // Track the connection status

const connectDB = async () => {
  if (isConnected) {
    // If already connected, reuse the connection
    console.log("Using existing database connection");
    return;
  }

  try {
    // Attempt to connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true; // Set the connection status to true
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed", error.message);
    throw new Error("Database connection failed");
  }
};

export default connectDB;
