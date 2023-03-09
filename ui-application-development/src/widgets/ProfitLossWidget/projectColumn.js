export const formulaDefs = [
  //profit & Loss formula's
  //gross_revenue
  {
    field: "gr_prior_period_mtd",
    formula: "delta_labor_rev_pp + delta_event_rev_pp + delta_non_labor_rev_pp",
  },
  // {
  //   //mtd
  //   field: "gr_mtd",
  //   formula: "delta_labor_rev+delta_non_labor_rev+delta_event_rev",
  // },
  {
    field: "gr_original",
    formula: "at_comp_plan3_revenue",
  },
  // {
  //   field: "gr_itd",
  //   formula:
  //     "itd_labor_rev_pp+itd_non_labor_rev_pp+itd_event_rev_pp+delta_labor_rev+delta_non_labor_rev+delta_event_rev",
  // },
  // {
  //   field: "gr_ytd",
  //   formula:
  //     "ytd_delta_labor_rev + ytd_delta_non_labor_rev + ytd_delta_event_rev",
  // },

  // {
  //   field: "gr_approved",
  //   formula: "at_comp_plan1_revenue",
  // },
  {
    field: "gr_forecast",
    formula: "at_comp_plan2_revenue",
  },
  {
    field: "gr_prior_period_forecast",
    formula: "at_comp_plan2_rev_pp",
  },
  {
    field: "gr_etc",
    formula: "gr_forecast - gr_itd",
  },
  {
    field: "gr_complete",
    formula: "(gr_itd / gr_forecast)",
  },
  // gross_cost

  // subs_cost
  {
    field: "subs_prior_period_mtd",
    formula: "delta_res5_pp",
  },
  {
    field: "subs_original",
    formula: "at_comp_plan3_res5_cost",
  },
  // {
  //   field: "subs_approved",
  //   formula: "at_comp_plan1_res5_cost ",
  // },
  {
    field: "subs_forecast",
    formula: "at_comp_plan2_res5_cost ",
  },
  {
    field: "subs_prior_period_forecast",
    formula: "at_comp_plan2_res5_cost_pp ",
  },
  {
    field: "subs_etc",
    formula: "subs_forecast - subs_itd",
  },
  {
    field: "subs_complete",
    formula: "(subs_itd /subs_forecast)",
  },
  // subs_cost

  //other Direct Cost
  {
    field: "odc_prior_period_mtd",
    formula: "delta_res4_pp",
  },
  // {
  //   field: "odc_approved",
  //   formula: "at_comp_plan1_res4_cost ",
  // },
  {
    field: "odc_forecast",
    formula: "at_comp_plan2_res4_cost  ",
  },
  {
    field: "odc_prior_period_forecast",
    formula: "at_comp_plan2_res4_cost_pp   ",
  },
  {
    field: "odc_etc",
    formula: "odc_forecast- odc_itd  ",
  },
  {
    field: "odc_complete",
    formula: "(odc_itd/odc_forecast)",
  },
  {
    field: "odc_original",
    formula: "at_comp_plan3_res4_cost",
  },
  //other Direct Cost

  //  Contingency Budget

  {
    field: "cb_prior_period_mtd",
    formula: "delta_res6_pp",
  },
  {
    field: "cb_mtd",
    formula: "delta_res_6 ",
  },
  {
    field: "cb_ytd",
    formula: "ytd_delta_res6",
  },
  {
    field: "cb_itd",
    formula: "itd_res_6_pp + delta_res_6  ",
  },
  {
    field: "cb_original",
    formula: "at_comp_plan3_res6_cost ",
  },

  // {
  //   field: "cb_approved",
  //   formula: "at_comp_plan1_res6_cost",
  // },
  {
    field: "cb_forecast",
    formula: "at_comp_plan2_res6_cost ",
  },
  {
    field: "cb_prior_period_forecast",
    formula: "at_comp_plan2_res6_cost_pp ",
  },
  {
    field: "cb_etc",
    formula: "cb_forecast- cb_itd",
  },
  {
    field: "cb_complete",
    formula: "(cb_itd/cb_forecast)",
  },

  //  Contingency Budget

  //Total other Direct other cost

  {
    field: "tod_prior_period_mtd",
    formula: "subs_prior_period_mtd + odc_prior_period_mtd",
  },
  {
    field: "tod_mtd",
    formula: "subs_mtd + odc_mtd",
  },
  {
    field: "tod_ytd",
    formula: "subs_ytd + odc_ytd",
  },
  {
    field: "tod_itd",
    formula: "subs_itd + odc_itd",
  },
  {
    field: "tod_original",
    formula: "subs_original + odc_original + cb_original ",
  },
  {
    field: "tod_approved",
    formula: "subs_approved + odc_approved +cb_approved",
  },
  {
    field: "tod_forecast",
    formula: "subs_forecast + odc_forecast +cb_forecast",
  },
  {
    field: "tod_prior_period_forecast",
    formula:
      "subs_prior_period_forecast + odc_prior_period_forecast + cb_prior_period_forecast",
  },
  {
    field: "tod_etc",
    formula: "tod_forecast-tod_itd",
  },
  {
    field: "tod_complete",
    formula: "(tod_itd / tod_forecast)",
  },

  //Total other Direct other cost

  //net service revenue
  {
    field: "nsr_prior_period_mtd",
    formula: "gr_prior_period_mtd - tod_prior_period_mtd",
  },
  // {
  //   field: "nsr_mtd",
  //   formula: "gr_mtd - tod_mtd",
  // },
  // {
  //   field: "nsr_ytd",
  //   formula: "gr_ytd - tod_ytd",
  // },
  // {
  //   field: "nsr_itd",
  //   formula: "gr_itd - tod_itd",
  // },

  {
    field: "nsr_original",
    formula: "gr_original - tod_original",
  },

  {
    field: "nsr_approved",
    formula: "gr_approved - tod_approved",
  },
  {
    field: "nsr_forecast",
    formula: "gr_forecast - tod_forecast",
  },
  {
    field: "nsr_prior_period_forecast",
    formula: "gr_prior_period_forecast - tod_prior_period_forecast",
  },
  {
    field: "nsr_etc",
    formula: "nsr_forecast-nsr_itd",
  },
  {
    field: "nsr_complete",
    formula: "(nsr_itd / nsr_forecast)",
  },
  //net service revenue

  //direct labour cost
  {
    field: "dls_prior_period_mtd",
    formula: "delta_res1_pp",
  },
  {
    field: "dls_mtd",
    formula: "delta_res_1 ",
  },
  {
    field: "dls_ytd",
    formula: "ytd_delta_res1 ",
  },
  {
    field: "dls_itd",
    formula: "itd_res_1_pp  + delta_res_1 ",
  },
  {
    field: "dls_original",
    formula: "at_comp_plan3_res1_cost ",
  },

  {
    field: "dls_approved",
    formula: "at_comp_plan1_res1_cost ",
  },
  {
    field: "dls_forecast",
    formula: "at_comp_plan2_res1_cost  ",
  },
  {
    field: "dls_prior_period_forecast",
    formula: "at_comp_plan2_res1_cost_pp  ",
  },
  {
    field: "dls_etc",
    formula: "dls_forecast - dls_itd",
  },
  {
    field: "dls_complete",
    formula: "(dls_itd/dls_forecast ) ",
  },
  //direct labour cost

  //fringe cost
  {
    field: "fringe_prior_period_mtd",
    formula: "delta_res2_pp",
  },
  {
    field: "fringe_mtd",
    formula: "delta_res_2 ",
  },
  {
    field: "fringe_original",
    formula: "at_comp_plan3_res2_cost ",
  },
  {
    field: "fringe_approved",
    formula: "at_comp_plan1_res2_cost",
  },
  {
    field: "fringe_forecast",
    formula: "at_comp_plan2_res2_cost",
  },
  {
    field: "fringe_prior_period_forecast",
    formula: "at_comp_plan2_res2_cost_pp ",
  },
  {
    field: "fringe_etc",
    formula: "fringe_forecast - fringe_itd",
  },
  {
    field: "fringe_complete",
    formula: "(fringe_itd /fringe_forecast )",
  },
  //fringe cost
  {
    field: "gm_prior_period_mtd",
    formula:
      "(gr_prior_period_mtd - (tod_prior_period_mtd + dls_prior_period_mtd + fringe_prior_period_mtd))",
  },
  // {
  //   field: "gm_ytd",
  //   formula: "gr_ytd-(tod_ytd + dls_ytd + fringe_ytd)",
  // },
  // {
  //   field: "gm_itd",
  //   formula: "gr_itd-(tod_itd + dls_itd + fringe_itd)",
  // },
  // {
  //   field: "gm_mtd",
  //   formula: "gr_mtd-(tod_mtd + dls_mtd + fringe_mtd)",
  // },
  {
    field: "gm_original",
    formula: "gr_original-(tod_original +fringe_original+dls_original)",
  },
  {
    field: "gm_approved",
    formula: "gr_approved -(tod_approved +dls_approved+ fringe_approved)",
  },
  {
    field: "gm_forecast",
    formula: "gr_forecast -(tod_forecast + dls_forecast + fringe_forecast)",
  },
  {
    field: "gm_prior_period_forecast",
    formula:
      "gr_prior_period_forecast -(tod_prior_period_forecast + dls_prior_period_forecast + fringe_prior_period_forecast)",
  },
  {
    field: "gm_etc",
    formula: "gm_forecast-gm_itd",
  },
  {
    field: "gm_complete",
    formula: "(gm_itd / gm_forecast)",
  },

  //applied overhead

  {
    field: "ao_prior_period_mtd",
    formula: "delta_res3_pp",
  },
  {
    field: "ao_mtd",
    formula: "delta_res_3",
  },
  {
    field: "ao_ytd",
    formula: "ytd_delta_res3  ",
  },
  {
    field: "ao_itd",
    formula: "itd_res_3_pp +delta_res_3 ",
  },
  {
    field: "ao_original",
    formula: "at_comp_plan3_res3_cost",
  },
  {
    field: "ao_approved",
    formula: "at_comp_plan1_res3_cost",
  },
  {
    field: "ao_forecast",
    formula: "at_comp_plan2_res3_cost ",
  },
  {
    field: "ao_prior_period_forecast",
    formula: "at_comp_plan2_res3_cost_pp ",
  },
  {
    field: "ao_etc",
    formula: "ao_forecast - ao_itd",
  },
  {
    field: "ao_complete",
    formula: "(ao_itd /ao_forecast )",
  },

  //fully bureden labour

  {
    field: "fbl_prior_period_mtd",
    formula: "delta_res1_pp+delta_res2_pp + delta_res3_pp",
  },
  {
    field: "fbl_mtd",
    formula: "delta_res_1 + delta_res_2 + delta_res_3  ",
  },
  {
    field: "fbl_ytd",
    formula: "ytd_delta_res1+ytd_delta_res2+ytd_delta_res3",
  },
  {
    field: "fbl_itd",
    formula:
      "itd_res_1_pp + delta_res_1 + itd_res_2_pp + delta_res_2  +itd_res_3_pp +delta_res_3 ",
  },
  {
    field: "fbl_original",
    formula:
      "at_comp_plan3_res1_cost  +  at_comp_plan3_res2_cost  + at_comp_plan3_res3_cost ",
  },
  // {
  //   field: "fbl_approved",
  //   formula:
  //     "at_comp_plan1_res1_cost  + at_comp_plan1_res2_cost +at_comp_plan1_res3_cost ",
  // },
  {
    field: "fbl_forecast",
    formula:
      "at_comp_plan2_res1_cost  + at_comp_plan2_res2_cost + at_comp_plan2_res3_cost ",
  },
  {
    field: "fbl_prior_period_forecast",
    formula:
      "at_comp_plan2_res1_cost_pp  + at_comp_plan2_res2_cost_pp + at_comp_plan2_res3_cost_pp ",
  },
  {
    field: "fbl_etc",
    formula: "fbl_forecast -fbl_itd",
  },

  {
    field: "fbl_complete",
    formula: "(fbl_itd/fbl_forecast )",
  },

  // fully burden labour

  //total cost
  {
    field: "total_costs_prior_period_mtd",
    formula:
      "subs_prior_period_mtd + odc_prior_period_mtd + fbl_prior_period_mtd",
  },
  // {
  //   field: "total_costs_ytd",
  //   formula: "subs_ytd + odc_ytd +fbl_ytd",
  // },
  {
    field: "total_costs_original",
    formula: "subs_original + odc_original + cb_original + fbl_original",
  },
  // {
  //   field: "total_costs_approved",
  //   formula: "subs_approved + odc_approved+cb_approved + fbl_approved",
  // },
  {
    field: "total_costs_forecast",
    formula: "subs_forecast + odc_forecast + cb_forecast + fbl_forecast",
  },
  {
    field: "total_costs_prior_period_forecast",
    formula:
      "subs_prior_period_forecast +odc_prior_period_forecast +cb_prior_period_forecast +fbl_prior_period_forecast",
  },
  {
    field: "total_costs_etc",
    formula: "total_costs_forecast - total_costs_itd",
  },
  {
    field: "total_costs_complete",
    formula: "(total_costs_itd/total_costs_forecast)",
  },

  //total cost

  // Net Margin
  {
    field: "nm_prior_period_mtd",
    formula: "gr_prior_period_mtd  - total_costs_prior_period_mtd",
  },
  // {
  //   field: "nm_mtd",
  //   formula: "gr_mtd  - total_costs_mtd",
  // },
  // {
  //   field: "nm_ytd",
  //   formula: "gr_ytd-total_costs_ytd",
  // },
  // {
  //   field: "nm_itd",
  //   formula: "gr_itd-total_costs_itd",
  // },
  {
    field: "nm_original",
    formula: "gr_original-total_costs_original",
  },
  // {
  //   field: "nm_approved",
  //   formula: "gr_approved - total_costs_approved",
  // },
  {
    field: "nm_forecast",
    formula: "gr_forecast - total_costs_forecast",
  },
  {
    field: "nm_prior_period_forecast",
    formula: "gr_prior_period_forecast - total_costs_prior_period_forecast",
  },
  {
    field: "nm_etc",
    formula: "nm_forecast - nm_itd",
  },
  {
    field: "nm_complete",
    formula: "(nm_itd/ nm_forecast)",
  },

  //billed
  {
    field: "billed_prior_period_mtd",
    formula: "delta_billed_pp",
  },
  {
    field: "billed_mtd",
    formula: "delta_billed",
  },
  // {
  //   field: "billed_itd",
  //   formula: "itd_billed_pp + delta_billed",
  // },

  //billed

  //cash application
  {
    field: "ca_prior_period_mtd",
    formula: "delta_paid_pp",
  },
  {
    field: "ca_mtd",
    formula: "delta_paid",
  },
  {
    field: "ca_ytd",
    formula: "ytd_delta_paid",
  },
  {
    field: "ca_itd",
    formula: "itd_paid_pp + delta_paid",
  },
  //cash application

  //kpi
  {
    field: "gmn_prior_period_mtd",
    formula: "(gm_prior_period_mtd / nsr_prior_period_mtd)",
  },
  {
    field: "gmn_mtd",
    formula: "(gm_mtd / nsr_mtd)",
  },
  {
    field: "gmn_ytd",
    formula: "(gm_ytd/ nsr_ytd)",
  },
  {
    field: "gmn_itd",
    formula: "(gm_itd / nsr_itd)",
  },

  {
    field: "gmn_original",
    formula: "(gm_original / nsr_original)",
  },
  {
    field: "gmn_approved",
    formula: "(gm_approved / nsr_approved)",
  },
  {
    field: "gmn_forecast",
    formula: "(gm_forecast / nsr_forecast)",
  },
  {
    field: "gmn_prior_period_forecast",
    formula: "(gm_prior_period_forecast / nsr_prior_period_forecast)",
  },
  {
    field: "gmn_etc",
    formula: "(gm_etc / nsr_etc)",
  },
  // {
  //   field: "gmn_complete",
  //   formula: "(gm_complete / nsr_complete)* 100",
  // },

  //net margin nsr
  {
    field: "nmn_prior_period_mtd",
    formula: "(nm_prior_period_mtd / nsr_prior_period_mtd)",
  },
  {
    field: "nmn_mtd",
    formula: "(nm_mtd / nsr_mtd)",
  },
  {
    field: "nmn_ytd",
    formula: "(nm_ytd / nsr_ytd)",
  },
  {
    field: "nmn_itd",
    formula: "(nm_itd / nsr_itd)",
  },
  {
    field: "nmn_original",
    formula: "(nm_original / nsr_original)",
  },
  {
    field: "nmn_approved",
    formula: "(nm_approved / nsr_approved)",
  },
  {
    field: "nmn_forecast",
    formula: "(nm_forecast / nsr_forecast)",
  },
  {
    field: "nmn_Prior_Period_Forecast",
    formula: "(nm_prior_period_forecast / nsr_prior_period_forecast)",
  },
  {
    field: "nmn_etc",
    formula: "(nm_etc / nsr_etc)",
  },
  // {
  //   field: "nmn_complete",
  //   formula: "(nm_complete / nsr_complete)* 100",
  // },
  //net margin nsr

  // netmargin gross revenue

  {
    field: "nmgr_prior_period_mtd",
    formula: "(nm_prior_period_mtd/ gr_prior_period_mtd)",
  },
  {
    field: "nmgr_mtd",
    formula: "(nm_mtd/ gr_mtd)",
  },
  {
    field: "nmgr_ytd",
    formula: "(nm_ytd/ gr_ytd)",
  },
  {
    field: "nmgr_itd",
    formula: "(nm_itd/ gr_itd)",
  },
  {
    field: "nmgr_original",
    formula: "(nm_original/ gr_original)",
  },
  {
    field: "nmgr_approved",
    formula: "(nm_approved/ gr_approved)",
  },
  {
    field: "nmgr_forecast",
    formula: "(nm_forecast/ gr_forecast)",
  },
  {
    field: "nmgr_Prior_Period_Forecast",
    formula: "(nm_prior_period_forecast/ gr_prior_period_forecast)",
  },
  {
    field: "nmgr_etc",
    formula: "(nm_etc/ gr_etc)",
  },
  // {
  //   field: "nmgr_complete",
  //   formula: "(nm_complete/ gr_complete)* 100",
  // },

  {
    field: "glm_prior_period_mtd",
    formula:
      "((nm_prior_period_mtd /gr_prior_period_mtd ) -(nm_approved/gr_approved))*gr_prior_period_mtd",
  },
  {
    field: "glm_mtd",
    formula: "((nm_mtd /gr_mtd ) -(nm_approved/gr_approved))*gr_mtd",
  },
  {
    field: "glm_ytd",
    // formula: "((nm_ytd /nsr_ytd ) -(nm_approved/gr_approved))*gr_ytd", 
    //modified as below as per email WB020 - P&L testing result on Sprint01
    formula: "((nm_ytd /gr_ytd ) -(nm_approved/gr_approved))*gr_ytd",
  },
  {
    field: "glm_itd",
    // formula: "((nm_itd /nsr_itd ) -(nm_approved/gr_approved)*gr_itd) ",
     //modified as below as per email WB020 - P&L testing result on Sprint01
    formula: "((nm_itd /gr_itd  ) -(nm_approved/gr_approved))*gr_itd",
  },
  // {
  //   field :'glm_original',
  //   formula:'0'
  // },
  // {
  //   field :'glm_approved',
  //   formula:'0'
  // },
  // {
  //   field :'glm_forecast',
  //   formula:'0'

  // },
  // {
  //   field :'glm_Prior_Period_Forecast',
  //   formula:'0'
  // },
  // {
  //   field :'glm_etc',
  //   formula:'0'

  // },
  // {
  //   field :'glm_complete',
  //   formula:'0'
  // },
  //gain lost margin

  //hours
  {
    field: "hours_prior_period_mtd",
    formula: "delta_labor_hours_pp",
  },
  {
    field: "hours_mtd",
    formula: "delta_labor_hrs",
  },
  {
    field: "hours_ytd",
    formula: "ytd_delta_labor_hours",
  },
  {
    field: "hours_itd",
    formula: "itd_labor_hrs_pp  + delta_labor_hrs ",
  },
  {
    field: "hours_original",
    formula: "at_comp_plan3_quantity ",
  },
  {
    field: "hours_approved",
    formula: "at_comp_plan1_quantity",
  },
  {
    field: "hours_forecast",
    formula: "at_comp_plan2_quantity",
  },
  {
    field: "hours_Prior_Period_Forecast",
    formula: "at_comp_plan2_quantity_pp",
  },
  {
    field: "hours_etc",
    formula: "hours_forecast - hours_itd",
  },
  // {
  //   field :'hours_complete',
  //   formula:'0'
  // },
  //hours

  //avg labour rate
  {
    field: "alr_prior_period_mtd",
    formula: "(fbl_prior_period_mtd / hours_prior_period_mtd)",
  },
  {
    field: "alr_mtd",
    formula: "(fbl_mtd / hours_mtd)",
  },
  {
    field: "alr_ytd",
    formula: "(fbl_ytd / hours_ytd)",
  },
  {
    field: "alr_itd",
    formula: "(fbl_itd  / hours_itd)",
  },
  {
    field: "alr_original",
    formula: "(fbl_original / hours_original)",
  },
  {
    field: "alr_approved",
    formula: "(fbl_approved / hours_approved)",
  },
  {
    field: "alr_forecast",
    formula: "(fbl_forecast / hours_forecast)",
  },
  {
    field: "alr_Prior_Period_Forecast",
    formula: "(fbl_prior_period_forecast / hours_Prior_Period_Forecast)",
  },
  {
    field: "alr_etc",
    formula: "(fbl_etc / hours_etc)",
  },
  // {
  //   field :'alr_complete',
  //   formula:"0"
  // },

  //avg labour rate

  //direct labour multiplier
  {
    field: "dlm_prior_period_mtd",
    formula: "nsr_prior_period_mtd / dls_prior_period_mtd",
  },
  {
    field: "dlm_mtd",
    formula: "nsr_mtd / dls_mtd ",
  },
  {
    field: "dlm_ytd",
    formula: "nsr_ytd / dls_ytd",
  },
  {
    field: "dlm_itd",
    formula: "nsr_itd  / dls_itd ",
  },
  {
    field: "dlm_original",
    formula: "nsr_original / dls_original ",
  },
  {
    field: "dlm_approved",
    formula: "nsr_approved / dls_approved",
  },
  {
    field: "dlm_forecast",
    formula: "nsr_forecast / dls_forecast ",
  },
  {
    field: "dlm_Prior_Period_Forecast",
    formula: "nsr_prior_period_forecast / dls_prior_period_forecast ",
  },
  {
    field: "dlm_etc",
    formula: "nsr_etc / dls_etc",
  },

  //direct labour multiplier

  //Salary Cost Multiplier (SCM)
  {
    field: "scm_prior_period_mtd",
    formula:
      "nsr_prior_period_mtd / (dls_prior_period_mtd + fringe_prior_period_mtd)",
  },
  {
    field: "scm_mtd",
    formula: "nsr_mtd / (dls_mtd+ fringe_mtd) ",
  },
  {
    field: "scm_ytd",
    formula: "nsr_ytd / (dls_ytd + fringe_ytd)",
  },
  {
    field: "scm_itd",
    formula: "nsr_itd  / (dls_itd+ fringe_itd) ",
  },
  {
    field: "scm_original",
    formula: "nsr_original / (dls_original + fringe_original) ",
  },
  {
    field: "scm_approved",
    formula: "nsr_approved / (dls_approved + fringe_approved)",
  },
  {
    field: "scm_forecast",
    formula: "nsr_forecast / (dls_forecast + fringe_forecast) ",
  },
  {
    field: "scm_Prior_Period_Forecast",
    formula:
      "nsr_prior_period_forecast / (dls_prior_period_forecast + fringe_prior_period_forecast) ",
  },
  {
    field: "scm_etc",
    formula: "nsr_etc / (dls_etc + fringe_etc)",
  },

  //Salary Cost Multiplier (SCM)

  //fringe or direct labour
  {
    field: "fdl_prior_period_mtd",
    formula: "(fringe_prior_period_mtd / dls_prior_period_mtd)",
  },
  {
    field: "fdl_mtd",
    formula: "(fringe_mtd / dls_mtd)",
  },
  {
    field: "fdl_ytd",
    formula: "(fringe_ytd / dls_ytd)",
  },
  {
    field: "fdl_itd",
    formula: "(fringe_itd / dls_itd)",
  },
  {
    field: "fdl_original",
    formula: "(fringe_original / dls_original)",
  },
  {
    field: "fdl_approved",
    formula: "(fringe_approved / dls_approved)",
  },
  {
    field: "fdl_forecast",
    formula: "(fringe_forecast / dls_forecast)",
  },
  {
    field: "fdl_Prior_Period_Forecast",
    formula: "(fringe_prior_period_forecast / dls_prior_period_forecast)",
  },
  {
    field: "fdl_etc",
    formula: "(fringe_etc / dls_etc)",
  },
  // {
  //   field: "fdl_complete",
  //   formula: "(fringe_complete / dls_complete)* 100",
  // },

  //fringe of direct labour

  //overhead of direct labour

  // Metric Applied Overhead/Direct Labor Cost for this column

  {
    field: "odl_prior_period_mtd",
    formula: "(ao_prior_period_mtd / dls_prior_period_mtd)",
  },
  {
    field: "odl_mtd",
    formula: "(ao_mtd /  dls_mtd)",
  },
  {
    field: "odl_ytd",
    formula: "(ao_ytd /  dls_ytd)",
  },
  {
    field: "odl_itd",
    formula: "(ao_itd /  dls_itd)",
  },
  {
    field: "odl_original",
    formula: "(ao_original /  dls_original)",
  },
  {
    field: "odl_approved",
    formula: "(ao_approved /  dls_approved)",
  },
  {
    field: "odl_forecast",
    formula: "(ao_forecast /  dls_forecast)",
  },
  {
    field: "odl_Prior_Period_Forecast",
    formula: "(ao_prior_period_forecast /  dls_prior_period_forecast)",
  },
  {
    field: "odl_etc",
    formula: "(ao_etc /  dls_etc)",
  },

  //overhead of direct labour
  //kpi
];
