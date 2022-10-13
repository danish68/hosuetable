import mongoose from "mongoose";
const joigoose = require("joigoose")(mongoose);
import { appointmentSchema } from "../schemas";
const appointmentsSchema = new mongoose.Schema(
  joigoose.convert(appointmentSchema),
  { timestamps: true }
);

export default mongoose.model("Appointments", appointmentsSchema);
