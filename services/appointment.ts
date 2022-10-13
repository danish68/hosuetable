import Appointment from "../models/appointment";

const queryBuilder = (data: any) => {
  const keys = Object.keys(data);
  if (keys.includes("paid")) {
    return {
      paid: data.paid,
    };
  } else if (keys.includes("date")) {
    const date = data.date;
    const begin = new Date(date);
    const lastHours = new Date(date).setHours(23, 59, 56, 999);
    const end = new Date(lastHours);
    return {
      startTime: {
        $gte: begin,
        $lte: end,
      },
    };
  } else if (keys.includes("petId")) {
    return {
      petId: data.petId,
    };
  } else {
    return {};
  }
};

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
  const { id, ...restDto } = DTO;
  let updateAppointment: any = await Appointment.findByIdAndUpdate(id, {
    ...restDto,
  });
  return updateAppointment;
};

export const deleteAppointmentService = async (DTO: any) => {
  const { id } = DTO;
  const deleteAppointment = await Appointment.findByIdAndRemove(id);
  return deleteAppointment;
};

export const getRemainingBillForPatientService = async (DTO: any) => {
  const { petId } = DTO;
  const appointmentForPatient = Appointment.find({
    petId: petId,
    paid: false,
  }).select({ fee: 1 });
  return appointmentForPatient;
};
