import React, { useRef, useEffect } from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import './graph.scss'
import { SERIES_INFO, COLUMN_NAMES } from './graphSummaries'
import { getSummaryData, gridData ,itdCostvalue,itdRevenuevalue,gmNsrvalue} from '../../TransposeData'
import { formatCurrency, formatPercentage } from "../../formatData";
import { currencyFactory } from '@frontrolinc/pace-ui-framework'
import { useTranslation } from 'react-i18next'
require('highcharts/modules/exporting')(Highcharts)
const Graph = ({
  filteredData,
  exportOption,
  handleExportOption,
  widgetRootData,
  block
}) => {
  const ref = useRef(null)
  const { t } = useTranslation(["label"])

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
  const projectID = window.location.href.split("/project/")[1];
  const summarizedData = getSummaryData(filteredData, COLUMN_NAMES, 0, true,projectID ? "" : "project_func_currency_code")

  const itd_cost = summarizedData?.['actual_cost_series']?.[11]
  const itd_rev = summarizedData?.['actual_gross_revenue_series']?.[11]
  const gmNsr = gmNsrvalue(filteredData)

  //  const ItdCost = itdCostvalue(filteredData, true)
  //  const ItdRevenue = itdRevenuevalue(filteredData, true)
  const uniqueGraphID = "P&LGraph"
  const graphInitialized = useRef(false)
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
      // width: 767,
      // height: 260,
      reflow: true,
      marginLeft: 120,
      // marginRight: 205
    },
    credits: {
      enabled: false,
    },
    title: {
      text: '',
      // align: 'center'
    },
    xAxis: {
      categories: categoriesData,
    },
    yAxis: [
      {
        title: {
          text: '<span style="font-size: 16px">',
          // style: {
          //   color: '#000',
          //   fontWeight: 'normal',
          // },
        },
      },
    ],
    tooltip: {
      formatter: function () {
        // return  '<strong> ' + this.series.name + " : " + 
        //   new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: currencyFactory.fractionValue, maximumFractionDigits: currencyFactory.fractionValue }).format( this.y?this.y:0 ) 
        //   + '</strong>'

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
        pointWidth: 21,
        states: {
          hover: {
              enabled: true
          }
      }
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      // fontWeight: "normal",
      itemStyle: {
        fontSize: '12px',
        fontWeight: 'normal',
        fontWeight: 'lighter',
      },
    },
    series: [
      {
        type: 'column',
        name: t(SERIES_INFO['actual_margin_series'].label),
        color: SERIES_INFO['actual_margin_series'].color,
        data: summarizedData['actual_margin_series'],
      },
      {
        type: 'column',
        name: t(SERIES_INFO['actual_cost_series'].label),
        color: SERIES_INFO['actual_cost_series'].color,
        data: summarizedData['actual_cost_series'],
      },
      {
        type: 'line',
        name: t(SERIES_INFO['approved_cost_budget_series'].label),
        color: SERIES_INFO['approved_cost_budget_series'].color,
        data: summarizedData['approved_cost_budget_series'],
        // dashStyle: 'dot',
      },
      {
        type: 'line',
        name: t(SERIES_INFO['forecast_cost_budget_series'].label),
        color: SERIES_INFO['forecast_cost_budget_series'].color,
        data: summarizedData['forecast_cost_budget_series'],
        // dashStyle: 'dot',
      },
      {
        type: 'line',
        name: t(SERIES_INFO['approved_rev_budget_cst_series'].label),
        color: SERIES_INFO['approved_rev_budget_cst_series'].color,
        data: summarizedData['approved_rev_budget_cst_series'],
        dashStyle: 'dot',
      },
      {
        type: 'line',
        name: t(SERIES_INFO['forecast_revenue_budget_series'].label),
        color: SERIES_INFO['forecast_revenue_budget_series'].color,
        data: summarizedData['forecast_revenue_budget_series'],
        dashStyle: 'dot',
      },
      {
        type: 'line',
        name: t(SERIES_INFO['billing_series'].label),
        color: SERIES_INFO['billing_series'].color,
        data: summarizedData['billing_series'],
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
      {/* <div style={{ position: 'relative' }}>
        <div className="data_graph_boxes">
          <div className="data_graph_bx">
            <h1 style={{textAlign:'right'}}>ITD cost</h1>
            <h2>{formatNumber2Decimal({ value: ItdCost })}</h2>
          </div>
          <div className="data_graph_bx">
            <h1 style={{textAlign:'right'}}>ITD revenue</h1>
            <h2>{formatNumber2Decimal({ value: ItdRevenue })}</h2>
          </div>
          <div className="data_graph_bx">
            <h1 style={{textAlign:'right'}}>GM/NSR</h1>
            <h2>{formatPercentage({ value: gmNsr })}</h2>
          </div>
        </div> */}

        <div className="data_graph_boxes">
          <div className={block.isFullScreen? "data_bx":"data_graph_bx"}>
            <h1 className="right-aligned">{t('ITD cost')}</h1>
            <h2 className="right-aligned" style={{color : itd_cost <0  ? 'red' : '00353e'}}>{formatCurrency({ value: summarizedData?.['actual_cost_series']?.[11]})}</h2>
          </div>
          <div className={block.isFullScreen? "data_bx":"data_graph_bx"}>
            <h1 className="right-aligned" >{t('ITD revenue')}</h1>
            <h2 className="right-aligned" style={{color : itd_rev <0  ? 'red' : '00353e'}}>{formatCurrency({ value: summarizedData?.['actual_gross_revenue_series']?.[11]})}</h2>
          </div>
          <div className={block.isFullScreen? "data_bx":"data_graph_bx"}>
            <h1 className="right-aligned">{t('GM / NSR')}</h1>
            <h2 className="right-aligned" style={{color : gmNsr <0  ? 'red' : '00353e'}}>{formatPercentage({ value: gmNsr})}</h2>
          </div>
        </div>
        <div id={uniqueInstanceID}>
          <HighchartsReact
            ref={ref}
            highcharts={Highcharts}
            options={chartsData}
            // style="width: 100%; display: block; overflow: hidden;"
          />
        </div>
      {/* </div> */}
    </>
  )
}

export default Graph
