import React, { useRef, useEffect, useState } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
// Load Highcharts modules
require('highcharts/modules/exporting')(Highcharts)
import { EARNED_VALUE_COLUMN_NAMES } from './columnData';
import { useTranslation } from 'react-i18next'
import { formatCurrency } from "../../formatData";

const EarnedValueGraph = ({
  filteredData,
  exportOption,
  handleExportOption,
  widgetRootData,
  block
}) => {
  const ref = useRef(null)
  const { t } = useTranslation(['label'])

  let categoriesData = [
    'Month 1',
    'Month 2',
    'Month 3',
    'Month 4',
    'Month 5',
    'Month 6',
    'Month 7',
    'Month 8',
    'Month 9',
    'Month 10',
    'Month 11',
    'Month 12',
  ]
  if(widgetRootData?.Data?.['EarnedValues.PeriodInfo']?.[0]?.period){
    categoriesData = widgetRootData?.Data?.['EarnedValues.PeriodInfo']?.[0].period.slice(1,-1);
  }

  const uniqueGraphID = "EarnedValueGraph"
  const graphInitialized = useRef(false)
  const uniqueInstanceID = block.instanceId

  if(!block.graphRef){
    block.graphRef = []
  }

  useEffect(() => {
    graphInitialized.current = false
  }, [block.isFullScreen])

  useEffect(() => {
    if (ref && ref.current && ref.current.chart && graphInitialized && !graphInitialized.current) {
    if(!block.graphRef.some((e) => e.name === uniqueGraphID)){
      block.graphRef.push({name : uniqueGraphID , ref :ref.current})
    }
    else {
      const currentGraphRef = block.graphRef.find((e) => e.name === uniqueGraphID)
      if(currentGraphRef)
      currentGraphRef.ref = ref.current
    }
      graphInitialized.current = true
    }
  }, [ref.current, block.isFullScreen])

  const reflow = () => {
    for (const chart of Highcharts.charts) {
      if (chart) {
        chart.reflow()
      }
    }
  }
  useEffect(() => {
    if (block.isFullScreen) {
      document
        .getElementById(uniqueInstanceID)
        .querySelector('div').style.height = '100%'
      reflow()
    } else {
      document
        .getElementById(uniqueInstanceID)
        .querySelector('div').style.height = '260px'
      reflow()
    }
  }, [block.isFullScreen])

  useEffect(() => {
    if (ref && exportOption === 'png') {
      ref?.current?.chart.exportChart()
      handleExportOption('')
    }
  }, [ref, exportOption])

  const chartsData = {
    chart: {
      reflow: true,
      marginLeft: 80,
      // marginRight: 180
    },
    credits: {
      enabled: false,
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: categoriesData,
    },
    yAxis: [
      {
        title: {
          text: `<span style="font-size: 16px">${t('Period')}`,
        },
        opposite: true
      },
      { 
        title: {
          text: `<span style="font-size: 16px">${t('Cumulative')}`, // Secondary yAxis
        },       
    }
    ],
    tooltip: {
      formatter: function () {
        return  '<strong> ' + this.series.name + " : " + 
          formatCurrency( {value: this.y?this.y:0}) 
            + '</strong>'
      }
    },
    plotOptions: {
      column: {
        pointPadding: 0.0,
        borderWidth: 0,
      },
      series: {
        pointWidth: 15
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      // x: 80,
      // y: -10,
      verticalAlign: 'middle',
      itemStyle: {
        fontSize: '12px',
        fontWeight: 'normal',
        fontWeight: 'lighter',
      },
    },
    series: [
      {
        type: 'column',
        name: t(EARNED_VALUE_COLUMN_NAMES['approvedBudget'].label),
        color: EARNED_VALUE_COLUMN_NAMES['approvedBudget'].color,
        data: filteredData?.periodic?.approved_budget
          ? filteredData?.periodic?.approved_budget.slice(1, -1).map(Number)
          : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        type: 'column',
        name: t(EARNED_VALUE_COLUMN_NAMES['actualCost'].label),
        color: EARNED_VALUE_COLUMN_NAMES['actualCost'].color,
        data: filteredData?.periodic?.actual_costs
          ? filteredData.periodic?.actual_costs.slice(1).map(Number)
          : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        yAxis: 0,
        type: 'column',
        name: t(EARNED_VALUE_COLUMN_NAMES['earnedValue'].label),
        color: EARNED_VALUE_COLUMN_NAMES['earnedValue'].color,
        data: filteredData?.periodic?.earned_value
          ? filteredData.periodic?.earned_value.slice(1).map(Number)
          : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        type: 'line',
        name: t(EARNED_VALUE_COLUMN_NAMES['cumulativeApprovedBudget'].label),
        color: EARNED_VALUE_COLUMN_NAMES['cumulativeApprovedBudget'].color,
        data: filteredData?.cummulative?.approved_budget
          ? filteredData.cummulative?.approved_budget.slice(1, -1).map(Number)
          : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          yAxis: 1,
      },
      {
        yAxis: 0,
        type: 'line',
        name: t(EARNED_VALUE_COLUMN_NAMES['cumulativeActualCost'].label),
        color: EARNED_VALUE_COLUMN_NAMES['cumulativeActualCost'].color,
        data: filteredData?.cummulative?.actual_costs
          ? filteredData.cummulative?.actual_costs.slice(1).map(Number)
          : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          yAxis: 1,
      },
      {
        type: 'line',
        name: t(EARNED_VALUE_COLUMN_NAMES['cumulativeEarnedValue'].label),
        color: EARNED_VALUE_COLUMN_NAMES['cumulativeEarnedValue'].color,
        data: filteredData?.cummulative?.earned_value
          ? filteredData.cummulative?.earned_value.slice(1).map(Number)
          : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        dashStyle: 'Dot',
        yAxis: 1,
      },
    ],
  }

  return (
    <div style={{ position: 'relative' }}>
      {filteredData && (
        <div id={uniqueInstanceID}>
          <HighchartsReact
            ref={ref}
            highcharts={Highcharts}
            options={chartsData}
          />
        </div>
      )}
    </div>
  );
}

export default EarnedValueGraph
