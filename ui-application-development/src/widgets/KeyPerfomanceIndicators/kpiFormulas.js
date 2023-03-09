export const formulaDefs = [
  //spent hours
  {
    field: "sh_current_month",
    formula:
      "at_comp_plan2_quantity == 0  ||   at_comp_plan2_quantity == null  ? 0 :((itd_labor_hrs_pp+ delta_labor_hrs) / at_comp_plan2_quantity)",
  },
  {
    field: "sh_last_month",
    formula: "at_comp_plan2_quantity_pp == 0  ||   at_comp_plan2_quantity_pp == null  ? 0 :(itd_labor_hrs_pp / at_comp_plan2_quantity_pp)",
  },
  {
    field: "sh_kpi_value",
    formula: "sh_current_month - sh_last_month",
  },
  //s_pent hours
  //spent cost
  {
    field: "sc_current_month",
    formula:
      "at_comp_plan2_cost == 0  ||   at_comp_plan2_cost == null  ? 0 :((itd_res_1_pp + delta_res_1 + itd_res_2_pp + delta_res_2 + itd_res_3_pp + delta_res_3 + itd_res_4_pp + delta_res_4 + itd_res_5_pp + delta_res_5) / at_comp_plan2_cost)",
  },
  {
    field: "sc_last_month",
    formula:
      "at_comp_plan2_cost_pp == 0  ||   at_comp_plan2_cost_pp == null  ? 0 :((itd_res_1_pp + itd_res_2_pp +  itd_res_3_pp + itd_res_4_pp  + itd_res_5_pp) / at_comp_plan2_cost_pp) ",
  },
  {
    field: "sc_kpi_value",
    formula: "sc_current_month - sc_last_month",
  },

  //spent cost

  //physical_complete
  {
    field: "pc_current_month",
    formula: "ev == 0  ||  ev == null  || at_comp_plan1_cost == 0  | at_comp_plan1_cost == null ? 0 :(ev / at_comp_plan1_cost)",
  },

  {
    field: "pc_last_month",
    formula: "ev_pp == 0  ||  ev_pp == null  || at_comp_plan1_cost_pp == 0  | at_comp_plan1_cost_pp == null ? 0 :(ev_pp / at_comp_plan1_cost_pp)",
  },
  {
    field: "pc_kpi_value",
    formula: "pc_current_month - pc_last_month",
  },
  //physical_complete

  //earned value
  {
    field: "ev_current_month",
    formula: "ev",
  },
  {
    field: "ev_last_month",
    formula: "ev_pp",
  },
  //earned value

  //cost variance
  {
    field: "cv_current_month",
    formula:
      "pc_current_month == 0  ||   pc_current_month == 'null'  ? 0 : ((ev) - (itd_res_1_pp + delta_res_1 + itd_res_2_pp + delta_res_2 + itd_res_3_pp + delta_res_3 + itd_res_4_pp + delta_res_4 + itd_res_5_pp + delta_res_5))",
  },
  {
    field: "cv_current_month_variance",
    formula: "cv_current_month / ev",
  },
  {
    field: "cv_last_month",
    formula:
      "pc_current_month == 0  ||   pc_current_month == 'null'  ? 0 : (ev_pp - (itd_res_1_pp + itd_res_2_pp +  itd_res_3_pp +  itd_res_4_pp + itd_res_5_pp))",
  },
  {
    field: "cv_last_month_variance",
    formula: "cv_last_month / ev_pp",
  },
  {
    field: "cv_kpi_value",
    formula: "pc_current_month == 0  ||   pc_current_month == 'null'  ? '-' : cv_current_month_variance - cv_last_month_variance",
  },
  //cost variance

  //sheduled variance
  {
    field: "sv_current_month",
    formula: "pc_current_month == 0  ||   pc_current_month == 'null'  ? 0: ev - itd_plan1_cost",
  },
  {
    field: "sv_last_month",
    formula: "pc_last_month == 0  ||   pc_last_month == 'null'  ? 0 : ev_pp - itd_plan1_cost_pp",
  },
  {
    field: "sv_variance_current",
    formula: "sv_current_month / itd_plan1_cost",
  },
  {
    field: "sv_variance_last",
    formula: "sv_last_month / itd_plan1_cost_pp",
  },
  {
    field: "sv_kpi_value",
    formula: "pc_current_month == 0  ||   pc_current_month == 'null'  ? '-' : sv_variance_current-sv_variance_last ",
  },
  //sheduled variance
  //cpi
  {
    field: "cpi_current_month",
    formula:
      "pc_current_month == 0  ||   pc_current_month == 'null'  ? 0 : ev / (itd_res_1_pp + delta_res_1 + itd_res_2_pp + delta_res_2 +  itd_res_3_pp + delta_res_3 + itd_res_4_pp + delta_res_4 +itd_res_5_pp + delta_res_5)",
  },
  {
    field: "cpi_last_month",
    formula:
      "pc_last_month == 0  ||   pc_last_month == 'null'  ? 0 : ev_pp / (itd_res_1_pp + itd_res_2_pp +  itd_res_3_pp +  itd_res_4_pp +  itd_res_5_pp)",
  },
  {
    field: "cpi_kpi_value",
    formula:
      "pc_current_month == 0  ||   pc_current_month == 'null'  ? '-' : ev / (itd_res_1_pp + delta_res_1 + itd_res_2_pp + delta_res_2 +  itd_res_3_pp + delta_res_3 + itd_res_4_pp + delta_res_4 +itd_res_5_pp + delta_res_5)",
  },
  //cpi

  //spi
  {
    field: "spi_current_month",
    formula: "pc_current_month == 0  ||   pc_current_month == 'null'  ? 0 : (ev / itd_plan1_cost)",
  },
  {
    field: "spi_last_month",
    formula: "pc_last_month == 0  ||   pc_last_month == 'null'  ?  0 :(ev_pp / itd_plan1_cost_pp)",
  },
  {
    field: "spi_kpi_value",
    formula: "pc_current_month == 0  ||   pc_current_month == 'null'  ? '-' : (ev / itd_plan1_cost)",
  },
  //spi
  {
    field: "ua_current_month",
    formula:
      "(itd_labor_rev_pp + itd_non_labor_rev_pp + itd_event_rev_pp +delta_labor_rev + delta_non_labor_rev + delta_event_rev) - (itd_billed_pp + delta_billed)",
  },
  {
    field: "ua_last_month",
    formula: "(itd_labor_rev_pp + itd_non_labor_rev_pp + itd_event_rev_pp  ) - (itd_billed_pp)",
  },

  {
    field: "ut_current_month",
    formula: "unbilled_transactions",
  },
  {
    field: "ut_last_month",
    formula: "unbilled_transactions_pp",
  },
  {
    field: "ar_current_month",
    formula: "ar_0030 + ar_3160 + ar_6190 + ar_91180 + ar_over_180",
  },
  {
    field: "ar_last_month",
    formula: "billed_ar_pp",
  },
  //financial
  {
    field: "gm_gr_current_month",
    formula:
      "(((itd_labor_rev_pp+delta_labor_rev+itd_non_labor_rev_pp+delta_non_labor_rev+itd_event_rev_pp+delta_event_rev) - (itd_res_1_pp+delta_res_1+itd_res_2_pp+delta_res_2+itd_res_5_pp+delta_res_5+itd_res_4_pp+delta_res_4))/(itd_labor_rev_pp+delta_labor_rev+itd_non_labor_rev_pp+delta_non_labor_rev+itd_event_rev_pp+delta_event_rev))",
  },

  {
    field: "gm_gr_last_month",
    formula:
      "(((itd_labor_rev_pp+itd_non_labor_rev_pp+itd_event_rev_pp) - (itd_res_1_pp+itd_res_2_pp+itd_res_5_pp+itd_res_4_pp))/(itd_labor_rev_pp+itd_non_labor_rev_pp+itd_event_rev_pp))",
  },
  {
    field: "gm_gr_approved_budget",
    formula:
      "((at_comp_plan1_revenue - (at_comp_plan1_res1_cost+at_comp_plan1_res2_cost+at_comp_plan1_res4_cost+at_comp_plan1_res5_cost+at_comp_plan1_res6_cost))/at_comp_plan1_revenue) ",
  },
  {
    field: "gm_gr_eac_forecast_forecast",
    formula:
      "((at_comp_plan2_revenue - (at_comp_plan2_res1_cost+at_comp_plan2_res2_cost+at_comp_plan2_res4_cost+at_comp_plan2_res5_cost+at_comp_plan2_res6_cost))/at_comp_plan2_revenue) ",
  },
  {
    field: "gm_gr_kpi_value",
    formula:
      "gm_gr_current_month - gm_gr_approved_budget",
  },

  //gm nsr
  {
    field: "gm_nsr_current_month",
    formula:
      "(((itd_labor_rev_pp+itd_non_labor_rev_pp+itd_event_rev_pp+delta_labor_rev+delta_non_labor_rev +delta_event_rev)-(itd_res_1_pp+delta_res_1+itd_res_2_pp+delta_res_2+itd_res_5_pp+delta_res_5+itd_res_4_pp+delta_res_4))/((itd_labor_rev_pp+itd_non_labor_rev_pp+itd_event_rev_pp+delta_labor_rev+delta_non_labor_rev +delta_event_rev)-(itd_res_5_pp+delta_res_5+itd_res_4_pp+delta_res_4+itd_res_6_pp+delta_res_6)))",
  },
  {
    field: "gm_nsr_last_month",
    formula:
      "(((itd_labor_rev_pp+itd_non_labor_rev_pp+itd_event_rev_pp)-(itd_res_1_pp+itd_res_2_pp+itd_res_5_pp+itd_res_4_pp))/((itd_labor_rev_pp+itd_non_labor_rev_pp+itd_event_rev_pp)-(itd_res_5_pp+itd_res_4_pp)))",
  },
  {
    field: "gm_nsr_approved_budget",
    formula:
      "((at_comp_plan1_revenue - (at_comp_plan1_res1_cost+at_comp_plan1_res2_cost+at_comp_plan1_res4_cost+at_comp_plan1_res5_cost+at_comp_plan1_res6_cost))/(at_comp_plan1_revenue-(at_comp_plan1_res4_cost+at_comp_plan1_res5_cost+at_comp_plan1_res6_cost)))",
  },
  {
    field: "gm_nsr_eac_forecast_forecast",
    formula:
      "((at_comp_plan2_revenue - (at_comp_plan2_res1_cost+at_comp_plan2_res2_cost+at_comp_plan2_res4_cost+at_comp_plan2_res5_cost+at_comp_plan2_res6_cost))/(at_comp_plan2_revenue-(at_comp_plan2_res4_cost+at_comp_plan2_res5_cost+at_comp_plan2_res6_cost)))",
  },
  {
    field: "gm_nsr_kpi_value",
    formula:
      "gm_nsr_current_month - gm_nsr_approved_budget",
  },

  //nm gr

  {
    field: "nm_gr_current_month",
    formula:
      "(((itd_labor_rev_pp+itd_non_labor_rev_pp+itd_event_rev_pp+delta_labor_rev+delta_non_labor_rev +delta_event_rev)-(itd_res_1_pp+delta_res_1+itd_res_2_pp+delta_res_2+itd_res_3_pp+delta_res_3+itd_res_5_pp+delta_res_5+itd_res_4_pp+delta_res_4))/(itd_labor_rev_pp+itd_non_labor_rev_pp+itd_event_rev_pp+delta_labor_rev+delta_non_labor_rev +delta_event_rev))",
  },

  {
    field: "nm_gr_last_month",
    formula:
      "(((itd_labor_rev_pp+itd_non_labor_rev_pp+itd_event_rev_pp)-(itd_res_1_pp+itd_res_2_pp+itd_res_3_pp+itd_res_5_pp+itd_res_4_pp))/(itd_labor_rev_pp+itd_non_labor_rev_pp+itd_event_rev_pp))",
  },
  {
    field: "nm_gr_approved_budget",
    formula:
      "((at_comp_plan1_revenue - (at_comp_plan1_res1_cost+at_comp_plan1_res2_cost+at_comp_plan1_res3_cost+at_comp_plan1_res4_cost+at_comp_plan1_res5_cost+at_comp_plan1_res6_cost))/at_comp_plan1_revenue)",
  },
  {
    field: "nm_gr_eac_forecast_forecast",
    formula:
      "((at_comp_plan2_revenue - (at_comp_plan2_res1_cost+at_comp_plan2_res2_cost+at_comp_plan2_res3_cost+at_comp_plan2_res4_cost+at_comp_plan2_res5_cost+at_comp_plan2_res6_cost))/at_comp_plan2_revenue)",
    },
    {
      field: "nm_gr_kpi_value",
      formula:
        "nm_gr_current_month - nm_gr_approved_budget",
    },

  //nm nsr
  {
    field: "nm_nsr_current_month",
    formula:
      "(((itd_labor_rev_pp+itd_non_labor_rev_pp+itd_event_rev_pp+delta_labor_rev+delta_non_labor_rev +delta_event_rev)-(itd_res_1_pp+delta_res_1+itd_res_2_pp+delta_res_2+itd_res_3_pp+delta_res_3+itd_res_5_pp+delta_res_5+itd_res_4_pp+delta_res_4))/((itd_labor_rev_pp+itd_non_labor_rev_pp+itd_event_rev_pp+delta_labor_rev+delta_non_labor_rev +delta_event_rev)-(itd_res_5_pp+delta_res_5+itd_res_4_pp+delta_res_4)))",
  },
  {
    field: "nm_nsr_last_month",
    formula:
      "(((itd_labor_rev_pp+itd_non_labor_rev_pp+itd_event_rev_pp)-(itd_res_1_pp+itd_res_2_pp+itd_res_3_pp+itd_res_5_pp+itd_res_4_pp))/((itd_labor_rev_pp+itd_non_labor_rev_pp+itd_event_rev_pp)-(itd_res_5_pp+delta_res_5+itd_res_4_pp)))",
  },
  {
    field: "nm_nsr_approved_budget",
    formula:
      "((at_comp_plan1_revenue - (at_comp_plan1_res1_cost+at_comp_plan1_res2_cost++at_comp_plan1_res3_cost+at_comp_plan1_res4_cost+at_comp_plan1_res5_cost+at_comp_plan1_res6_cost))/(at_comp_plan1_revenue-(at_comp_plan1_res4_cost+at_comp_plan1_res5_cost+at_comp_plan1_res6_cost)))",
  },
  {
    field: "nm_nsr_eac_forecast_forecast",
    formula:
      "((at_comp_plan2_revenue - (at_comp_plan2_res1_cost+at_comp_plan2_res2_cost+at_comp_plan2_res3_cost+at_comp_plan2_res4_cost+at_comp_plan2_res5_cost+at_comp_plan2_res6_cost))/(at_comp_plan2_revenue-(at_comp_plan2_res4_cost+at_comp_plan2_res5_cost+at_comp_plan2_res6_cost)))",
  },
  {
    field: "nm_nsr_kpi_value",
    formula:
      "nm_nsr_current_month - nm_nsr_approved_budget",
  },
  //scm
  {
    field: "scm_current_month",
    formula:
      "((itd_labor_rev_pp+itd_non_labor_rev_pp+itd_event_rev_pp+delta_labor_rev+delta_non_labor_rev +delta_event_rev)-(itd_res_5_pp+delta_res_5+itd_res_4_pp+delta_res_4))/(itd_res_1_pp + delta_res_1 + itd_res_2_pp + delta_res_2)",
  },
  {
    field: "scm_last_month",
    formula:
      "((itd_labor_rev_pp+itd_non_labor_rev_pp+itd_event_rev_pp)-(itd_res_5_pp+itd_res_4_pp))/(itd_res_1_pp+ itd_res_2_pp)",
  },
  {
    field: "scm_approved_budget",
    formula:
      "(at_comp_plan1_revenue-(at_comp_plan1_res4_cost+at_comp_plan1_res5_cost+at_comp_plan1_res6_cost))/(at_comp_plan1_res1_cost+at_comp_plan1_res2_cost)",
  },
  {
    field: "scm_eac_forecast_forecast",
    formula:
      "(at_comp_plan2_revenue-(at_comp_plan2_res4_cost+at_comp_plan2_res5_cost+at_comp_plan2_res6_cost))/(at_comp_plan2_res1_cost+at_comp_plan2_res2_cost)"
  },
  {
    field: "scm_kpi_value",
    formula:
      "scm_current_month - scm_approved_budget",
  },

  //dlm

  {
    field: "dlm_current_month",
    formula:
      "((itd_labor_rev_pp+itd_non_labor_rev_pp+itd_event_rev_pp+delta_labor_rev+delta_non_labor_rev +delta_event_rev)-(itd_res_5_pp+delta_res_5+itd_res_4_pp+delta_res_4))/(itd_res_1_pp+delta_res_1)",
  },
  {
    field: "dlm_last_month",
    formula:
      "((itd_labor_rev_pp+itd_non_labor_rev_pp+itd_event_rev_pp)-(itd_res_5_pp+itd_res_4_pp))/(itd_res_1_pp)",
  },
  {
    field: "dlm_approved_budget",
    formula:
      "(at_comp_plan1_revenue-(at_comp_plan1_res4_cost+at_comp_plan1_res5_cost+at_comp_plan1_res6_cost))/(at_comp_plan1_res1_cost)"
  },
  {
    field: "dlm_eac_forecast_forecast",
    formula:
      "(at_comp_plan2_revenue-(at_comp_plan2_res4_cost+at_comp_plan2_res5_cost+at_comp_plan2_res6_cost))/(at_comp_plan2_res1_cost)"
  },
  {
    field: "dlm_kpi_value",
    formula:
      "dlm_current_month - dlm_approved_budget",
  },

  //finacial

  //data quality
  {
    field: "lead_verifier_kpi_value",
    formula: "no_of_lead_verifiers > 0 ? no_of_lead_verifiers: -1",
  },
  {
    field: "lead_verifier_current_month",
    formula: "no_of_lead_verifiers > 0 ? no_of_lead_verifiers: 0",
  },

  {
    field: "negative_etc_itd_cost",
    formula:
      "itd_res_1_pp + delta_res_1 + itd_res_2_pp + delta_res_2+ itd_res_3_pp + delta_res_3 + itd_res_4_pp + delta_res_4+ itd_res_5_pp + delta_res_5"
  },
  {
    field: "negative_etc_current_month", 
    formula: "negative_etc_itd_cost  <= at_comp_plan2_cost ? 0 : at_comp_plan2_cost - negative_etc_itd_cost",
  },
  {
    field: "end_data_current_month",
    formula: "forecast_end_date",
  },

  //data quality

  //projects flags

  {
    field: "gm_nsr_mtd_current_month",
    formula:
    "((delta_labor_rev+delta_non_labor_rev+delta_event_rev)-(delta_res_1+delta_res_2+delta_res_5+delta_res_4)) == 0 || ((delta_labor_rev+delta_non_labor_rev+delta_event_rev)-(delta_res_5+delta_res_4)) == 0? 0 : (((delta_labor_rev+delta_non_labor_rev+delta_event_rev)-(delta_res_1+delta_res_2+delta_res_5+delta_res_4)) / ((delta_labor_rev+delta_non_labor_rev+delta_event_rev)-(delta_res_5+delta_res_4)))"
  },
  {
    field: "gm_nsr_mtd_last_month",
    formula:
    "((delta_labor_rev_pp+delta_non_labor_rev_pp+delta_event_rev_pp)-(delta_res1_pp+delta_res2_pp+delta_res5_pp+delta_res4_pp)) == 0 || ((delta_labor_rev_pp+delta_non_labor_rev_pp+delta_event_rev_pp)-(delta_res5_pp+delta_res4_pp)) == 0? 0 : (((delta_labor_rev_pp+delta_non_labor_rev_pp+delta_event_rev_pp)-(delta_res1_pp+delta_res2_pp+delta_res5_pp+delta_res4_pp)) / ((delta_labor_rev_pp+delta_non_labor_rev_pp+delta_event_rev_pp)-(delta_res5_pp+delta_res4_pp)))"
  },
  {
    field: "gm_nsr_mtd_kpi_value",
    formula:
    "gm_nsr_mtd_current_month - gm_nsr_mtd_last_month < 0 ? (gm_nsr_mtd_current_month - gm_nsr_mtd_last_month) * -1 : gm_nsr_mtd_current_month - gm_nsr_mtd_last_month"
  },
  {
    field: "unbilled_ar_value_current_month",
    formula:
      "(itd_labor_rev_pp + itd_non_labor_rev_pp + itd_event_rev_pp +  delta_labor_rev + delta_non_labor_rev + delta_event_rev) - (itd_billed_pp + delta_billed)",
  },
  {
    field: "unbilled_ar_value_last_month",
    formula:
      "(itd_labor_rev_pp + itd_non_labor_rev_pp + itd_event_rev_pp  ) - (itd_billed_pp)",
  },
  {
    field: "unbilled_ar_kpi_value",
    formula:
      "unbilled_ar_value_current_month - unbilled_ar_value_last_month",
  },
  {
    field: "unbilled_ar_kpi_val",
    formula:
      "unbilled_ar_value_current_month - unbilled_ar_value_last_month < '10000' ? 'green' : 'yellow'",
  },
  {
    field: "margin_gain_lost_itd_current_month",
    formula:
    "((((itd_labor_rev_pp+itd_non_labor_rev_pp+itd_event_rev_pp+delta_labor_rev+delta_non_labor_rev+delta_event_rev)-(itd_res_1_pp+delta_res_1+itd_res_2_pp+delta_res_2+itd_res_3_pp+delta_res_3+itd_res_5_pp+delta_res_5+itd_res_4_pp+delta_res_4))/(itd_labor_rev_pp+itd_non_labor_rev_pp+itd_event_rev_pp+delta_labor_rev+delta_non_labor_rev+delta_event_rev))-((at_comp_plan1_revenue)-(at_comp_plan1_res5_cost + at_comp_plan1_res4_cost+at_comp_plan1_res6_cost + at_comp_plan1_res1_cost  + at_comp_plan1_res2_cost +at_comp_plan1_res3_cost))/(at_comp_plan1_revenue))*(itd_labor_rev_pp+itd_non_labor_rev_pp+itd_event_rev_pp+delta_labor_rev+delta_non_labor_rev+delta_event_rev)"
  },
  {
    field: "margin_gain_lost_itd_last_month",
    formula:
    "((((itd_labor_rev_pp+itd_non_labor_rev_pp+itd_event_rev_pp)-(itd_res_1_pp+itd_res_2_pp+itd_res_3_pp+itd_res_5_pp+itd_res_4_pp))/(itd_labor_rev_pp+itd_non_labor_rev_pp+itd_event_rev_pp))-((at_comp_plan1_rev_pp)-(at_comp_plan1_res5_cost_pp + at_comp_plan1_res4_cost_pp+at_comp_plan1_res6_cost_pp + at_comp_plan1_res1_cost_pp  + at_comp_plan1_res2_cost_pp +at_comp_plan1_res3_cost_pp))/(at_comp_plan1_rev_pp))*(itd_labor_rev_pp+itd_non_labor_rev_pp+itd_event_rev_pp)"
  },
  {
    field: "margin_gain_lost_itd_kpi_val",
    formula:"(margin_gain_lost_itd_current_month - margin_gain_lost_itd_last_month) < -10000 ? 'green' : 'yellow'"  //AW-722 fix
  },
  {
    field: "margin_gain_lost_itd_kpi_val1",
    formula:"(margin_gain_lost_itd_current_month - margin_gain_lost_itd_last_month) "  //AW-722 fix
  },
// ____KPI for current
  // {
  //   field: 'total_costs_itd',
  //   formula:
  //     'itd_res_1_pp+delta_res_1+itd_res_2_pp+delta_res_2+itd_res_3_pp+delta_res_3+subs_itd+odc_itd',
  // },
  // {
  //   field: 'gr_approved',
  //   formula: 'at_comp_plan1_revenue',
  // },
  // {
  //   field: 'subs_approved',
  //   formula: 'at_comp_plan1_res5_cost ',
  // },
  // {
  //   field: 'odc_approved',
  //   formula: 'at_comp_plan1_res4_cost ',
  // },
  // {
  //   field: 'cb_approved',
  //   formula: 'at_comp_plan1_res6_cost',
  // },
  // {
  //   field: 'fbl_approved',
  //   formula:
  //     'at_comp_plan1_res1_cost  + at_comp_plan1_res2_cost +at_comp_plan1_res3_cost ',
  // },
  // {
  //   field: 'total_costs_approved',
  //   formula: 'subs_approved + odc_approved+cb_approved + fbl_approved',
  // },
  // {
  //   field: 'nm_approved',
  //   formula: 'gr_approved - total_costs_approved',
  // },
  // {
  //   field: 'gr_itd',
  //   formula:
  //     'itd_labor_rev_pp+itd_non_labor_rev_pp+itd_event_rev_pp+delta_labor_rev+delta_non_labor_rev +delta_event_rev',
  // },
  // {
  //   field: 'nm_itd',
  //   formula: 'gr_itd-total_costs_itd',
  // },
  // {
  //   field: 'gain_lost_margin_itd_current_month',
  //   formula: '((nm_itd /gr_itd  ) -(nm_approved/gr_approved))*gr_itd',
  // },
//______KPI for Last Month
  // {
  //   field: "gr_itd_pp",
  //   formula:"itd_labor_rev_pp+itd_non_labor_rev_pp+itd_event_rev_pp"
  // },
  // {
  //   field: "gr_approved_pp",
  //   formula:"at_comp_plan1_revenue"
  // },
  // {
  //   field: "nm_approved_pp",
  //   formula:"(at_comp_plan1_revenue)-(at_comp_plan1_res5_cost + at_comp_plan1_res4_cost+at_comp_plan1_res6_cost + at_comp_plan1_res1_cost  + at_comp_plan1_res2_cost +at_comp_plan1_res3_cost)"
  // },
  // {
  //   field: "nm_itd_pp",
  //   formula:"((itd_labor_rev_pp+itd_non_labor_rev_pp+itd_event_rev_pp)-(itd_res_1_pp+itd_res_2_pp+itd_res_3_pp+itd_res_5_pp+itd_res_4_pp))"
  // },
  // {
  //   field: 'gain_lost_margin_itd_last_month',
  //   formula: '((nm_itd_pp /gr_itd_pp  ) - (nm_approved_pp/gr_approved_pp))*gr_itd_pp',
  // },
  // //KPI indicator formula
  // {
  //   field: "margin_gain_lost_itd_kpi_val",
  //   formula:"(gain_lost_margin_itd_current_month - gain_lost_margin_itd_last_month) < -10000 ? 'green' : 'yellow'"  //AW-722 fix
  // },

//______
  {
    field: "negative_gm_mtd_delta_labor_rev",
    formula:
      "((delta_labor_rev+delta_non_labor_rev+delta_event_rev)-(delta_res_1+delta_res_2+delta_res_4+delta_res_5)) == 0?0:((delta_labor_rev+delta_non_labor_rev+delta_event_rev)-(delta_res_5+delta_res_4))==0?99999:(((delta_labor_rev+delta_non_labor_rev+delta_event_rev)-(delta_res_1+delta_res_2+delta_res_4+delta_res_5)) / ((delta_labor_rev+delta_non_labor_rev+delta_event_rev)-(delta_res_5+delta_res_4)))",
  },
  {
    field: "negative_gm_mtd_delta_labor_rev_pp",
    formula:
      "((delta_labor_rev_pp+delta_non_labor_rev_pp+delta_event_rev_pp)-(delta_res1_pp+delta_res2_pp+delta_res4_pp+delta_res5_pp)) == 0?0:((delta_labor_rev_pp+delta_non_labor_rev_pp+delta_event_rev_pp)-(delta_res5_pp+delta_res4_pp))==0?99999:(((delta_labor_rev_pp+delta_non_labor_rev_pp+delta_event_rev_pp)-(delta_res1_pp+delta_res2_pp+delta_res4_pp+delta_res5_pp)) / ((delta_labor_rev_pp+delta_non_labor_rev_pp+delta_event_rev_pp)-(delta_res5_pp+delta_res4_pp)))",
  },

  // {
  //   field: "negative_gm_mtd_kpi_value",
  //   formula:
  //     "(((delta_labor_rev+delta_non_labor_rev+delta_event_rev)-(delta_res_1+delta_res_2+delta_res_4+delta_res_5)) / ((delta_labor_rev+delta_non_labor_rev+delta_event_rev)-(delta_res_5+delta_res_4))) - (((delta_labor_rev_pp+delta_non_labor_rev_pp+delta_event_rev_pp)-(delta_res1_pp+delta_res2_pp+delta_res4_pp+delta_res5_pp)) / ((delta_labor_rev_pp+delta_non_labor_rev_pp+delta_event_rev_pp)-(delta_res5_pp+delta_res4_pp)))",
  // },

  {
    field: "negative_gm_mtd_current_month",
    formula:
      "(((delta_labor_rev+delta_non_labor_rev+delta_event_rev)-(delta_res_1+delta_res_2+delta_res_4+delta_res_5)) / ((delta_labor_rev+delta_non_labor_rev+delta_event_rev)-(delta_res_5+delta_res_4))) < 0?(((delta_labor_rev+delta_non_labor_rev+delta_event_rev)-(delta_res_1+delta_res_2+delta_res_4+delta_res_5)) / ((delta_labor_rev+delta_non_labor_rev+delta_event_rev)-(delta_res_5+delta_res_4))): 'n/a'"
  },
  {
    field: "negative_gm_mtd_last_month",
    formula:
      "(((delta_labor_rev_pp+delta_non_labor_rev_pp+delta_event_rev_pp)-(delta_res1_pp+delta_res2_pp+delta_res4_pp+delta_res5_pp)) / ((delta_labor_rev_pp+delta_non_labor_rev_pp+delta_event_rev_pp)-(delta_res5_pp+delta_res4_pp))) < 0?(((delta_labor_rev_pp+delta_non_labor_rev_pp+delta_event_rev_pp)-(delta_res1_pp+delta_res2_pp+delta_res4_pp+delta_res5_pp)) / ((delta_labor_rev_pp+delta_non_labor_rev_pp+delta_event_rev_pp)-(delta_res5_pp+delta_res4_pp))): 'n/a'"
  },
  {
    field: "negative_gm_mtd_kpi_value",
    formula:
      "(negative_gm_mtd_current_month == 'n/a' ? 0 : negative_gm_mtd_current_month) - (negative_gm_mtd_last_month == 'n/a'? 0 : negative_gm_mtd_last_month)",
  },
  {
    field: "arb_btd_kpi_value",
    formula: "((at_comp_plan1_revenue) - (itd_billed_pp + delta_billed)) - (at_comp_plan1_revenue - itd_billed_pp)"
  },
  {
    field: "arb_btd_current_month",
    formula: "(at_comp_plan1_revenue < (itd_billed_pp + delta_billed))? ((at_comp_plan1_revenue) - (itd_billed_pp + delta_billed)):'n/a'",
  },
  {
    field: "arb_btd_last_month",
    formula:"(at_comp_plan1_revenue < itd_billed_pp) ? (at_comp_plan1_revenue - itd_billed_pp) :'n/a'",
  },  
  {
    field: "arb_frb_kpi_value",
    formula:"(at_comp_plan1_revenue == at_comp_plan2_revenue)? 'green' : 'yellow'"

  },
  {
    field: "arb_frb_current_month",
    formula:"(at_comp_plan1_revenue == at_comp_plan2_revenue)? 'n/a' :(at_comp_plan1_revenue - at_comp_plan2_revenue)"
  },

  {
    field: "arb_frb_last_month",
    formula: "(at_comp_plan1_rev_pp == at_comp_plan2_rev_pp) ? 'n/a' : (at_comp_plan1_rev_pp - at_comp_plan2_rev_pp)"
  },
  {
    field: "fcb_acb_kpi_value",
    formula:"(at_comp_plan1_cost - at_comp_plan2_cost)-(at_comp_plan1_cost_pp - at_comp_plan2_cost_pp)"
  },
  {
    field: "fcb_acb_current_month",
    formula: "(at_comp_plan2_cost > at_comp_plan1_cost)?(at_comp_plan1_cost - at_comp_plan2_cost):'n/a'"
  },
  {
    field: "fcb_acb_last_month",
    formula: " (at_comp_plan2_cost_pp > at_comp_plan1_cost_pp) ?(at_comp_plan1_cost_pp - at_comp_plan2_cost_pp) : 'n/a'"
  },
];
