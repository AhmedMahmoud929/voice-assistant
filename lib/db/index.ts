import mongoose from "mongoose";

// MongoDB connection string (replace with your actual connection string)
const MONGODB_URI = process.env.MONGO_URI;

let cached;

if (!cached) {
  cached = { conn: null, promise: null };
}

export const dbConnect = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI!, opts)
      .then((mongooseInstance) => mongooseInstance);
  }

  cached.conn = await cached.promise;
  return cached.conn;
};
