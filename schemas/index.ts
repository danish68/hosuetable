import Joi from "joi";

export const patientSchema = Joi.object({
  name: Joi.string(),
  type: Joi.string(),
  ownerName: Joi.string(),
  ownerAddress: Joi.string(),
  ownerPhone: Joi.string(),
});

export const appointmentSchema = Joi.object({
  petId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .message("must be an oid"),
  startTime: Joi.date(),
  endTime: Joi.date(),
  desc: Joi.string(),
  appointmentStatus: Joi.string(),
  fee: Joi.number(),
  paymentCurrency: Joi.string(),
  paid: Joi.boolean(),
});

export default {
  patient: patientSchema,
  appointment: appointmentSchema,
} as any;
