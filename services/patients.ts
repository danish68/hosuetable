import Patient from "../models/patient";
export const getAllPatientsService = async () => {
  return await Patient.find();
};

export const addNewPatientService = async (DTO: any) => {
  let newPatient: any = new Patient({
    ...DTO,
  });
  return await newPatient.save();
};

export const updatePatientService = async (DTO: any) => {
  const {
    query: { id },
    body,
  } = DTO;
  let updatePatient: any = Patient.findByIdAndUpdate(id, { ...body });

  return await updatePatient.save();
};

export const deletePatientService = async (DTO: any) => {
  const {
    query: { id },
  } = DTO;

  return await Patient.findByIdAndRemove(id);
};
