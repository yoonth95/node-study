import mongoose from "mongoose";

const LogSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const Log = mongoose.model.Log || mongoose.model("Log", LogSchema);
export default Log;
