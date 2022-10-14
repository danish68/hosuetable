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
router.post("/new", Validate("appointment"), createAppointment);
router.put("/", Validate("appointment"), updateAppointment);
router.delete("/", deleteAppointment);
router.get("/report", getReport);

export default router;

//For All Appointments  :[GET] http://localhost:3000/appointment/all
//For All Appointments for paid or unpaid : [GET] http://localhost:3000/appointment/all?paid=true
//For All Appointments for specific date  :[GET] http://localhost:3000/appointment/all?date=2022-10-09T10:10:10:000Z
//For All Appointments for specific pet :[GET] http://localhost:3000/appointment/all?petId=43w45353f33535
//For Remaining Bill for specific pet :[GET] http://localhost:3000/appointment/bill/343353535646
//For Creating new Appointment :[POST] http://localhost:3000/appointment/new
//For Deleting new Appointment :[DELETE] http://localhost:3000/appointment?id=4335353635r353
//For Updating new Appointment :[PUT] http://localhost:3000/appointment?id=4553535353
//For Creating new Appointment :[POST] http://localhost:3000/appointment
//Get Default Report (includes Total Hospital Paid Balance,Current Month and week paid and unpaid amount):[GET] http://localhost:3000/appointment/report
//Get Report of all pets with money paid against them and pet with most amount will be popular :[GET] http://localhost:3000/appointment/report?type="moneyByPet"
