import mongoose from "mongoose";

let isConnected = false;
let MONGODB_URI = "mongodb+srv://sportybashir:Nusuq5Z77xBPXz57@trainsmartcoachcluster.nnjbgfj.mongodb.net/?retryWrites=true&w=majority&appName=TrainSmartCoachCluster"

export const connectToDB = async () => {
  console.log("Connecting to MongoDB...");
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "TrainSmartCoach",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("MongoDB is connected");
  } catch (error) {
    console.log("MongoDB connection failed", error);
  }
};
