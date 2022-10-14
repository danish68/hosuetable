import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import {
  getAllPatientsService,
  addNewPatientService,
  updatePatientService,
  deletePatientService,
} from "../services/patients";
import { HttpError } from "../utils/HttpError";
export const getAllPatients = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const serviceResponse = await getAllPatientsService();
    if (!serviceResponse) {
      next(new HttpError("No data found", 404));
    } else {
      res.status(200).send(serviceResponse);
    }
  }
);

export const addNewPatient = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const serviceResponse = await addNewPatientService(req.body);
    if (!serviceResponse) {
      next(new HttpError("cant add new data", 404));
    } else {
      res.status(200).send(serviceResponse);
    }
  }
);

export const updatePatient = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const serviceResponse = await updatePatientService(req);
    if (!serviceResponse) {
      next(new HttpError("No able to Update", 404));
    } else {
      res.status(200).send(serviceResponse);
    }
  }
);

export const deletePatient = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const serviceResponse: any = await deletePatientService(req);
    if (!serviceResponse) {
      next(new HttpError("Not Able to Deleted", 404));
    } else {
      res.status(200).send(serviceResponse);
    }
  }
);
