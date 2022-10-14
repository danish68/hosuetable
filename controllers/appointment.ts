import { NextFunction, Request, Response } from "express";
import {
  getAllAppointmentService,
  createAppointmentService,
  updateAppointmentService,
  deleteAppointmentService,
  getRemainingBillForPatientService,
} from "../services/appointment";
import { HttpError } from "../utils/HttpError";
import asyncHandler from "express-async-handler";
import { getMoneyByEachPet, getDefaultReport } from "../utils";
export const getAllAppointment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const serviceResponse = await getAllAppointmentService(req.query);
    if (!serviceResponse) {
      next(new HttpError("No data found", 404));
    } else {
      res.status(200).send(serviceResponse);
    }
  }
);

export const createAppointment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const serviceResponse = await createAppointmentService(req.body);
    if (!serviceResponse) {
      next(new HttpError("No able to create", 404));
    } else {
      res.status(200).send(serviceResponse);
    }
  }
);

export const updateAppointment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const serviceResponse = await updateAppointmentService(req);
    if (!serviceResponse) {
      next(new HttpError("No able to update", 404));
    } else {
      res.status(200).send(serviceResponse);
    }
  }
);

export const deleteAppointment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const serviceResponse = await deleteAppointmentService(req);
    if (!serviceResponse) {
      next(new HttpError("Not able tp delete", 404));
    } else {
      res.status(200).send(serviceResponse);
    }
  }
);

export const getRemainingBillForPatient = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const serviceResponse = await getRemainingBillForPatientService(req.params);
    if (!serviceResponse) {
      next(new HttpError("No data found", 404));
    } else {
      const totalBill =
        serviceResponse.length > 0 &&
        serviceResponse.reduce((accumulator: any, object: any) => {
          return accumulator + object["fee"];
        }, 0);
      if (!totalBill) {
        next(new HttpError("Cant calculate Fees", 404));
      } else {
        res.status(200).send(totalBill);
      }
    }
  }
);

export const getReport = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const serviceResponse = await getAllAppointmentService({});
    if (!serviceResponse) {
      next(new HttpError("No data found", 404));
    } else {
      const result =
        req.query?.type === "moneyByPet"
          ? getMoneyByEachPet(serviceResponse)
          : getDefaultReport(serviceResponse);
      res.status(200).send({ result });
    }
  }
);
