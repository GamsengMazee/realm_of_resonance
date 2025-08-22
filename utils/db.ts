import mongoose from "mongoose";

const uri = `mongodb+srv://${process.env.UNAME}:${process.env.PASSWORD}@ror.pf4v7bk.mongodb.net/?retryWrites=true&w=majority&appName=RoR`;

let isConnected = false;

const db = async () => {
  if (isConnected) {
    console.log("🌐 Already connected to MongoDB");
    return; // Already connected, no need to reconnect.
  }

  try {
    if (!process.env.UNAME || !process.env.PASSWORD) {
      throw new Error("MongoDB credentials are missing in environment variables.");
    }

    // Connect to the database
    await mongoose.connect(uri, {
      dbName: "Realm_of_resonance",

    });

    isConnected = true;
    console.log("✅ Connected to MongoDB successfully.");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error; // Re-throw error after logging it
  }
};

export default db;
