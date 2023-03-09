import kpiInfo from "./kpiInfo.json";
import { formatCurrency, formatDate, formatNumber2Decimal, formatPercentage } from "../../formatData";

export const mergeKpiInfo = (data) => {
  const result = [];
  data.map((queriedItem) => {
    kpiInfo.map((uiInfo) => {
      if (queriedItem.kpi_reference == uiInfo.kpi_reference) {
        result.push({...queriedItem, ...uiInfo});
      }
    });
  });
  return result;
};

export const evaluateKpiValues = (kpiData, projectData) => {
  let index = 0;
  for (let kpi of kpiData) {
    kpi.current_value = projectData[kpi.current_value_field];
    kpi.prior_value = projectData[kpi.prior_value_field];
    kpi.kpi_value = projectData[kpi.kpi_value_field];

    if (kpi.category == 'Financials') {
      kpi.approved_budget_value = projectData[kpi.approved_budget_field];
      kpi.eac_forecast_value = projectData[kpi.eac_forecast_field];
    }

    if (kpi.sparkline) {
      kpi.kpi_indicator = [{xVal: index, yVal: 101}, {xVal: index, yVal: kpi.kpi_value*100}];
    } else {
      kpi.kpi_indicator = getKpiIndicatorValues(kpi.kpi_value, kpi.threshold_green, kpi.threshold_red);
    }

    if (kpi.kpi_indicator == 'yellow') kpi.message = kpi.message_yellow;
    if (kpi.kpi_indicator == 'red') kpi.message = kpi.message_red;

    kpi.kpi_updown = getKpiupDown(kpi);

    kpi.kpi_tooltip = kpiTooltip(kpi, projectData);
    index++;
  };

  return kpiData;
};


const getKpiIndicatorValues = (kpi_value, threshold_green, threshold_red) => {
  if ( kpi_value !=0   &&  ( !kpi_value ||  Number.isNaN(kpi_value)  ) || kpi_value =='n/a' || kpi_value =='-' ) {
    return null;
  }
    if (kpi_value == "green") return kpi_value = 'green';
    if (kpi_value == "yellow") return kpi_value = 'yellow';
    // if (threshold_red == -99999999 || threshold_red == -9999999) {
    //   if (kpi_value <= threshold_green) return "green";
    //   return "yellow";
    // }
    else if (threshold_green >= threshold_red) {
      if (kpi_value < threshold_red) return "red";
      if (kpi_value >= threshold_green) return "green";
      return "yellow";
    } else if (threshold_green <= threshold_red) {
      if (kpi_value > threshold_red) return "red";
      if (kpi_value <= threshold_green) return "green";
      return "yellow";
    }
  };

  const formatNumber= (data,colType)=>{
    if(colType == 'currencyColumn'){
    return  (formatCurrency({ value: data }))
    }
   else if(colType == 'percentageColumn'){
      return formatPercentage({ value: data })
    }
   else if(colType == 'number2DecimalColumn'){
      return  (formatNumber2Decimal({ value: data }))
    }
   else if(colType == 'dateFormat'){
      return formatDate({ value: data })
    }
    else{
      return  data
    }
  }
  
const kpiTooltip = (kpi, projectData) => {
    if ( kpi.kpi_value !=0   &&  ( !kpi.kpi_value ||  Number.isNaN(kpi.kpi_value)  ) || kpi.kpi_value =='n/a'  || kpi.kpi_value =='-' ) {
      return null;
    }
    //TBD - number formatting
    let tooltip = formatNumber(kpi.kpi_value,kpi.colType);
    //custom logic for 2 tooltips: use tooltipTemplate later
    if (kpi.kpi_reference == 'KPI-007' || kpi.kpi_reference == 'KPI-008') {
      tooltip += ', Earned Value: ';
      //TBD - number formatting
      tooltip +=formatNumber(projectData.ev_current_month,kpi.colType);
    }
    if(kpi.threshold_description!=null){
      tooltip +=   "\r\n" + kpi.threshold_description;
    }
    if (kpi.message!=null && (kpi.kpi_indicator == 'yellow' || kpi.kpi_indicator == 'red')) {
      tooltip += "\r\n" + kpi.message;
    }
    return tooltip;
  };

  const numberFormat =(val)=>{
    val = val.replace(/\,/g,'')
    val = val.replace(/\%/g,'')
    return Number(val)
  }
    
  const getKpiupDown = (kpi) => {
    let current_month= kpi.current_value <0 ? kpi.current_value.toFixed(2) : formatNumber(kpi.current_value,kpi.colType)
    let prior_val= kpi.prior_value <0 ? kpi.prior_value.toFixed(2) :   formatNumber(kpi.prior_value,kpi.colType)
    if ( current_month !=0   &&  ( !current_month ||  Number.isNaN(current_month)  ) || current_month =='n/a' || current_month =='-' ) {
      return null;
    }
    if ( prior_val !=0   &&  ( !prior_val ||  Number.isNaN(prior_val)  ) || prior_val =='n/a' || prior_val =='-' ) {
      return null;
    }
    if (current_month!='' || prior_val!=''){
    if (numberFormat(current_month) > numberFormat(prior_val)) {
        return 'up';
      } else if (numberFormat(current_month)  === numberFormat(prior_val)) {
        return 'same';
      } else if (numberFormat(current_month)  < numberFormat(prior_val)) {
        return 'down';
      }
    }
  };

 