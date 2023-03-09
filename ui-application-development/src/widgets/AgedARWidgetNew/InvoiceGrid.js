import React, { useEffect, useState } from "react";
import { Grid } from "@frontrolinc/pace-ui-framework";
import config from "./config";
import invoiceData from "./invoice.json";
const InvoiceGrid = (props) => {
  const [invoiceFilterdata, setinvoiceFilterdata] = useState([]);

  const selectedProject = props.invoiceProps.selectedProject;
  const invoiceGridConfig = {
    uiConfig: config.projectInvoiceConfig,
    rows: invoiceFilterdata,
    style: props.style || { height: 250, width: 645 },
  };

  const invoiceFilterData = () => {
    const resultInvoice = invoiceData.filter((item, key) => {
      return item.project_number == selectedProject.data.project_number;
    });
    setinvoiceFilterdata(resultInvoice);
  };
  useEffect(() => {
    invoiceFilterData();
  }, []);
  return (
    <div>
      <div className="invoiceHeading">
        Project number: {selectedProject.data?.project_number}, Project name:{" "}
        {selectedProject.data?.project_name},{" "}
        {selectedProject.column?.userProvidedColDef?.headerName}{" "}
      </div>
      <Grid {...invoiceGridConfig} />
    </div>
  );
};

export default InvoiceGrid;
