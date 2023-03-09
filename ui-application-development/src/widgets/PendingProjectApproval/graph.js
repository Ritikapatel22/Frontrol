import React, { useRef, useEffect } from "react";
import Highcharts from "highcharts";
import PieChart from "highcharts-react-official";
import { outstandingWorkflow } from "../../TransposeData";
import { useDispatch, useSelector } from "react-redux";
import { updateAuthState } from "../../slices/authslice";
import { useTranslation } from "react-i18next";
import { formatNumber } from "../../formatData";

const Graph = ({ filteredData, exportOption, handleExportOption, block }) => {
  const { t } = useTranslation(['label'])
  const ref = useRef(null);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state?.loginAuth.isLoading);
  let summarizedDataforTable = outstandingWorkflow(filteredData, "graph");

  const exportChartGraph = () => {
    if (ref && ref.current){
    ref?.current?.chart.exportChart({filename : `${block.name}_Graph`});
  }
  }
  block.exportChartGraph = exportChartGraph  

  if (isLoading && filteredData && filteredData.length > 0) {
    dispatch(updateAuthState(false));
  }
  Object.keys(summarizedDataforTable).forEach((ele)=>{
    summarizedDataforTable[ele].name = t(summarizedDataforTable[ele].name)
  })

  useEffect(() => {
    if (ref && exportOption === "png") {
      ref?.current?.chart.exportChart();
      handleExportOption("");
    }
  }, [ref, exportOption]);

  const uniqueGraphID = "outstandingGraph"
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
      type: "pie",
      reflow: true,
    },
    title: {
      text: "",
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      pointFormat: 'Count: <b>{point.y}</b>',
      formatter: function () {
        return  '<strong> ' + this.point.name + " : " + 
          formatNumber( { value: this.y ? this.y : 0 }) 
            + '</strong>'
      }
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
      itemStyle: {
        fontSize: "12px",
        fontWeight: "lighter",
      },
    },
    plotOptions: {
      pie: {
        colors: [
          "rgb(0,53,62)",
          "#59A089", 
          "rgb(0,135,104)", 
          "rgb(174,204,83)", 
          "rgb(255,206,0)", 
          "rgb(0,154,155)", 
          "rgb(95,144,154)", 
        ],
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          formatter: function() {
            if(this.point.y > 0){
              return this.point.name + ":" + this.point.y
            }
          }
        },
        showInLegend: true,
      },
    },
    series: [
      {
        data: summarizedDataforTable,
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
  };

  if (filteredData && summarizedDataforTable.length > 0) {
    return (
      <div id={uniqueInstanceID}>
        <PieChart
          highcharts={Highcharts}
          options={chartsData}
          ref={ref}
          type="pie"
        />
      </div>
    );
  }
};

export default Graph;
