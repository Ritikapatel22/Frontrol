import React, { useRef, useEffect } from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import './graph.scss'
import { COLUMN_NAMES, SERIES_INFO } from './ColsToSummaries'
import { getSummaryData, getTableData } from '../../TransposeData'
import { useDispatch, useSelector } from 'react-redux'
import { updateAuthState } from '../../slices/authslice'
import { netReceivables } from '../../TransposeData'
import { currencyFactory } from '@frontrolinc/pace-ui-framework'
import { useTranslation } from 'react-i18next'
import { formatCurrency } from "../../formatData";

// Load Highcharts modules
require('highcharts/modules/exporting')(Highcharts)
const Graph = ({
  filteredData,
  exportOption,
  handleExportOption,
  widgetRootData,
  block
}) => {
  let { t } = useTranslation(["label"])
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

  Highcharts.setOptions({
    lang: {
      numericSymbols: ['k', 'M', 'B', 'T', 'P', 'E'],
    },
  })

  const uniqueGraphID = "projectNetReceivableGraph"
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

  const ref = useRef(null)
  const summarizedData = getSummaryData(filteredData, COLUMN_NAMES, 0,'','',true)
  const summarizedDataforTable = getTableData(summarizedData, SERIES_INFO)

  let summarizedARforNR = netReceivables(
    summarizedDataforTable,
    'Accounts Receivable',
    'Net Receivables',
  )
  let summarizedNetUnbilledforNR = netReceivables(
    summarizedDataforTable,
    'Net Unbilled',
    'Net Receivables',
  )
  let seriesDataforAR = []
  if (typeof summarizedARforNR !== 'undefined') {
    delete summarizedARforNR.aging
    delete summarizedARforNR.group
    seriesDataforAR = Object.values(summarizedARforNR)
  }

  let seriesDataforUnbilled = []
  if (typeof summarizedNetUnbilledforNR !== 'undefined') {
    delete summarizedNetUnbilledforNR.aging
    delete summarizedNetUnbilledforNR.group
    seriesDataforUnbilled = Object.values(summarizedNetUnbilledforNR)
  }

  const chartsData = {
    chart: {
      reflow: true,
      // width: 800,
      // height: 260,
      // type: 'column',
      marginLeft: 120,
      marginRight: 180
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
          // text: 'Accounts Receivable',
          text: `<span style="font-size: 16px">${t('Net receivables')}`,
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
        // name: SERIES_INFO["ar_0030_series"].label,
        // color: SERIES_INFO["ar_0030_series"].color,
        // data: summarizedData["ar_0030_series"]?summarizedData["ar_0030_series"]:[0,0,0,0,0,0,0,0,0,0,0,0],
        name: t('Account receivables'),
        color: SERIES_INFO['ar_0030_series'].color,
        // data: [10,20,30,40,50,60,77,80,90,100,110,120],
        data: seriesDataforAR
          ? seriesDataforAR
          : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

        legendIndex: 1,
      },
      {
        type: 'column',
        // name: SERIES_INFO["ar_3160_series"].label,
        // color: SERIES_INFO["ar_3160_series"].color,
        // data: summarizedData["ar_3160_series"]?summarizedData["ar_3160_series"]:[0,0,0,0,0,0,0,0,0,0,0,0],
        name: t('Net unbilled'),
        color: SERIES_INFO['ar_3160_series'].color,
        // data: [130,140,150,160,170,180,190,200,210,220,230,240],
        data: seriesDataforUnbilled
          ? seriesDataforUnbilled
          : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        legendIndex: 2,
      },
      // {
      //   type: "line",
      //   // name: "Billed AR Days - Actuals",
      //   // name: label6,
      //   // color: "#C70C6F",
      //   // data: [23,19,16],//Billed_AR_Days_Actuals,
      //   name: SERIES_INFO["billedARDaysActuals"].label,
      //   color: SERIES_INFO["billedARDaysActuals"].color,
      //   data: [23,19,16],
      //   yAxis: 1,
      //   legendIndex:0
      // },
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


  const dispatch = useDispatch()
  const isLoading = useSelector((state) => state?.loginAuth.isLoading)

  if (isLoading && filteredData && filteredData.length > 0) {
    dispatch(updateAuthState(false))
  }
  // export chart as PNG
  useEffect(() => {
    if (ref && exportOption === 'png') {
      ref?.current?.chart.exportChart()
      handleExportOption('')
    }
  }, [ref, exportOption])

  // if (filteredData && filteredData.length >0)
  // {

  return (
    <>
      <div id={uniqueInstanceID}>
        <HighchartsReact
          ref={ref}
          highcharts={Highcharts}
          options={chartsData}
          // style="width: 100%; display: block; overflow: hidden;"
        />
      </div>
    </>
  )
  // }else
  // {
  //   return (
  //     <>
  //       <div>Loading...</div>
  //     </>
  //   );
  // }
}

export default Graph
