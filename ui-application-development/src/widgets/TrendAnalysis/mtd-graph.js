import React, { useRef, useEffect } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useTranslation } from 'react-i18next'
require('highcharts/modules/exporting')(Highcharts)
import { TREND_VALUES, COLUMN_NAMES_TREND } from './columnData'
import { getSummaryData } from '../../TransposeData';
import { formatCurrency } from "../../formatData";

const MTDGraph = ({
  block,
  filteredData,
  exportOption,
  handleExportOption,
  widgetRootData,
}) => {
  const { t } = useTranslation(['label'])

  const ref = useRef(null);
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

  categoriesData = widgetRootData?.extensions.period

  const summarizedData = getSummaryData(filteredData, COLUMN_NAMES_TREND, 0, true, "project_func_currency_code")

  const uniqueGraphID = "mtdGraph"
  const graphInitialized = useRef(false)
  const uniqueInstanceID = block.instanceId

  if(!block.graphRef){
    block.graphRef = []
  }
    
  useEffect(() => {
    graphInitialized.current = false
  }, [block.isFullScreen])

  Highcharts.setOptions({
    lang: {
      numericSymbols: ['k', 'M', 'B', 'T', 'P', 'E'],
    },
  })

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
    if (block.fullWidth) {
      document
        .getElementById(uniqueInstanceID)
        .querySelector('div').style.width = '100%'
      reflow()
    } else {
      document
        .getElementById(uniqueInstanceID)
        .querySelector('div').style.width = 'auto'
      reflow()
    }
  }, [block.fullWidth])

  const chartsData = {
    chart: {
      reflow: true,
      marginLeft: 100,
      // alignThresholds: true,
      // below code is to make both axis same
      // events: {
      //   load: function() {
      //     const chart = this;
  
      //     for (let i = 0; i < chart.yAxis.length; i++) {
      //       if (Math.abs(chart.yAxis[i].min) < chart.yAxis[i].max) {
      //         chart.yAxis[i].update({
      //           min: chart.yAxis[i].max * -1,
      //         });
      //       } else {
      //         chart.yAxis[i].update({
      //           max: chart.yAxis[i].min * -1
      //         });
      //       }
      //     }
  
      //   }
      // }
      // marginRight: 205
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
        softMin: 0,
        title: {
          text: 'MTD',
        },
        opposite: true
      },
      { // Secondary yAxis
        softMin: 0,
        title: {
            text: '',
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
        pointWidth: 12
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
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
        name: t(TREND_VALUES.mtd_actual_cost_series.label),
        color: TREND_VALUES['mtd_actual_cost_series'].color,
        data: summarizedData['mtd_actual_cost_series'],
      },
      {
        type: 'column',
        name: t(TREND_VALUES.mtd_cost_plan_series.label),
        color: TREND_VALUES['mtd_cost_plan_series'].color,
        data: summarizedData['mtd_cost_plan_series'],
      },
      {
        type: 'line',
        name: t(TREND_VALUES.approved_cost_budget_series.label),
        color: TREND_VALUES['approved_cost_budget_series'].color,
        data: summarizedData['approved_cost_budget_series'],
        yAxis: 1,
      },
      {
        type: 'line',
        name: t(TREND_VALUES.forecast_cost_budget_series.label),
        color: TREND_VALUES['forecast_cost_budget_series'].color,
        data: summarizedData['forecast_cost_budget_series'],
        yAxis: 1,
      },
      {
        type: 'line',
        name: t(TREND_VALUES.approved_rev_budget_cst_series.label),
        color: TREND_VALUES['approved_rev_budget_cst_series'].color,
        data: summarizedData['approved_rev_budget_cst_series'],
        dashStyle: 'Dash',
        yAxis: 1,
      },
      {
        type: 'line',
        name: t(TREND_VALUES.forecast_revenue_budget_series.label),
        color: TREND_VALUES['forecast_revenue_budget_series'].color,
        data: summarizedData['forecast_revenue_budget_series'],
        dashStyle: 'Dash',
        yAxis: 1,
      },
       {
        type: 'line',
        name: t(TREND_VALUES.mtd_billing_series.label),
        color: TREND_VALUES['mtd_billing_series'].color,
        data: summarizedData['mtd_billing_series']
      },
    ],
  }
  
  useEffect(() => {
    if (ref && exportOption === 'png') {
      ref?.current?.chart.exportChart()
      handleExportOption('')
    }
  }, [ref, exportOption])

  const exportChartGraph = () =>{
    if (ref && ref.current){
    ref?.current?.chart.exportChart({filename : `${block.name}_Graph`});
  }
}
block.exportChartGraph = exportChartGraph

  return (
    <div id={uniqueInstanceID}>
      <HighchartsReact
        ref={ref}
        highcharts={Highcharts}
        options={chartsData}
      />
    </div>
  )
}

export default MTDGraph
