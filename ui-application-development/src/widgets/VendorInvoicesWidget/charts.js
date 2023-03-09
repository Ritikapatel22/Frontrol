import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useTranslation } from "react-i18next";
import { SERIES_INFO } from "./ColsToSummaries";
import { updateAuthState } from "../../slices/authslice";
import { getVendorChartData } from "./utilityFunctions";
import { formatCurrency } from "../../formatData";
import "./graph.scss";

require("highcharts/modules/exporting")(Highcharts);

const Charts = ({ data, exportOption, handleExportOption, block }) => {
  const { t } = useTranslation(['label'])
  const [chartData, setChartData] = useState([]);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state?.loginAuth.isLoading);

  const ref = useRef(null);
  const graphInitialized = useRef(false)
  const uniqueGraphID = "supplierInvoiceGraph1"

  Highcharts.setOptions({
    lang: {
      numericSymbols: ["k", "M", "B", "T", "P", "E"],
    },
  });

  if (isLoading && data && data.length > 0) {
    dispatch(updateAuthState(false));
  }

  useEffect(() => {
      if(data) {
        setChartData(getVendorChartData(data));
      }
    },[data])

  if(!block.graphRef) {
    block.graphRef = []
  }

  useEffect(() => {
    graphInitialized.current = false
  }, [block.isFullScreen])

  useEffect(() => {
    if (ref && ref.current && ref.current.chart && graphInitialized && !graphInitialized.current) {
    if(!block.graphRef.some((e) => e.name === uniqueGraphID)) {
      block.graphRef.push({name : uniqueGraphID , ref :ref.current})
    } else {
      const currentGraphRef = block.graphRef.find((e) => e.name === uniqueGraphID)
      if(currentGraphRef)
      currentGraphRef.ref = ref.current
    }
      graphInitialized.current = true
    }
  }, [ref.current, block.isFullScreen])

  const exportChartGraph = () => {
    if (ref && ref.current) {
      ref?.current?.chart.exportChart({filename : `${block.name}_Graph`});
    }
  }

  block.exportChartGraph = exportChartGraph

  useEffect(() => {
    if (ref && exportOption === "png") {
      ref?.current?.chart.exportChart();
      handleExportOption("");
    }
  }, [ref, exportOption]);

  let displayData = [];
  let bucket1 = [];
  let bucket2 = [];
  let supplierName = [];
  
  for (let i = 0; i < chartData.length; i++) {
    if (chartData[i] && chartData[i]['suppliername'] && chartData[i]['suppliername'] !== "Total") {
      supplierName.push(chartData[i]['suppliername']);
    }
    Object.entries(chartData[i]).forEach(([key, value]) => {
      if (key === 'bucket1') {
        bucket1.push(value);
      }
      else if (key === 'bucket2') {
        bucket2.push(value);
      }
    });

  }

  displayData['bucket1'] = bucket1;
  displayData['bucket2'] = bucket2;
  
  const chartsData = {
    chart: {
      width: 767,
      height: 260,
    },
    credits: {
      enabled: false,
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: supplierName,
    },

    yAxis: [
      {
        title: {
          text: '',
        },
      },
    ],
    plotOptions: {
      column: {
        stacking: "normal",
      },
    },
    tooltip: {
      formatter: function () {
        return  '<strong> ' + this.series.name + " : " + 
          formatCurrency( {value: this.y?this.y:0}) 
            + '</strong>'
      } 
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
      itemStyle: {
        fontSize: "12px",
        fontWeight: "normal",
        fontWeight: "lighter",
      },
    },
    series: [
      {
        type: "column",
        name: t(SERIES_INFO["bucket1"].label),
        color: SERIES_INFO["bucket1"].color,
        data: displayData['bucket1']
          ? displayData['bucket1']
          : [0, 0, 0, 0, 0],
      },
      {
        type: "column",
        name: t(SERIES_INFO["bucket2"].label),
        color: SERIES_INFO["bucket2"].color,
        data: displayData['bucket2']
          ? displayData['bucket2']
          : [0, 0, 0, 0, 0],
      }
    ],
  };

  return (
    <>
      {
        displayData && 
        <HighchartsReact
          ref={ref}
          highcharts={Highcharts}
          options={chartsData}
          style="width: 100%; display: block; overflow: hidden;"
        />
      }
    </>
  );

};

export default Charts;
