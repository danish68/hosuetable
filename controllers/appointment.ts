import { Request, Response } from "express";
import {
  getAllAppointmentService,
  createAppointmentService,
  updateAppointmentService,
  deleteAppointmentService,
  getRemainingBillForPatientService,
} from "../services/appointment";
import { getMoneyByEachPet } from "../utils/utils";
export const getAllAppointment = async (
  req: Request,
  res: Response,
  next: any
) => {
  try {
    const serviceResponse = await getAllAppointmentService(req.query);
    res.status(200).send(serviceResponse);
  } catch (error) {
    next(error);
  }
};

export const createAppointment = async (
  req: Request,
  res: Response,
  next: any
) => {
  try {
    const serviceResponse = await createAppointmentService(req.body);
    res.status(200).send(serviceResponse);
  } catch (error) {
    next(error);
  }
};

export const updateAppointment = async (
  req: Request,
  res: Response,
  next: any
) => {
  try {
    const serviceResponse = await updateAppointmentService(req.body);
    res.status(200).send(serviceResponse);
  } catch (error) {
    next(error);
  }
};

export const deleteAppointment = async (
  req: Request,
  res: Response,
  next: any
) => {
  try {
    const serviceResponse = await deleteAppointmentService(req.body);
    res.status(200).send(serviceResponse);
  } catch (error) {
    next(error);
  }
};

export const getRemainingBillForPatient = async (
  req: Request,
  res: Response,
  next: any
) => {
  try {
    const serviceResponse = await getRemainingBillForPatientService(req.params);
    const totalBill =
      serviceResponse.length > 0 &&
      serviceResponse.reduce((accumulator: any, object: any) => {
        return accumulator + object["fee"];
      }, 0);
    res.status(200).send({ totalBill });
  } catch (error) {
    next(error);
  }
};

export const getMoneyForEachPet = async (
  req: Request,
  res: Response,
  next: any
) => {
  try {
    const serviceResponse = await getAllAppointmentService({});
    const result = getMoneyByEachPet(serviceResponse);
    res.status(200).send({ result });
  } catch (error) {
    next(error);
  }
};
