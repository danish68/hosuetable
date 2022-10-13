import Patient from "../models/patient";

export const getAllPatientsService = async () => {
  return await Patient.find();
};

export const addNewPatientService = async (DTO: any) => {
  let newCase: any = new Patient({
    ...DTO,
  });

  return await newCase.save();
};

export const updatePatientService = async (DTO: any) => {
  const { id, ...restDto } = DTO;

  let newCase: any = Patient.findByIdAndUpdate({ _id: id }, { ...restDto });

  return await newCase.save();
};

export const deletePatientService = async (DTO: any) => {
  const { id } = DTO;

 Patient.findByIdAndRemove(id, (d:any) => {
    return  {status:"patient deleted successfully"}
  });
};

