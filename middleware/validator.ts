import { Request, Response } from "express";
const createHttpError = require("http-errors");
import Schemas from "../schemas";
export const Validate = (validator: string) => {
  return async function (req: Request, res: Response, next: any) {
    try {
      const { error } = await Schemas[validator].validate(req.body);
      if (error) throw error;
      next();
    } catch (err: any) {
      if (err.isJoi)
        return next(createHttpError(422, { message: err.message }));
      next(createHttpError(500));
    }
  };
};
