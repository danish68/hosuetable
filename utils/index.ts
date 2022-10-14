const startOfMonth = () => {
  const date = new Date();
  return new Date(date.getFullYear(), date.getMonth(), 1);
};
const startOfWeek = () => {
  const date = new Date();
  const firstDate = date.getDate() - date.getDay();
  return new Date(date.setDate(firstDate));
};

const feeReducer = (data: any, paid: any, start: any = "infinite") => {
  return data
    .filter((d: any) => {
      return start === "infinite"
        ? d.paid === paid
        : d.paid === paid && d.startTime > start && d.endTime < new Date();
    })
    .reduce((accumulator: any, object: any) => {
      return accumulator + object["fee"];
    }, 0);
};

const amountCalculator = (data: any, paid: any, range: any) => {
  if (range === "monthly") {
    const firstDayOfMonth = startOfMonth();
    return feeReducer(data, paid, firstDayOfMonth);
  } else if (range === "weekly") {
    const firstDayOfWeek = startOfWeek();

    return feeReducer(data, paid, firstDayOfWeek);
  } else {
    return feeReducer(data, paid);
  }
};

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

export const getDefaultReport = (data: any) => {
  return {
    HospitalBalance: amountCalculator(data, true, "total"),
    WeeklyPaidBalance: amountCalculator(data, true, "weekly"),
    WeeklyUnpaidBalance: amountCalculator(data, false, "weekly"),
    MonthlyPaidBalance: amountCalculator(data, true, "monthly"),
    MonthlyUnpaidBalance: amountCalculator(data, false, "monthly"),
  };
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

    const begin = startOfMonth();
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
