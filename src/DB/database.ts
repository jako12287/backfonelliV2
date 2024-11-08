import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://foneli210:ud2kQLB4t1UW2ja0@cluster0.grdaq.mongodb.net/",
      {
        //   useNewUrlParser: true,
        //   useUnifiedTopology: true,
      }
    );
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
