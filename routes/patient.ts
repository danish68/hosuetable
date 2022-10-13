import express from "express";
import {
  getAllPatients,
  addNewPatient,
  updatePatient,
  deletePatient,
} from "../controllers/patients";
import { Validate } from "../middleware/validator";
const router = express.Router();

router.get("/all", getAllPatients);
router.post("/new", Validate("patient"), addNewPatient);
router.put("/", Validate("patient"), updatePatient);
router.delete("/", deletePatient);

export default router;
