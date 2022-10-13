import mongoose from "mongoose";
const joigoose = require("joigoose")(mongoose);
import { patientSchema } from "../schemas";
const schema = new mongoose.Schema(
  joigoose.convert(patientSchema),
  { timestamps: true }
);

export default mongoose.model("Patients", schema);
