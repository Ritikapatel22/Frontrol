import React, { useEffect, useState } from "react";
import { Grid } from "@frontrolinc/pace-ui-framework";
import config from "./config";
import { useFetchDataQuery } from "../../app/appApi";
import {
  getNumber,
  openInvoiceUrl
} from "../../TransposeData";
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux'
import { abcDevBaseUrl } from '../../config'

const InvoiceGrid = (props) => {
  const {id} = props;
  const [invoiceFilterdata, setinvoiceFilterdata] = useState([]);
  const { t } = useTranslation(['label', 'message']);

  const user_name = useSelector(
    (state) => state?.loginAuth?.userProfile?.user_name,
  )
  const hanldeClick = (e) => {
    if (e.colDef.field === 'ra_invoice_number'&& e.data?.ra_invoice_number) {
      openInvoiceUrl(abcDevBaseUrl, e.data.bill_to_customer_id, e.data.invoice_class, e.data.project_id, e.data.draft_invoice_num, e.data.ra_invoice_number, user_name)
    }
  }

  function split(str, index) {
    const result = [str.slice(0, index), str.slice(index)];
    return result;
  };

  const selectedProject = props.invoiceProps.selectedProject;
  let selectedARcol;
  let billedARlabel;

  if (selectedProject.column.userProvidedColDef.field.includes("unbilled_rec")){
    selectedARcol = selectedProject.column.userProvidedColDef.field.split("unbilled_rec_")[1];
    billedARlabel =  selectedProject.column.userProvidedColDef.headerNameKey;
  }else {
    selectedARcol = selectedProject.column.userProvidedColDef.field.split("ar_")[1];
    billedARlabel =  selectedProject.column.userProvidedColDef.headerNameKey;
  }

  let [arFirst, arSecond] = [0,0];
  if (selectedARcol == 'over_180'){
    arFirst = 180
  }else {
    [arFirst, arSecond] = split(selectedARcol.split()[0], 2);
  }
  const todayDate = new Date().toJSON().slice(0,10).replace(/-/g,'/');
  // let today = new Date().toISOString().slice(0, 10)

  const filteredData = (data) => {  
    let arFilteredData = [];
    data.filter(function (el)
    {  
      el = {...el, gross_functional_amount : getNumber(el.projfunc_bill_amount) + getNumber(el.accounted_tax_amt)};
      el = {...el, gross_amount : getNumber(el.inv_amount) + getNumber(el.tax_amount)};
      el = {...el, payment_received : getNumber(el.gross_amount) - getNumber(el.balance)}
      el = {...el, prof_func_payment_received : getNumber(el.gross_functional_amount) - getNumber(el.projfunc_balance)} 
      el = {...el, aging_buckets: billedARlabel}
      const agedDays = el.age_days;

      if (arFirst == 180){
        if (agedDays > 180){
          arFilteredData.push(el);
        }      
      }
      else if (getNumber(arSecond) == 30){
        if(getNumber(arFirst) <= agedDays && agedDays <= getNumber(arSecond) && el.balance > 0){
          arFilteredData.push(el);
        }
      }
      else if (getNumber(arFirst) <= agedDays && agedDays <= getNumber(arSecond)){
      // else if (parseInt(arSecond) == 30 && el.balance > 0 ?el.balance: true && (parseInt(arFirst) <= agedDays && agedDays <= parseInt(arSecond))){
        arFilteredData.push(el);
      }
    })
    return arFilteredData;
  };

  const invoiceGridConfig = {
    id,
    // uiConfig: config.projectInvoiceConfig,
    uiConfig: {
      ...config.projectInvoiceConfig,
      onCellClicked: hanldeClick,
      },
    style: props.style,
    showTotal: true,
    currencyColumnName: "projfunc_currency_code",
    totalOptions: {
      displayName: t("total"),
    },
    reduxConfig: {
      query: useFetchDataQuery,
      params: {
        queryName: "ProjectInvoice.getProjectInvoices",
        project_id: parseInt(selectedProject.data.project_id) 
      },
      resultSelector(response) {
        return {
          ...response,
          data: response.data ? filteredData(response.data.Data["ProjectInvoice.getProjectInvoices"]) : undefined,
        };
      },
    },
  };
  
  return (
    <div>
      <div className="invoiceHeading">
        <span className="capitalize">{t("Project number")}</span>: {selectedProject.data?.project_number}, <span className="capitalize">{t("Project name")}</span>:{" "}
        {selectedProject.data?.project_name},{t("Aging buckets")}:{" "}
        {selectedProject.column?.userProvidedColDef?.headerName}{" "}
      </div>
      <Grid {...invoiceGridConfig} />
    </div>
  );
};

export default InvoiceGrid;
