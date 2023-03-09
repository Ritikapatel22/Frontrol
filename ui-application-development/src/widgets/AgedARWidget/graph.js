import React, { useRef, useEffect } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import './graph.scss'
import { COLUMN_NAMES, SERIES_INFO } from '../../ColsToSummaries'
import { getSummaryData } from '../../TransposeData'
import { useDispatch, useSelector } from 'react-redux'
import { updateAuthState } from '../../slices/authslice'
import { currencyFactory } from '@frontrolinc/pace-ui-framework'
import { useTranslation } from 'react-i18next';
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

  const { t } = useTranslation(['label']);

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
  const summarizedData = getSummaryData(filteredData, COLUMN_NAMES, 0, true, 'project_func_currency_code')
  const chartsData = {
    chart: {
      reflow: true,
      // width: 767,
      // height: 260,
      // type: 'column'
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

    xAxis: {
      categories: categoriesData,
      // labels: {
      //   rotation: 0
      // }
    },

    yAxis: [
      {
        title: {
          // text: "Accounts Receivable",
          text: `<span style="font-size: 16px">${t("Accounts receivable")}`,
          // style: {
          //   color: '#000',
          //   fontWeight: 'normal',
          // },
        },
      },
    ],
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
        name: t(SERIES_INFO.ar_0030_series.label),
        color: SERIES_INFO['ar_0030_series'].color,
        data: summarizedData['ar_0030_series']
          ? summarizedData['ar_0030_series']
          : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        type: 'column',
        name: t(SERIES_INFO.ar_3160_series.label),
        color: SERIES_INFO['ar_3160_series'].color,
        data: summarizedData['ar_3160_series']
          ? summarizedData['ar_3160_series']
          : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        type: 'column',
        name: t(SERIES_INFO.ar_6190_series.label),
        color: SERIES_INFO['ar_6190_series'].color,
        data: summarizedData['ar_6190_series']
          ? summarizedData['ar_6190_series']
          : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        type: 'column',
        name: t(SERIES_INFO.ar_91180_series.label),
        color: SERIES_INFO['ar_91180_series'].color,
        data: summarizedData['ar_91180_series']
          ? summarizedData['ar_91180_series']
          : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      // {
      //   type: "column",
      //   name: t(SERIES_INFO.ar_121180_series.label),
      //   color: SERIES_INFO["ar_121180_series"].color,
      //   data: summarizedData["ar_121180_series"]?summarizedData["ar_121180_series"]:[0,0,0,0,0,0,0,0,0,0,0,0],
      // },
      {
        type: 'column',
        name: t(SERIES_INFO.ar_over_180_series.label),
        color: SERIES_INFO['ar_over_180_series'].color,
        data: summarizedData['ar_over_180_series']
          ? summarizedData['ar_over_180_series']
          : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        type: 'column',
        name: t(SERIES_INFO.retention_series.label),
        color: SERIES_INFO['retention_series'].color,
        data: summarizedData['retention_series']
          ? summarizedData['retention_series']
          : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      // {
      //   type: "line",
      //   // name: "Billed AR Days - Actuals",
      //   // name: label6,
      //   // color: "#C70C6F",
      //   // data: [23,19,16],//Billed_AR_Days_Actuals,
      //   name: t(SERIES_INFO.billedARDaysActuals.label),
      //   color: SERIES_INFO["billedARDaysActuals"].color,
      //   data: summarizedData["billedARDaysActuals"],
      //   yAxis: 1,
      // },
    ],
  }

  const uniqueGraphID = "arAgedTrendGraph"
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

  const exportChartGraph = () =>{
    if (ref && ref.current){
    ref?.current?.chart.exportChart({filename : `${block.name}_Graph`});
  }
}
block.exportChartGraph = exportChartGraph

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
}

export default Graph
