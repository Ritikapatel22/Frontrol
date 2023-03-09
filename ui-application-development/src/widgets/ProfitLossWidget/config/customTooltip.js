import React, { useMemo } from "react";

export default (props) => {
  const isHeader = props.rowIndex === undefined
  let data ;
  if(!isHeader) {
     data = useMemo(
      () => props.api.getDisplayedRowAtIndex(props.rowIndex).data,
      []
    );
  }

  return (
    <div className="custom-tooltip" style={{ backgroundColor: props.color || "white" }}>
        {data?.description}
    </div>
  );
};
