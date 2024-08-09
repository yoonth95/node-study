import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      console.log("이미 몽고디비 연결 함");
      return;
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("몽고디비 연결");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
