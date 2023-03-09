const COLUMN_NAMES_TREND = [
    'approved_cost_budget_series' ,
    'forecast_cost_budget_series' ,
    'mtd_cost_plan_series',
    'itd_cost_plan_series',
    'approved_rev_budget_cst_series', 
    'forecast_revenue_budget_series',
    'mtd_actual_cost_series',  
    'actual_cost_series', // itd_actual_cost_series 
    'mtd_actual_margin_series', 
    'actual_margin_series', // itd_actual_margin_series 
    'mtd_actual_gross_rev_series', 
    'actual_gross_revenue_series', //itd_actual_gross_revenue_series 
    'mtd_billing_series',
    'itd_billing_series',
    'unbilled_series'
  ];
  
  const TREND_VALUES = {
    approved_cost_budget_series: {
      label: "Approved cost budget",
      color: "#00353E",
    },
    forecast_cost_budget_series: {
      label: "Forecast cost budget", 
      color: "#91a948",
    },
    mtd_cost_plan_series: {
      label: "MTD cost plan", 
      color: "#d2aa00",
    },
    itd_cost_plan_series: {
      label: "ITD cost plan", 
      color: "#59A089",
    },
    approved_rev_budget_cst_series: {
      label: "Approved revenue budget", 
      color: "#8fa844",
    },
    forecast_revenue_budget_series: {
      label: "Forecast revenue budget", 
      color: "#028081",
    },
    mtd_actual_cost_series: {
      label: "MTD actual cost", 
      color: "#00353E",
    },
    actual_cost_series: {
      label: "ITD actual cost", 
      color: "#002c33",
    },
    mtd_actual_margin_series: {
      label: "MTD actual margin", 
      color: "#59A089",
    },
    actual_margin_series: {
      label: "ITD actual margin", 
      color: "#59A089",
    },
    mtd_actual_gross_rev_series: {
      label: "MTD actual gross revenue", 
      color: "#59A089",
    },
    actual_gross_revenue_series: {
      label: "ITD actual gross revenue", 
      color: "#59A089",
    },
    mtd_billing_series: {
      label: "MTD billing",
      color: "#D54993",
    },
    itd_billing_series: {
      label: "ITD billing", 
      color: "#D54993",
    },
    unbilled_series: {
      label: "Unbilled", 
      color: "#59A089",
    },
  };
  
export { TREND_VALUES, COLUMN_NAMES_TREND };
