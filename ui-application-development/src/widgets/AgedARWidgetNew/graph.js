import React, { useRef, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "./graph.scss";
import { COLUMN_NAMES, SERIES_INFO } from "../../ColsToSummaries";
import { getSummaryData } from "../../TransposeData";
import { useDispatch, useSelector } from "react-redux";
import { updateAuthState } from "../../slices/authslice";
import { useTranslation } from 'react-i18next';
// Load Highcharts modules
require("highcharts/modules/exporting")(Highcharts);
const Graph = ({ filteredData, exportOption, handleExportOption }) => {
  Highcharts.setOptions({
    lang: {
      numericSymbols: ["k", "M", "B", "T", "P", "E"],
    },
  });
  const { t } = useTranslation(['label']);
  console.log("SERIES_INFO", SERIES_INFO)
  const ref = useRef(null);
  const summarizedData = getSummaryData(filteredData, COLUMN_NAMES, 0);
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
      // align: 'center'
    },
    xAxis: {
      categories: [
        "Sep-21",
        "Oct-21",
        "Nov-21",
        "Dec-21",
        "Jan-21",
        "Feb-21",
        "Mar-21",
        "Apr-21",
        "May-21",
        "Jun-22",
        "Jul-22",
        "Current",
      ],
    },

    yAxis: [
      {
        title: {
          // text: "Accounts Receivable",
          text: '<span style="font-size: 16px">Accounts Receivable',
          style: {
            color: "#000",
            fontWeight: "normal",
          },
        },
      },
    ],
    plotOptions: {
      column: {
        stacking: "normal",
      },
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
      // fontWeight: "normal",
      itemStyle: {
        fontSize: "12px",
        fontWeight: "normal",
        fontWeight: "lighter",
      },
    },
    series: [
      {
        type: "column",
        name: t(SERIES_INFO["ar_0030_series"].label),
        color: SERIES_INFO["ar_0030_series"].color,
        data: summarizedData["ar_0030_series"]
          ? summarizedData["ar_0030_series"]
          : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        type: "column",
        name: t(SERIES_INFO["ar_3160_series"].label),
        color: SERIES_INFO["ar_3160_series"].color,
        data: summarizedData["ar_3160_series"]
          ? summarizedData["ar_3160_series"]
          : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        type: "column",
        name: t(SERIES_INFO["ar_6190_series"].label),
        color: SERIES_INFO["ar_6190_series"].color,
        data: summarizedData["ar_6190_series"]
          ? summarizedData["ar_6190_series"]
          : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        type: "column",
        name: t(SERIES_INFO["ar_91180_series"].label),
        color: SERIES_INFO["ar_91180_series"].color,
        data: summarizedData["ar_91180_series"]
          ? summarizedData["ar_91180_series"]
          : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      // {
      //   type: "column",
      //   name: t(SERIES_INFO["ar_121180_series"].label),
      //   color: SERIES_INFO["ar_121180_series"].color,
      //   data: summarizedData["ar_121180_series"]?summarizedData["ar_121180_series"]:[0,0,0,0,0,0,0,0,0,0,0,0],
      // },
      {
        type: "column",
        name: t(SERIES_INFO["ar_over_180_series"].label),
        color: SERIES_INFO["ar_over_180_series"].color,
        data: summarizedData["ar_over_180_series"]
          ? summarizedData["ar_over_180_series"]
          : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        type: "column",
        name: t(SERIES_INFO["retention_series"].label),
        color: SERIES_INFO["retention_series"].color,
        data: summarizedData["retention_series"]
          ? summarizedData["retention_series"]
          : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      // {
      //   type: "line",
      //   // name: "Billed AR Days - Actuals",
      //   // name: label6,
      //   // color: "#C70C6F",
      //   // data: [23,19,16],//Billed_AR_Days_Actuals,
      //   name: t(SERIES_INFO["billedARDaysActuals"].label),
      //   color: SERIES_INFO["billedARDaysActuals"].color,
      //   data: summarizedData["billedARDaysActuals"],
      //   yAxis: 1,
      // },
    ],
  };

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state?.loginAuth.isLoading);

  if (isLoading && filteredData && filteredData.length > 0) {
    dispatch(updateAuthState(false));
  }
  // export chart as PNG
  useEffect(() => {
    if (ref && exportOption === "png") {
      ref?.current?.chart.exportChart();
      handleExportOption("");
    }
  }, [ref, exportOption]);

  // if (filteredData && filteredData.length >0)
  // {

  return (
    <>
      <div>
        <HighchartsReact
          ref={ref}
          highcharts={Highcharts}
          options={chartsData}
          style="width: 100%; display: block; overflow: hidden;"
        />
      </div>
    </>
  );
};

export default Graph;
