const startOfMonth = (date: any) => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

export const getMoneyByEachPet = (data: any) => {
  console.log("data",data)
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

export const getDefaultReport = (data: any) => {

  const totalPaidAmount = data
    .filter((d: any) => d.paid)
    .reduce((accumulator: any, object: any) => {
      return accumulator + object["fee"];
    }, 0);

  return totalPaidAmount;
};

export const queryBuilder = (data: any) => {
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
  } else if (keys.includes("range")) {
    const date = new Date();

    const begin = startOfMonth(date);
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
