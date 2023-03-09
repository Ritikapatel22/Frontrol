import React, { useRef, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "./graph.scss";
import { SERIES_INFO } from "./ColsToSummaries";
import { useDispatch, useSelector } from "react-redux";
import { updateAuthState } from "../../slices/authslice";
import { commitmentsColumnTransform } from "./utilityFunctions";
import { useTranslation} from "react-i18next";
import { formatCurrency } from "../../formatData";
require("highcharts/modules/exporting")(Highcharts);

const Charts = ({ filteredData, exportOption, handleExportOption, block }) => {
  Highcharts.setOptions({
    lang: {
      numericSymbols: ["k", "M", "B", "T", "P", "E"],
    },
  });
  const ref = useRef(null);
  const { t } = useTranslation(['label'])
  const uniqueGraphID = "commitmentsChartGraph"
  const graphInitialized = useRef(false)

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

  const summarizedData = commitmentsColumnTransform(filteredData,"charts", true, 'projfunc_currency_code');
  
  let summarizedDataforTable = [];
  let bucket1 = [];
  let bucket2 = [];
  let bucket3 = [];
  let supplierName = [];
 
  for (let i = 0; i < summarizedData.length; i++) {
    if (summarizedData[i] && summarizedData[i]['suppliername'] && summarizedData[i]['suppliername'] !== "Total") {
      supplierName.push(summarizedData[i]['suppliername']);
    }

    Object.entries(summarizedData[i]).forEach(([key, value]) => {
      if (key == 'bucket2') {
        bucket1.push(value);
      }
      else if (key == 'bucket3') {
        bucket2.push(value);
      }
      else if (key == 'bucket4') {
        bucket3.push(value);
      }
    });
  }
  
  summarizedDataforTable['bucket1'] = bucket1;
  summarizedDataforTable['bucket2'] = bucket2;
  summarizedDataforTable['bucket3'] = bucket3;

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
      categories: supplierName
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
        stacking: "normal",
      },
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
        data: summarizedDataforTable["bucket1"]
          ? summarizedDataforTable["bucket1"]
          : [0, 0, 0]
      },
      {
        type: "column",
        name: t(SERIES_INFO["bucket2"].label),
        color: SERIES_INFO["bucket2"].color,
        data: summarizedDataforTable["bucket2"]
          ? summarizedDataforTable["bucket2"]
          : [0, 0, 0],
      }
    ],
  };

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state?.loginAuth.isLoading);

  if (isLoading && filteredData && filteredData.length > 0) {
    dispatch(updateAuthState(false));
  }
  
  useEffect(() => {
    if (ref && exportOption === "png") {
      ref?.current?.chart.exportChart();
      handleExportOption("");
    }
  }, [ref, exportOption]);

  return (
    <>
      {
        summarizedDataforTable && 
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
