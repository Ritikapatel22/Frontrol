import React, { useRef, useEffect } from 'react'

import Highcharts from 'highcharts'
import PieChart from 'highcharts-react-official'
// import { COLUMN_NAMES, SERIES_INFO } from "../../ColsToSummaries";
import { getSummaryData, getSummaryTableData } from '../../TransposeData'
import { useDispatch, useSelector } from 'react-redux'
import { updateAuthState } from '../../slices/authslice'
import { sumofallegends, paidvalue } from '../../TransposeData'
import { formatCurrency } from '../../formatData'
import { currencyFactory } from '@frontrolinc/pace-ui-framework'
import { useTranslation } from 'react-i18next'

import config from './config'
import { json } from 'react-router-dom'
const { COLUMN_NAMES, SERIES_INFO } = config.summaryMappings

const Graph = ({ filteredData, exportOption, handleExportOption, block }) => {
  const { t } = useTranslation(['label'])
  const summarizedData = getSummaryData(filteredData, COLUMN_NAMES, 0, true)
  const info = JSON.parse(JSON.stringify(SERIES_INFO))
  Object.keys(info).forEach((key) => {
    info[key].label = t(SERIES_INFO[key].label)
  })
  const summaryData = getSummaryTableData(summarizedData, info)
  const invoiceData = getInvoiceData(summaryData)

  function getInvoiceData(data) {
    var invoiceData = []
    data.map((item, key) => {
      invoiceData.push({
        name: item.aging,
        y: item.balance < 0 ? item.balance.toFixed(0) * -1 : item.balance,
        x: item.balance < 0 ? false : true,
      })
    })
    return invoiceData
  }

  const arTotal = sumofallegends(invoiceData)
  const cashTotal = paidvalue(invoiceData)
  const billedTotal = cashTotal + arTotal

  const ref = useRef(null)

  const uniqueGraphID = 'BilledArGraph'
  const graphInitialized = useRef(false)
  const uniqueInstanceID = block.instanceId

  if (!block.graphRef) {
    block.graphRef = []
  }

  useEffect(() => {
    graphInitialized.current = false
  }, [block.isFullScreen])

  useEffect(() => {
    if (
      ref &&
      ref.current &&
      ref.current.chart &&
      graphInitialized &&
      !graphInitialized.current
    ) {
      if (!block.graphRef.some((e) => e.name === uniqueGraphID)) {
        block.graphRef.push({ name: uniqueGraphID, ref: ref.current })
      } else {
        const currentGraphRef = block.graphRef.find(
          (e) => e.name === uniqueGraphID,
        )
        if (currentGraphRef) currentGraphRef.ref = ref.current
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
      type: 'pie',
      // width: 600,
      // height: 260,
      reflow: true,
    },
    title: {
      text: '',
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      formatter: function () {
        // return  '<strong> ' + this.point.name + " : " +
        //   new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: currencyFactory.fractionValue, maximumFractionDigits: currencyFactory.fractionValue }).format( this.y? this.point.x ==true ? this.y :this.y*-1:0 )
        //   + '</strong>'
        return (
          '<strong> ' +
          this.point.name +
          ' : ' +
          formatCurrency({
            value: this.y ? (this.point.x == true ? this.y : this.y * -1) : 0,
          }) +
          '</strong>'
        )
      },
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      itemStyle: {
        fontSize: '12px',
        fontWeight: 'lighter',
      },
      // labelFormat: '{name} : {y:.2f}',
      labelFormatter: function () {
        console.log(this);
        return  this.name + ': <strong>' +  formatCurrency({value: this.options.y}) + '</strong>';
        // return this.name + ':' + this.total ;
    }
    },
    plotOptions: {
      pie: {
        colors: [
          '#59A089',
          'rgb(0,53,62)', //Billed AR Current #008768
          'rgb(0,135,104)', //Billed AR 31 - 60 Days #008768
          'rgb(174,204,83)', //Billed AR 61 - 90 Days #AECC53
          'rgb(255,206,0)', //Billed AR 91 - 180 Days #FFCE00
          'rgb(0,154,155)', //"Billed AR > 180 Days #E52013
          'rgb(95,144,154)', //retention #5F909A
        ],
        allowPointSelect: true,
        cursor: 'pointer',
        size: '100%',
        dataLabels: {
          enabled: false,
          // alignTo: 'connectors',
          // connectorShape: 'crookedLine',
          // crookDistance: '70%',
          // formatter: function () {

          //   return '<div><b>' + this.point.name + ' : '+ formatCurrency( {value: this.point.y? this.point.x ==true ? this.point.y :this.point.y*-1:0}) + '</b></div>';

          // }
        },
        showInLegend: true,
      },
    },
    series: [
      {
        data: invoiceData,
      },
    ],
    marker: {
      enabled: false,
      states: {
        hover: {
          enabled: false,
        },
      },
    },
    hoverData: null,
  }

  const exportChartGraph = () => {
    if (ref && ref.current) {
      ref?.current?.chart.exportChart({ filename: `${block.name}_Graph` })
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

  if (filteredData) {
    return (
      <>
        <div>
          <div className="data_graph_boxes">
            <div className={block.isFullScreen? "data_bx":"data_graph_bx"}>
              <h1 className="right-aligned">{t('Billed')}</h1>
              <h2
                className="right-aligned"
                style={{ color: billedTotal < 0 ? 'red' : '#00353e' }}
              >
                {formatCurrency({ value: billedTotal })}
              </h2>
            </div>
            <div className={block.isFullScreen? "data_bx":"data_graph_bx"}>
              <h1 className="right-aligned">{t('Cash')}</h1>
              <h2
                className="right-aligned"
                style={{ color: cashTotal < 0 ? 'red' : '#00353e' }}
              >
                {formatCurrency({ value: cashTotal })}
              </h2>
            </div>
            <div className={block.isFullScreen? "data_bx":"data_graph_bx"}>
              <h1 className="right-aligned">{t('AR')}</h1>
              <h2
                className="right-aligned"
                style={{ color: arTotal < 0 ? 'red' : '#00353e' }}
              >
                {formatCurrency({ value: arTotal })}
              </h2>
            </div>
          </div>
          <div id={uniqueInstanceID}>
            <PieChart
              highcharts={Highcharts}
              options={chartsData}
              ref={ref}
              // style="width: 100%; display: block; overflow: hidden;"
              type="pie"
            />
          </div>
        </div>
      </>
    )
  }
  // else {
  //   return (
  //     <>
  //       <div>Loading...</div>
  //     </>
  //   );
  // }
}

export default Graph
