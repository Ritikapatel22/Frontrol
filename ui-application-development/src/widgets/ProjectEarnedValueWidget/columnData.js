const EARNED_VALUE_COLUMN_NAMES = {
  approvedBudget: {
    label: "Approved budget",
    color: "#00353E",
  },
  actualCost: {
    label: "Actual cost", 
    color: "#91a948",
  },
  earnedValue: {
    label: "Earned value", 
    color: "#d2aa00",
  },
  cumulativeApprovedBudget: {
    label: "Approved budget",
    color: "#00353E",
  },
  cumulativeActualCost: {
    label: "Actual cost", 
    color: "#91a948",
  },
  cumulativeEarnedValue: {
    label: "Earned value", 
    color: "#d2aa00",
  },
  CPI:{
    label: "CPI", 
    color: "#00353E",
  },
  SPI:{
    label: "SPI", 
    color: "#91a948",
  }
};

const createTableValues = (data) => {
  let approvedBudget = {item:EARNED_VALUE_COLUMN_NAMES.approvedBudget.label}
  let actualCost = {item:EARNED_VALUE_COLUMN_NAMES.actualCost.label}
  let earnedValue = {item:EARNED_VALUE_COLUMN_NAMES.earnedValue.label}
  let cpiData = {item:EARNED_VALUE_COLUMN_NAMES.CPI.label}
  let spiData = {item:EARNED_VALUE_COLUMN_NAMES.SPI.label}
  let cumulativeApprovedBudget = {item:EARNED_VALUE_COLUMN_NAMES.cumulativeApprovedBudget.label}
  let cumulativeActualCost = {item:EARNED_VALUE_COLUMN_NAMES.cumulativeActualCost.label}
  let cumulativeEarnedValue = {item:EARNED_VALUE_COLUMN_NAMES.cumulativeEarnedValue.label}

  for (let i = 0; i < data?.period.length; i++) {
    let columnName = `Bucket${i}`
    if(i <= data.periodic.approved_budget.length -1){
      approvedBudget[columnName] = data.periodic.approved_budget[i];
    }
    if(i <= data.periodic.actual_costs.length -1){
      actualCost[columnName] = data.periodic.actual_costs[i];
    }

    if(i <= data.periodic.earned_value.length -1){
      earnedValue[columnName] = data.periodic.earned_value[i];
    }
    
    if(i <= data.periodic.approved_budget.length -1){
      cumulativeApprovedBudget[columnName] = data.cummulative.approved_budget[i];
    }

    if(i <= data.periodic.actual_costs.length -1){
      cumulativeActualCost[columnName] = data.cummulative.actual_costs[i];
    }

    if(i <= data.periodic.earned_value.length -1){
      cumulativeEarnedValue[columnName] = data.cummulative.earned_value[i];
    }

    if(parseFloat(data.cummulative.earned_value[i]) && parseFloat(data.cummulative.actual_costs[i])){
      cpiData[columnName] = (parseFloat(data.cummulative.earned_value[i])/parseFloat(data.cummulative.actual_costs[i])).toFixed(2);
    }else{
      cpiData[columnName] = null
    }

    if(parseFloat(data.cummulative.earned_value[i]) && parseFloat(data.cummulative.approved_budget[i])){
      spiData[columnName] = (parseFloat(data.cummulative.earned_value[i])/parseFloat(data.cummulative.approved_budget[i])).toFixed(2);
    }else{
      spiData[columnName] = null
    }
  }
  
  let current = [] 
  current.push({...approvedBudget,colType: "currencyColumn"});
  current.push({...actualCost,colType: "currencyColumn"});
  current.push({...earnedValue,colType: "currencyColumn"});
  current.push({item:"Cumulative"})    
  current.push({...cumulativeApprovedBudget,colType: "currencyColumn"});
  current.push({...cumulativeActualCost,colType: "currencyColumn"});
  current.push({...cumulativeEarnedValue,colType: "currencyColumn"});
  current.push({...cpiData,colType: "number2DecimalColumn"});
  current.push({...spiData,colType: "number2DecimalColumn"});

  return current;
}

const createGraphValues = (data) => { 
  let cpi = [];
  let spi = [];

  if (data?.period.length !== 0){
    if(data?.cummulative?.earned_value){
      for (let i = 0; i < data?.period.length; i++) {
        let currentCPI = parseFloat(data?.cummulative?.earned_value[i]) / parseFloat(data?.cummulative?.actual_costs[i])
        if(currentCPI || currentCPI === 0){
          cpi.push(parseFloat(currentCPI.toFixed(2)));
        }
      }
    }

  if(data?.cummulative?.earned_value){
    for (let i = 0; i < data.period.length; i++) {
      let currentSPI = parseFloat(data?.cummulative?.earned_value[i]) / parseFloat(data?.cummulative?.approved_budget[i])
        if(currentSPI || currentSPI === 0){
          spi.push(parseFloat(currentSPI.toFixed(2)));
        }
      }
    }
  }

  return {
    cpi,
    spi
  }
}
  
export { EARNED_VALUE_COLUMN_NAMES, createTableValues, createGraphValues };