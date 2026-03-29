import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || "mongodb+srv://shivayagami999_db_user:GfBXH2d6ig4MWSLN@cluster0.gxspbur.mongodb.net/?appName=Cluster0" ;

    if (!uri) {
      throw new Error("Mongo URI is undefined");
    }

    await mongoose.connect(uri);

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

export default connectDB;