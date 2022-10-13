import express from "express";
import {
  getAllAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getRemainingBillForPatient,
  getReport,
} from "../controllers/appointment";
import { Validate } from "../middleware/validator";
const router = express.Router();
router.get("/all", getAllAppointment);
router.get("/bill/:petId/", getRemainingBillForPatient);
router.post("/", Validate("appointment"), createAppointment);
router.put("/", Validate("appointment"), updateAppointment);
router.delete("/", deleteAppointment);
router.get("/report", getReport);

export default router;
