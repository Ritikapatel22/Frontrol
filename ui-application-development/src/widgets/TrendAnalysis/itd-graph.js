import React, { useRef, useEffect } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
require('highcharts/modules/exporting')(Highcharts)

import { TREND_VALUES, COLUMN_NAMES_TREND } from './columnData'
import { getSummaryData, gmNsrvalue } from '../../TransposeData'
import { formatCurrency, formatPercentage } from "../../formatData";
import { useTranslation } from 'react-i18next'

const ITDGraph = ({
  block,
  filteredData,
  exportOption,
  handleExportOption,
  widgetRootData
}) => 
{
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

  categoriesData = widgetRootData?.extensions.period;

    const summarizedData = getSummaryData(filteredData, COLUMN_NAMES_TREND, 0, true, "project_func_currency_code");
    const itdCost =summarizedData?.['actual_cost_series']?.[11]
    const itdRev =summarizedData?.['actual_gross_revenue_series']?.[11]
    const gmNsr = gmNsrvalue(filteredData)

    const uniqueGraphID = "itdGraph"
    const graphInitialized = useRef(false);
    const uniqueInstanceID = block.instanceId

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
          text: '',
        },
      },
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
        stacking: 'normal',
      },
      series: {
        pointWidth: 21
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
        name: t(TREND_VALUES['actual_margin_series'].label),
        color: TREND_VALUES['actual_margin_series'].color,
        data: summarizedData['actual_margin_series'],
      },
      {
        type: 'column',
        name: t(TREND_VALUES['actual_cost_series'].label),
        color: TREND_VALUES['actual_cost_series'].color,
        data: summarizedData['actual_cost_series'],
      },
      {
        type: 'line',
        name: t(TREND_VALUES['approved_cost_budget_series'].label),
        color: TREND_VALUES['approved_cost_budget_series'].color,
        data: summarizedData['approved_cost_budget_series'],
      },
      {
        type: 'line',
        name: t(TREND_VALUES['forecast_cost_budget_series'].label),
        color: TREND_VALUES['forecast_cost_budget_series'].color,
        data: summarizedData['forecast_cost_budget_series'],
      },
      {
        type: 'line',
        name: t(TREND_VALUES['approved_rev_budget_cst_series'].label),
        color: TREND_VALUES['approved_rev_budget_cst_series'].color,
        data: summarizedData['approved_rev_budget_cst_series'],
        dashStyle: 'Dash',
      },
      {
        type: 'line',
        name: t(TREND_VALUES['forecast_revenue_budget_series'].label),
        color: TREND_VALUES['forecast_revenue_budget_series'].color,
        data: summarizedData['forecast_revenue_budget_series'],
        dashStyle: 'Dash',
      },
      {
        type: 'line',
        name: t(TREND_VALUES['itd_billing_series'].label),
        color: TREND_VALUES['itd_billing_series'].color,
        data: summarizedData['itd_billing_series'],
      },
    ],
  }

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
    <>
      <div className="data_graph_boxes">
        <div className={block.isFullScreen? "data_bx":"data_graph_bx"}>
          <h1 className="right-aligned">{t('ITD cost')}</h1>
          <h2 className="right-aligned"  style={{color:itdCost<0?'red' :'#00353e'}}>{formatCurrency({ value: summarizedData?.['actual_cost_series']?.[11]})}</h2>
        </div>
        <div className={block.isFullScreen? "data_bx":"data_graph_bx"}>
          <h1 className="right-aligned">{t('ITD revenue')}</h1>
          <h2 className="right-aligned"  style={{color:itdRev<0?'red' :'00353e'}}>{formatCurrency({ value: summarizedData?.['actual_gross_revenue_series']?.[11]})}</h2>
        </div>
        <div className={block.isFullScreen? "data_bx":"data_graph_bx"}>
          <h1 className="right-aligned">{t('GM / NSR')}</h1>
          <h2 className="right-aligned" style={{color:gmNsr<0?'red' :'00353e'}}>{formatPercentage({ value: gmNsr})}</h2>
        </div>
      </div>
      <div id={uniqueInstanceID}>
        <HighchartsReact
          ref={ref}
          highcharts={Highcharts}
          options={chartsData}
        />
      </div>
    </>
  )
}

export default ITDGraph
