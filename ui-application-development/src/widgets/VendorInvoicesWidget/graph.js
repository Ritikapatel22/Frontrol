import React, { useRef, useEffect,useState } from "react";
import Highcharts from "highcharts";
import PieChart from "highcharts-react-official";
import { useDispatch, useSelector } from "react-redux";

import { updateAuthState } from "../../slices/authslice";
import { formatCurrency } from "../../formatData";
import { SERIES_INFO } from "./ColsToSummaries";
import { getVendorGraphData } from "./utilityFunctions";
import { useTranslation } from "react-i18next";

const Graph = ({ block, data, exportOption, handleExportOption }) => {
  const [graphData, setGraphData] = useState([]);
  const ref = useRef(null);
  const { t } = useTranslation(['label'])
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state?.loginAuth.isLoading);

  if (isLoading && data && data.length > 0) {
    dispatch(updateAuthState(false));
  }
  
  useEffect(()=>{
    if (data){
      setGraphData(getVendorGraphData(data));
    }
  },[data])
  
  const uniqueGraphID = "supplierInvoiceGraph2"
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

  const exportChartGraph = () => {
    if (ref && ref.current){
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
  let approved, pending_payment;

  Object.entries(graphData).forEach(([key, value]) => {
    if (key === 'paidamount') {
      displayData.push({ name: t(SERIES_INFO["bucket1"].label), y: value });
    } else if (key === 'pendingamount') {
      pending_payment = value;
      displayData.push({ name: t(SERIES_INFO["bucket2"].label), y: value });
    } else if (key === 'totalamount') {
      approved = value;
    }
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

  const chartsData = {
    chart: {
      type: "pie",
      // width: 600,
      // height: 260,
      reflow: true,
    },
    title: {
      text: "",
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      formatter: function () {
        return  '<strong> ' + this.point.name + " : " + 
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
          enabled: false,
        },
        showInLegend: true,
      },
    },
    series: [
      {
        data: displayData,
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

  if (graphData && displayData) {
    return (
      <div>
        <div className="data_graph_boxes" >
          <div className = {block.isFullScreen? "data_bx":"data_graph_bx"}>
            <h1 className="right-aligned">{t('Approved')}</h1>
            <h2 className="right-aligned" style={{color:approved < 0 ? 'red' :'#00353e'}}>{formatCurrency({ value: approved })}</h2>
          </div>
          <div className = {block.isFullScreen? "data_bx":"data_graph_bx"}>
            <h1 className="right-aligned">{t('Pending payment')}</h1>
            <h2 className="right-aligned" style={{color:pending_payment < 0 ? 'red' :'#00353e'}}>{formatCurrency({ value: pending_payment })}</h2>
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
  return <></>;
};

export default Graph;
