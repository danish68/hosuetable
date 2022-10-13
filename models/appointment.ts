import mongoose from "mongoose";
const appointmentsSchema = new mongoose.Schema(
  {
    petId: { type: mongoose.Types.ObjectId, required: true, ref:'Patients' },
    startTime: { type: Date },
    endTime: { type: Date },
    desc: { type: String },
    appointmentStatus: { type: String },
    fee: { type: Number },
    paymentCurrency: { type: String },
    paid: { type: Boolean },
  },
  { timestamps: true }
);
export default mongoose.model("Appointments", appointmentsSchema);
