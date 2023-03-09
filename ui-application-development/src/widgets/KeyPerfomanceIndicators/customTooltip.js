import React, { useMemo } from "react";

export default (props) => {
  const isHeader = props.rowIndex === undefined;
  let data;
  if (!isHeader) {
    data = useMemo(
      () => props.api.getDisplayedRowAtIndex(props.rowIndex).data,
      []
    );
  }

  return (
    <div className="custom-tooltip" style={{whiteSpace: "pre-wrap"}}>
      {props.colDef.tooltipField == "kpi_tooltip" && data && data.kpi_tooltip}
      {props.colDef.tooltipField == "description" && data && data.description}
    </div>
  );
};
