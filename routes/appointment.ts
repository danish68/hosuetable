import express from "express";
import {
  getAllAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getRemainingBillForPatient,
  getMoneyForEachPet,
} from "../controllers/appointment";
const router = express.Router();
router.get("/all", getAllAppointment);
router.get("/bill/:petId/", getRemainingBillForPatient);
router.post("/", createAppointment);
router.put("/", updateAppointment);
router.delete("/", deleteAppointment);
router.get("/moneyByPet", getMoneyForEachPet);

export default router;
