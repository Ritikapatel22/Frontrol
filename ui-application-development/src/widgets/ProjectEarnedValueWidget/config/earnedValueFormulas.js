const calculateCostVariance = (earned_value, itd_actual) =>{
  return earned_value - itd_actual
}

const calculateScheduleVariance = (earned_value, planned_value) => {
  return (earned_value - planned_value)
}

const calculateSPI = (earned_value, planned_value) => {
  if(!planned_value || !earned_value) return 0
  return (earned_value / planned_value).toFixed(2)
}

const calculateCPI = (earned_value,itd_actual) => {
  if(!itd_actual || !earned_value) return 0
  return  (earned_value / itd_actual).toFixed(2)
}


const calculateVarianceAtComp = (earned_value, itd_actual, total_approved_cost_budget) => {
  let cpi = calculateCPI(earned_value, itd_actual)
  if(!cpi) return 0
  let projected_eac = total_approved_cost_budget / cpi
  return total_approved_cost_budget - projected_eac
}


export {
  calculateCostVariance,
  calculateScheduleVariance,
  calculateSPI,
  calculateCPI,
  calculateVarianceAtComp,
}
