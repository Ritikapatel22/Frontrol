import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reports: [
    {
        report_id: 1,
        report_name: "Task summary",
        category: "task_summary",
        default: "N",
        global: "Y",
        description: "View financial metrics at different task levels of the WBS. Functionality to drill down to supplier and employee level information.",
        helpUrl: "Task_Summary.pdf"
        
    },
    {
      report_id: 2,
      report_name: "Cost transaction detail",
      category: "cost_transaction_detail",
      default: "N",
      global: "Y",
      description: "View detailed labor, ODC, and sub/vendor cost transaction data. Parameters allow you to drill down by task, employee, supplier, organization, resource category, and/or period type. Further customize by using the Columns and Filters functionality.",
      helpUrl: "Cost_transaction_detail.pdf"
    },
    {
      report_id: 3,
      report_name: "Revenue transaction detail",
      category: "revenue_transaction_detail",
      default: "N",
      global: "Y",
      description: "View detailed labor, ODC, and sub/vendor revenue transaction data. Parameters allow you to drill down by task, employee, supplier, organization, resource category, and/or period type. Further customize by using the Columns and Filters functionality.",
      helpUrl: "Revenue_transaction_detail.pdf"
    },
    {
      report_id: 4,
      report_name: "Resources by hours by week",
      category: "resources_by_hours_by_week",
      default: "N",
      global: "Y",
      description: "A rolling 52-week report presents hours by week per resource per task, as well as their totals (ITD). Forecast and approved hours and costs also available at task level. Customize by using the Columns functionality.",
      helpUrl: "Resources_by_hours_by_week.pdf"
    },
  ],
  selectedReport: null,
  selectedFilters: null,
  refreshTime: null,
};

const reportslice = createSlice({
  name: "report",
  initialState,
  reducers: {
    setReport: (state, action) => {
      state.selectedReport = action.payload;
    },
    setSelectedfilters: (state, action) => {
      state.selectedFilters = action.payload;
    },
    setRefreshTime: (state, action) => {
      state.refreshTime = action.payload;
    },
  },
})
export const {
  setReport,
  setSelectedfilters,
  setRefreshTime,
} = reportslice.actions;
const { reducer } = reportslice;
export default reducer;
