import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { createSeriesSelector } from "../Chart/Chart";
import { jsonData, getSummaryData, getTableData } from "../../../TransposeData";
import {COLUMN_NAMES, SERIES_INFO} "../../../ColsToSummaries";


export function Summary({ baseSelector }) {
  const sumSeries = createSelector(
    createSeriesSelector(baseSelector),
    (data) => {
      const summarizedData = getSummaryData(data, COLUMN_NAMES, 0);
      const summarizedDataforTable = getTableData(summarizedData, [
        "aging",
        "bucket1",
        "bucket2",
        "bucket3",
        "bucket4",
        "bucket5",
        "bucket6",
        "bucket7",
        "bucket8",
        "bucket9",
        "bucket10",
        "bucket11",
        "bucket12",
        "bucket13",
      ]);
      if (summarizedDataforTable.length !== 0) {
        const [gridConfig] = useState(useGridConfig(summarizedDataforTable));
      }


      return data?.map((s) => s.reduce((accum, val) => accum + val), 0);
    }
  );

    // const sumSeries = createSelector(
    //     createSeriesSelector(baseSelector),
    //     (data) => {
    //         const summarizedData = getSummaryData(data, COLUMN_NAMES,0);
    //         const summarizedDataforTable = getTableData( summarizedData,
    //         [
    //             "aging", "bucket1", "bucket2", "bucket3", "bucket4", "bucket5", "bucket6",
    //             "bucket7", "bucket8", "bucket9", "bucket10", "bucket11", "bucket12", "bucket13"]
    //         );
    //         if (summarizedDataforTable.length !== 0){
    //             const [gridConfig] = useState(useGridConfig(summarizedDataforTable));
    //         }

    //         let testData = {

    //             // data: data,
    //             // data: {...gridConfig},
    //             data: (summarizedDataforTable.length !== 0) ?  {...gridConfig}: data
    //         }
    //         return testData
    //     },
    // );   


  const sum = useSelector(sumSeries);
  return (
    <div>
      Projects from customer "Shell" are :{" "}
      {sum?.map((s) => (
        <div>{s}</div>
      ))}
    </div>
  );
}
