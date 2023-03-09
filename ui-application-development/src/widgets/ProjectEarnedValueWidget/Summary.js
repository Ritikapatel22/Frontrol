import React, { useEffect,useState } from "react";
import { formatCurrency,formatNumber, formatNumber2Decimal  } from "../../formatData";
import { calculateCostVariance, calculateScheduleVariance, calculateCPI, calculateSPI, calculateVarianceAtComp } from "./config/earnedValueFormulas";
import { useTranslation } from 'react-i18next';

function Summary({filteredData}) {  
  const { t } = useTranslation(['label']);
  
  const [summaryData, setSummaryData] = useState({
    schedule_variance:null,
    cost_variance:null,
    variance_at_completion:null,
    spi:null,
    cpi:null
  });

  useEffect(()=>{
    if (filteredData) {
      const finalCumulativeEarnedValue = Number(filteredData.cummulative?.earned_value[filteredData.cummulative?.earned_value?.length-1]);
      const finalCumulativeActualCost = Number(filteredData.cummulative?.actual_costs[filteredData.cummulative?.actual_costs?.length-1]);
      const finalCumulativeBudget = Number(filteredData.cummulative?.approved_budget[filteredData.cummulative?.approved_budget?.length-1]);

      const spi = calculateSPI(finalCumulativeEarnedValue, filteredData.periodic.plannedValue)
      const cpi = calculateCPI(finalCumulativeEarnedValue, filteredData.periodic.itdActual)

      if(filteredData?.periodic?.percentageComplete && filteredData.periodic.percentageComplete !== null || Number(filteredData.periodic.percentageComplete) !== 0) {
        setSummaryData(summaryData => ({
          ...summaryData,
            schedule_variance: calculateScheduleVariance(finalCumulativeEarnedValue, filteredData.periodic.plannedValue), 
            cost_variance: calculateCostVariance(finalCumulativeEarnedValue, finalCumulativeActualCost),
            variance_at_completion: calculateVarianceAtComp(finalCumulativeEarnedValue, filteredData.periodic.itdActual, finalCumulativeBudget),
            spi:spi,
            cpi:cpi
        }));
      }
    }
  },[filteredData]);  

  return (
    <div className="ml-8 grid grid-cols-3 place-content-stretch ">
      <div>
        <p className="prose prose-zinc pt-3 font-medium	 text-gray-400 text-sm">
          {t("Cost variance")}
        </p>
        <p style={{color : summaryData?.cost_variance <0 ?'red': 'rgb(0 135 104 / var(--tw-text-opacity))'}}>
          {formatCurrency({ value: summaryData?.cost_variance })}
        </p>
      </div>
      <div>
      <p className="pt-3 font-medium text-gray-400 text-sm">
        {t("CPI")}
        </p>
        <p style={{color : summaryData?.cpi <0 ?'red': 'rgb(0 135 104 / var(--tw-text-opacity))'}}>
          {formatNumber2Decimal({ value: summaryData?.cpi })}
        </p>
      </div>
      <div></div>
      <div>
        <p className="pt-3 mt-3 font-medium text-gray-400 text-sm">
          {t("Schedule variance")}
        </p>
        <p style={{color : summaryData?.schedule_variance  <0 ?'red': 'rgb(0 135 104 / var(--tw-text-opacity))'}}>
          {formatCurrency({ value: summaryData?.schedule_variance })}
        </p>
      </div>
      <div>
      <p className="pt-3 mt-3 font-medium text-gray-400 text-sm">
        {t("SPI")}
        </p>
        <p style={{color : summaryData?.spi  <0 ?'red': 'rgb(0 135 104 / var(--tw-text-opacity))'}}>
          {formatNumber2Decimal({ value: summaryData?.spi })}
        </p>
      </div>
      <div></div>
      <div>
        <p className="pt-3 mt-3 font-medium text-gray-400 text-sm">
        {t("Variance at completion")}
        </p>
        <p style={{color : summaryData?.variance_at_completion  <0 ?'red': 'rgb(0 135 104 / var(--tw-text-opacity))'}}>
          {formatCurrency({ value: summaryData?.variance_at_completion })}
        </p>
      </div>
    </div>
  );
}

export default Summary;
