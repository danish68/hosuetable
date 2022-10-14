import Appointment from "../models/appointment";
import { queryBuilder } from "../utils";

export const getAllAppointmentService = async (DTO: any) => {
  const queryString = queryBuilder(DTO);
  return await Appointment.find(queryString).populate({
    path: "petId",
    select: "name",
  });
};

export const createAppointmentService = async (DTO: any) => {
  let newAppointment: any = new Appointment({
    ...DTO,
  });
  return await newAppointment.save();
};

export const updateAppointmentService = async (DTO: any) => {
  const {
    query: { id },
    body,
  } = DTO;
  return await Appointment.findByIdAndUpdate(id, {
    ...body,
  });
};

export const deleteAppointmentService = async (DTO: any) => {
  const {
    query: { id },
  } = DTO;
  return await Appointment.findByIdAndRemove(id);
};

export const getRemainingBillForPatientService = async (DTO: any) => {
  const { petId } = DTO;
  const appointmentForPatient = Appointment.find({
    petId: petId,
    paid: false,
  }).select({ fee: 1 });
  return appointmentForPatient;
};
