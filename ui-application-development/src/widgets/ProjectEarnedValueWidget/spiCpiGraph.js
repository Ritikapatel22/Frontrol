import React, { useRef, useEffect, useState } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { currencyFactory } from '@frontrolinc/pace-ui-framework';
// Load Highcharts modules
require('highcharts/modules/exporting')(Highcharts)
import { createGraphValues, EARNED_VALUE_COLUMN_NAMES } from './columnData'
import { useTranslation } from 'react-i18next';
import { formatCurrency } from "../../formatData";

const SPICPIGraph = ({
  data,
  exportOption,
  handleExportOption,
  widgetRootData,
  block
}) => {
  const ref = useRef(null)
  
  const [cpi, setCpi] = useState([])
  const [spi, setSpi] = useState([])
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
    categoriesData = widgetRootData?.Data['EarnedValues.PeriodInfo'][0].period.slice(1,-1);
  }

  const uniqueGraphID = "spiCpiGraph"
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

  useEffect(() => {
    if (data && data?.period?.length > 0) {
      const current = createGraphValues(data)
      setCpi(current.cpi)
      setSpi(current.spi)
    }
  }, [data])

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

  const chartsData = {
    chart: {
      // height: 260,
      marginLeft: 80,
      marginRight: 240
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
    yAxis: {
      title: {
        text: '',
      },
      labels: {
        formatter: function () {
          return this?.value?.toFixed(2) 
        }
      }
    },
    tooltip: {
      formatter: function () {
        return  '<strong> ' + this.series.name + " : " + this.y ? this.y : 0 + '</strong>'
      }
    },
    plotOptions: {
      column: {
        stacking: 'normal',
      },
      series: {
        pointWidth: 15
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
        type: 'line',
        name: t('CPI'),
        color: EARNED_VALUE_COLUMN_NAMES['CPI'].color,
        data: cpi ? cpi.slice(1) : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        type: 'line',
        name: t('SPI'),
        color: EARNED_VALUE_COLUMN_NAMES['SPI'].color,
        data: spi ? spi.slice(1) : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    ],
  }

  useEffect(() => {
    if (ref && exportOption === 'png') {
      ref?.current?.chart.exportChart()
      handleExportOption('')
    }
  }, [ref, exportOption])

  return (
    <div style={{ position: 'relative' }}>
      <div id={uniqueInstanceID}>
        <HighchartsReact
          ref={ref}
          highcharts={Highcharts}
          options={chartsData}
        />
      </div>
    </div>
  )
}

export default SPICPIGraph
