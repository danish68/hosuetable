import { Request, Response } from "express";
import {
  getAllPatientsService,
  addNewPatientService,
  updatePatientService,
  deletePatientService,
} from "../services/patients";

export const getAllPatients = async (
  req: Request,
  res: Response,
  next: any
) => {
  try {
    const serviceResponse = await getAllPatientsService();
    res.status(201).send(serviceResponse);
  } catch (error) {
    next(error);
  }
};

export const addNewPatient = async (req: Request, res: Response, next: any) => {
  try {
    console.log("req.bosy",req.body)
    const serviceResponse = await addNewPatientService(req.body);
    res.status(201).send(serviceResponse);
  } catch (error) {
    next(error);
  }
};

export const updatePatient = async (req: Request, res: Response, next: any) => {
  try {
    const serviceResponse = await updatePatientService(req);
    res.status(201).send(serviceResponse);
  } catch (error) {
    next(error);
  }
};

export const deletePatient = async (req: Request, res: Response, next: any) => {
  try {
    const serviceResponse = await deletePatientService(req);
    res.status(201).json(serviceResponse);
  } catch (error) {
    next(error);
  }
};
