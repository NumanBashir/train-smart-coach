import mongoose from "mongoose";

let isConnected = false;

export const connectToMONGO = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  // const MONGODB_URI = process.env.MONGODB_URI;
  const MONGODB_URI =
    "mongodb+srv://sportybashir:Nusuq5Z77xBPXz57@trainsmartcoachcluster.nnjbgfj.mongodb.net/?retryWrites=true&w=majority&appName=TrainSmartCoachCluster";

  if (!MONGODB_URI) {
    throw new Error("Missing MONGODB_URI in environment variables");
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "TrainSmartCoach",
    });

    isConnected = true;
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
};
