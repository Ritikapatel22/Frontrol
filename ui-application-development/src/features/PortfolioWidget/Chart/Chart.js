import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { jsonData, getSummaryData, getTableData } from "../../../TransposeData";
import COLUMN_NAMES from "../../../ColsToSummaries";

export const createSeriesSelector = (baseSelector) =>
  createSelector(baseSelector, ({ data }) => {
    const summarizedData = getSummaryData(data, COLUMN_NAMES, 0);
    return data?.map((p) => p.billedAR60Days);
  });

export function Chart({ baseSelector }) {
  const selectSeries = createSeriesSelector(baseSelector);

  const series = useSelector(selectSeries);

  return (
    <div>
      Chart is
      {series?.map((s, i) => (
        <ul key={i}>
          {s.map((item, j) => (
            <li key={i + j}>{item}</li>
          ))}
        </ul>
      ))}
    </div>
  );
}
