import mongoose from "mongoose";

const connectMongoDB = async () => {
  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Error Connecting to MongoDB");
    console.log(err);
  }
};

export { connectMongoDB };
