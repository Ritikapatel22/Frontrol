const calculateAvgCost = (itd_fully_burdened_cost, itd_hours) => {
  if(!itd_fully_burdened_cost || !itd_hours) return 0
  return (itd_fully_burdened_cost / itd_hours)
}

const aggregateAvgCost = (params) => {
    let itdFullyBurdenedCost = 0;
    let itdHours = 0;

    params.values.forEach((value) => {
      if (value && value.itd_fully_burdened_cost) {
        itdFullyBurdenedCost += value.itd_fully_burdened_cost;
      }
      if (value && value.itd_hours) {
        itdHours += value.itd_hours;
      }
    });
    return {
      itd_fully_burdened_cost: itdFullyBurdenedCost,
      itd_hours:itdHours,
      toString: () => calculateAvgCost(itdFullyBurdenedCost, itdHours)
    };
}

export {
  calculateAvgCost,
  aggregateAvgCost
}
