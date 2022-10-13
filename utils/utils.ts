export const getMoneyByEachPet = (data: any) => {
  const result: any = [];
  data.reduce(function (res: any, value: any) {
    if (!res[value.petId._id]) {
      res[value.petId._id] = { PetName: value.petId.name, fee: 0 };
      result.push(res[value.petId._id]);
    }
    res[value.petId._id].fee += value.fee;
    return res;
  }, {});
  return result;
};
