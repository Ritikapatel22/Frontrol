const COLUMN_NAMES = [
    'approved_cost_budget_series' ,
    'forecast_cost_budget_series' ,
    'approved_rev_budget_cst_series',

    // 'approved_revenue_budget_cost' ,
    'forecast_revenue_budget_series' ,
    'actual_cost_series' ,
    'actual_margin_series' ,
    'actual_gross_revenue' ,
    'billing_series' ,
    'actual_gross_revenue_series'
  ];
  
  const SERIES_INFO = {
    approved_cost_budget_series: {
      label: "Approved cost budget",
      color: "#00353E",
    },
    forecast_cost_budget_series: {
      label: "Forecast cost budget", //"Billed trend < 30 Days",
      color: "#91a948",
    },
    approved_rev_budget_cst_series: {
      label: "Approved revenue budget", //"Billed trend < 30 Days",
      color: "#8fa844",
    },
    forecast_revenue_budget_series: {
      label: "Forecast revenue budget",
      color: "#028081",
    },
    actual_cost_series: {
      label: "ITD actual cost",
      color: "#00353E",
    },
    actual_margin_series: {
      label: "ITD actual margin", //"Billed trend < 30 Days",
      color: "#59A089",
    },
    
    billing_series: {
      label: "Billing",
      color: "#D54993",
    },
    actual_gross_revenue_series: {
      label: "ITD actual gross revenue", 
      color: "#59A089",
    },
  };
  
  export { SERIES_INFO, COLUMN_NAMES };
  