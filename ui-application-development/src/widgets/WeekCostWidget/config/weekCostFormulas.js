import { currencyFactory } from '@frontrolinc/pace-ui-framework'

const calculateAvgCost = (itd_fully_burdened_cost, itd_hours , params) => {
  if(!itd_fully_burdened_cost || !itd_hours) return 0
  const shouldConvert = currencyFactory.shouldConvert
  if(shouldConvert && params) return (currencyFactory.convertCurrency({
    currencyValue: itd_fully_burdened_cost,
    currentCurrency: params.data.project_function_curr_code,
  })/itd_hours)
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
      toString: () => calculateAvgCost(itdFullyBurdenedCost, itdHours, params)
    };
}

export {
  calculateAvgCost,
  aggregateAvgCost
}
