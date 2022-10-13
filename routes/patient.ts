import express from "express";
import { getAllPatients,addNewPatient,updatePatient,deletePatient } from "../controllers/patients";
const router=express.Router()

router.get("/all",getAllPatients)
router.post("/",addNewPatient)
router.put("/",updatePatient)
router.delete("/",deletePatient)


export default router