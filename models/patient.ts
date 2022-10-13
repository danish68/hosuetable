import mongoose from "mongoose";
const patientsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String },
    ownerName: { type: String },
    ownerAddress: { type: String },
    ownerPhone: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Patients", patientsSchema);
