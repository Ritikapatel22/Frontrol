import React, { useRef, useEffect } from "react";
import Highcharts from "highcharts";
import PieChart from "highcharts-react-official";
import { useDispatch, useSelector } from "react-redux";
import { updateAuthState } from "../../slices/authslice";
import { SERIES_INFO } from "./ColsToSummaries";
import { formatCurrency } from "../../formatData";
import { commitmentsColumnTransform } from "./utilityFunctions";
import { useTranslation } from "react-i18next";

const Graph = ({ block, filteredData, exportOption, handleExportOption }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state?.loginAuth.isLoading);
  let summarizedDataforTable = commitmentsColumnTransform(filteredData, "graph", true, 'projfunc_currency_code');
  let totalPoValue;
  let invoiced;
  let remaining;
  let graphData = [];
  const { t } = useTranslation('label');
  Object.entries(summarizedDataforTable).forEach(([key, value]) => {
    if (key == 'bucket1') {
      totalPoValue = value;
    }
    if (key == 'bucket2') {
      graphData.push({ name: SERIES_INFO["bucket1"].label, y: value });
      invoiced = value;
    }
    else if (key == 'bucket3') {
      graphData.push({ name: SERIES_INFO["bucket2"].label, y: value });
      remaining = value;
    }
  });

  Object.keys(graphData).forEach((ele)=>{
    graphData[ele].name = t(graphData[ele].name)
  })
  const ref = useRef(null);

  const uniqueGraphID = "commitmentsGraph"
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
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      itemStyle: {
        fontSize: '12px',
        fontWeight: 'lighter',
      },
    },
    tooltip: {
      formatter: function () {
          return  '<strong> ' + this.point.name + " : " + 
            formatCurrency( {value: this.y?this.y:0}) 
              + '</strong>'
      }
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
          enabled: false,
        },
        showInLegend: true,
      },
    },
    series: [
      {
        data: graphData,
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

  const exportChartGraph = () =>{
    if (ref && ref.current){
    ref?.current?.chart.exportChart({filename : `${block.name}_Graph`});
  }
  }
  block.exportChartGraph = exportChartGraph  

  if (isLoading && filteredData && filteredData.length > 0) {
    dispatch(updateAuthState(false));
  }

  useEffect(() => {
    if (ref && exportOption === "png") {
      ref?.current?.chart.exportChart();
      handleExportOption("");
    }
  }, [ref, exportOption]);
  
  if (summarizedDataforTable && graphData) {
    return (
      <div>
        <div className="data_graph_boxes">
          <div className={block.isFullScreen? "data_bx":"data_graph_bx"}>
            <h1 className="right-aligned">{t('Total PO value')}</h1>
            <h2 className="right-aligned" style={{color:totalPoValue <0 ? 'red' :'#00353e'}}>{formatCurrency({ value: totalPoValue })}</h2>
          </div>
          <div className={block.isFullScreen? "data_bx":"data_graph_bx"}>
            <h1 className="right-aligned">{t('Invoiced')}</h1>
            <h2 className="right-aligned" style={{color:invoiced <0 ? 'red' :'#00353e'}}>{formatCurrency({ value: invoiced })}</h2>
          </div>
          <div className={block.isFullScreen? "data_bx":"data_graph_bx"}>
            <h1 className="right-aligned">{t('Remaining')}</h1>
            <h2 className="right-aligned" style={{color:remaining <0 ? 'red' :'#00353e'}}>{formatCurrency({ value: remaining })}</h2>
          </div>
        </div>
        <div id={uniqueInstanceID}>
          <PieChart
            highcharts={Highcharts}
            options={chartsData}
            ref={ref}
            type="pie"
          />
        </div>
      </div>
    );
  }
};

export default Graph;
