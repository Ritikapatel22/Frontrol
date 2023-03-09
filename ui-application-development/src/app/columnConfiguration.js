export const projectColumns = [
  //arUnbilled
  {
    field: 'unbilled_ar_60_days',
    formula: 'unbilled_rec_6190+unbilled_rec_91180+unbilled_rec_over_180',
  },
  {
    field: 'billed_ar_over_90_days',
    formula: 'ar_91180+ar_over_180',
  },
  //End
  {
    field: 'billed_itd',
    formula: '(itd_billed_pp+delta_billed)',
  },
  {
    field: 'percent_biiled_to_date',
    formula: '((itd_billed_pp+delta_billed)/funding)',
  },
  // {
  //   field: "biee",
  //   formula: "((itd_billed_pp+delta_billed) - (itd_rev_pp+delta_rev))",
  // },
  {
    field: 'subs_itd',
    formula: 'itd_res_5_pp+delta_res_5',
  },
  {
    field: 'odc_itd',
    formula: 'itd_res_4_pp+delta_res_4',
  },
  {
    field: 'cost_spent',
    formula:
      '((itd_res_1_pp+delta_res_1+itd_res_2_pp+delta_res_2+itd_res_3_pp+delta_res_3 + subs_itd + odc_itd)/at_comp_plan2_cost)',
  },
  {
    field: 'cpi',
    formula: 'ev/(itd_cost_pp+delta_cost)',
  },
  {
    field: 'spi',
    formula: 'ev/itd_plan1_cost',
    //"TBD"
  },
  {
    field: 'approved_backlog',
    formula:
      '(at_comp_plan1_revenue)-(itd_labor_rev_pp+itd_non_labor_rev_pp+itd_event_rev_pp+delta_labor_rev+delta_non_labor_rev+delta_event_rev)',
  },
  {
    field: 'approved_nsr_budget',
    formula:
      'at_comp_plan1_revenue-(at_comp_plan1_res4_cost+at_comp_plan1_res5_cost+at_comp_plan1_res6_cost)',
  },
  {
    field: 'approved_gross_margin_budget',
    formula:
      'at_comp_plan1_revenue-(at_comp_plan1_res1_cost+at_comp_plan1_res2_cost+at_comp_plan1_res4_cost+at_comp_plan1_res5_cost+at_comp_plan1_res6_cost)',
  },
  {
    field: 'approved_gross_margin_budget_percent_nsr',
    formula: '(approved_gross_margin_budget/approved_nsr_budget)',
  },
  {
    field: 'approved_net_margin',
    formula:
      'at_comp_plan1_revenue-(at_comp_plan1_res1_cost+at_comp_plan1_res2_cost+at_comp_plan1_res3_cost+at_comp_plan1_res4_cost+at_comp_plan1_res5_cost+at_comp_plan1_res6_cost)',
  },
  {
    field: 'approved_net_margin_percent_of_nsr',
    formula: '(approved_net_margin/approved_nsr_budget)',
  },
  {
    field: 'approved_direct_labor_multiplier',
    formula: 'approved_nsr_budget/at_comp_plan1_res1_cost',
  }, // till approved done
  {
    //forecast
    field: 'forecast_nsr_budget',
    formula:
      'at_comp_plan2_revenue-(at_comp_plan2_res4_cost +at_comp_plan2_res5_cost +at_comp_plan2_res6_cost )',
  },
  {
    field: 'forecast_gross_margin',
    formula:
      'at_comp_plan2_revenue -(at_comp_plan2_res1_cost+at_comp_plan2_res2_cost+at_comp_plan2_res4_cost+at_comp_plan2_res5_cost+at_comp_plan2_res6_cost)',
  },
  {
    field: 'forecast_gross_margin_percent_of_nsr',
    formula: '(forecast_gross_margin/forecast_nsr_budget)',
  },
  {
    field: 'forecast_net_margin',
    formula:
      'at_comp_plan2_revenue - (at_comp_plan2_res1_cost +at_comp_plan2_res2_cost+at_comp_plan2_res3_cost+at_comp_plan2_res4_cost+at_comp_plan2_res5_cost+at_comp_plan2_res6_cost)',
  },
  {
    field: 'forecast_net_margin_percent_of_nsr',
    formula: '(forecast_net_margin/forecast_nsr_budget)',
  },
  {
    field: 'forecast_direct_labor_multiplier',
    formula: 'forecast_nsr_budget/at_comp_plan2_res1_cost',
  },
  {
    field: 'forecast_gain_loss_margin',
    formula:
      '((forecast_net_margin/at_comp_plan2_revenue)-(approved_net_margin/at_comp_plan1_revenue))*at_comp_plan2_revenue',
  }, //forecast done
  //change
  {
    field: 'approved_revenue_budget_mtd_change',
    formula: 'at_comp_plan1_revenue - at_comp_plan1_rev_pp',
  },
  {
    field: 'forecast_revenue_mtd_change',
    formula: ' at_comp_plan2_revenue - at_comp_plan2_rev_pp',
  },
  {
    field: 'approved_nsr_budget_mtd_change',
    formula:
      '(at_comp_plan1_revenue-(at_comp_plan1_res4_cost+at_comp_plan1_res5_cost+at_comp_plan1_res6_cost))-(at_comp_plan1_rev_pp - (at_comp_plan1_res4_cost_pp+at_comp_plan1_res5_cost_pp+at_comp_plan1_res6_cost_pp))',
  },
  {
    field: 'forecast_nsr_mtd_change',
    formula:
      '(at_comp_plan2_revenue-(at_comp_plan2_res4_cost+at_comp_plan2_res5_cost+at_comp_plan2_res6_cost))-(at_comp_plan2_rev_pp -(at_comp_plan2_res4_cost_pp+at_comp_plan2_res5_cost_pp+at_comp_plan2_res6_cost_pp))',
  },
  {
    field: 'approved_gross_margin_mtd_change',
    formula:
      '(at_comp_plan1_revenue-(at_comp_plan1_res1_cost+at_comp_plan1_res2_cost+at_comp_plan1_res4_cost+at_comp_plan1_res5_cost+at_comp_plan1_res6_cost))-(at_comp_plan1_rev_pp -(at_comp_plan1_res1_cost_pp+at_comp_plan1_res2_cost_pp+at_comp_plan1_res4_cost_pp+at_comp_plan1_res5_cost_pp+at_comp_plan1_res6_cost_pp))',
  },
  {
    field: 'forecast_gross_margin_mtd_change',
    formula:
      '(at_comp_plan2_revenue-(at_comp_plan2_res1_cost+at_comp_plan2_res2_cost+at_comp_plan2_res4_cost+at_comp_plan2_res5_cost+at_comp_plan2_res6_cost))-(at_comp_plan2_rev_pp-(at_comp_plan2_res1_cost_pp+at_comp_plan2_res2_cost_pp+at_comp_plan2_res4_cost_pp+at_comp_plan2_res5_cost_pp+at_comp_plan2_res6_cost_pp))',
  },
  {
    field: 'approved_gross_margin_mtd_change_percent_of_nsr_mtd_change',
    formula:
      '(approved_gross_margin_mtd_change/approved_nsr_budget_mtd_change)',
  },
  {
    field: 'approved_cost_budget_mtd_change',
    formula: 'at_comp_plan1_cost-at_comp_plan1_cost_pp',
  },
  {
    field: 'forecast_cost_mtd_change',
    formula: 'at_comp_plan2_cost-at_comp_plan2_cost_pp',
  },
  {
    field: 'approved_net_margin_mtd_change',
    formula:
      '(at_comp_plan1_revenue-(at_comp_plan1_res1_cost+at_comp_plan1_res2_cost+at_comp_plan1_res3_cost+at_comp_plan1_res4_cost+at_comp_plan1_res5_cost+at_comp_plan1_res6_cost))-(at_comp_plan1_rev_pp-(at_comp_plan1_res1_cost_pp+at_comp_plan1_res2_cost_pp+at_comp_plan1_res3_cost_pp+at_comp_plan1_res4_cost_pp+at_comp_plan1_res5_cost_pp+at_comp_plan1_res6_cost_pp))',
  },
  {
    field: 'forecast_net_margin_mtd_change',
    formula:
      '(at_comp_plan2_revenue-(at_comp_plan2_res1_cost+at_comp_plan2_res2_cost+at_comp_plan2_res3_cost+at_comp_plan2_res4_cost+at_comp_plan2_res5_cost+at_comp_plan2_res6_cost))-(at_comp_plan2_rev_pp-(at_comp_plan2_res1_cost_pp+at_comp_plan2_res2_cost_pp+at_comp_plan2_res3_cost_pp+at_comp_plan2_res4_cost_pp+at_comp_plan2_res5_cost_pp+at_comp_plan2_res6_cost_pp))',
  },
  {
    field: 'approved_net_margin_mtd_change_percent_of_nsr_mtd_change',
    formula:
      '(approved_net_margin_mtd_change/approved_nsr_budget_mtd_change)',
  },
  //change done
  {
    //mtd
    field: 'gr_mtd',
    formula: '(delta_labor_rev+delta_non_labor_rev+delta_event_rev)',
  },
  {
    field: 'subs_mtd',
    formula: 'delta_res_5',
  },
  {
    field: 'odc_mtd',
    formula: 'delta_res_4 ',
  },
  {
    field: 'total_costs_mtd',
    formula: '(delta_res_1+delta_res_2+delta_res_3+subs_mtd+odc_mtd)',
  },
  {
    field: 'nm_mtd',
    formula: 'gr_mtd -  total_costs_mtd',
  },
  {
    field: 'nsr_mtd',
    formula: 'gr_mtd-(subs_mtd+odc_mtd)',
  },
  {
    field: 'gm_mtd',
    formula: 'gr_mtd-(delta_res_1+delta_res_2+subs_mtd+odc_mtd)',
  },
  {
    field: 'gm_percent_of_nsr_mtd',
    formula: '(gm_mtd/nsr_mtd)',
  },
  {
    field: 'nm_percent_of_nsr_mtd',
    formula: '(nm_mtd/nsr_mtd)',
  },
  {
    field: 'direct_labor_multiplier_mtd',
    formula: 'nsr_mtd/delta_res_1',
  }, //mtd done
  {
    //ytd
    field: '',
    formula: '',
  },
  {
    field: 'gr_ytd',
    formula: 'ytd_delta_labor_rev+ytd_delta_non_labor_rev+ytd_delta_event_rev',
  },
  {
    field: 'subs_ytd',
    formula: 'ytd_delta_res5',
  },
  {
    field: 'odc_ytd',
    formula: 'ytd_delta_res4',
  },
  {
    field: 'nsr_ytd',
    formula: 'gr_ytd-(subs_ytd+odc_ytd)',
  },
  {
    field: 'gm_ytd',
    formula: 'gr_ytd -(ytd_delta_res1+ytd_delta_res2+subs_ytd+odc_ytd)',
  },
  {
    field: 'gm_percent_of_nsr_ytd',
    formula: '(gm_ytd/nsr_ytd)',
  },
  {
    field: 'total_costs_ytd',
    formula: 'ytd_delta_res1+ytd_delta_res2+ ytd_delta_res3+subs_ytd+odc_ytd',
  },
  {
    field: 'nm_ytd',
    formula: 'gr_ytd-total_costs_ytd',
  },
  {
    field: 'nm_percent_of_nsr_ytd',
    formula: '(nm_ytd/nsr_ytd)',
  },
  {
    field: 'direct_labor_ytd',
    formula: 'ytd_delta_res1',
  },
  {
    field: 'direct_labor_multiplier_ytd',
    formula: 'nsr_ytd/direct_labor_ytd',
  },
  {
    field: 'direct_labor_hours_ytd',
    formula: 'ytd_delta_labor_hours',
  },
  {
    field: 'fringe_ytd',
    formula: 'ytd_delta_res2',
  },
  {
    field: 'overhead_ytd',
    formula: 'ytd_delta_res3',
  },
  {
    field: 'gr_approved',
    formula: 'at_comp_plan1_revenue',
  },
  {
    field: 'subs_approved',
    formula: 'at_comp_plan1_res5_cost ',
  },
  {
    field: 'odc_approved',
    formula: 'at_comp_plan1_res4_cost ',
  },
  {
    field: 'cb_approved',
    formula: 'at_comp_plan1_res6_cost',
  },
  {
    field: 'fbl_approved',
    formula:
      'at_comp_plan1_res1_cost  + at_comp_plan1_res2_cost +at_comp_plan1_res3_cost ',
  },
  {
    field: 'total_costs_approved',
    formula: 'subs_approved + odc_approved+cb_approved + fbl_approved',
  },
  {
    field: 'gr_itd',
    formula:
      'itd_labor_rev_pp+itd_non_labor_rev_pp+itd_event_rev_pp+delta_labor_rev+delta_non_labor_rev +delta_event_rev',
  },
  {
    field: 'nsr_itd',
    formula: 'gr_itd-(subs_itd+odc_itd)',
  },
  {
    field: 'approved_nsr_backlog',
    formula: 'approved_nsr_budget - nsr_itd',
  },
  {
    field: 'gm_itd',
    formula:
      '(gr_itd)-(itd_res_1_pp + delta_res_1 + itd_res_2_pp + delta_res_2  +subs_itd + odc_itd)',
  },

  {
    field: 'gm_percent_of_nsr_itd',
    formula: '(gm_itd/nsr_itd)',
  },
  {
    field: 'total_costs_itd',
    formula:
      'itd_res_1_pp+delta_res_1+itd_res_2_pp+delta_res_2+itd_res_3_pp+delta_res_3+subs_itd+odc_itd',
  },
  {
    field: 'nm_itd',
    formula: 'gr_itd-total_costs_itd',
  },
  {
    field: 'nm_percent_of_nsr_itd',
    formula: '(nm_itd/nsr_itd)',
  },
  {
    field: 'direct_labor_itd',
    formula: 'itd_res_1_pp+delta_res_1',
  },
  {
    field: 'direct_labor_multiplier_itd',
    formula: 'nsr_itd/direct_labor_itd',
  },
  {
    field: 'direct_labor_hours_itd',
    formula: 'itd_labor_hrs_pp+delta_labor_hrs',
  },
  {
    field: 'fringe_itd',
    formula: 'itd_res_2_pp+delta_res_2',
  },
  {
    field: 'overhead_itd',
    formula: 'itd_res_3_pp+delta_res_3',
  }, //itd done
  {
    field: 'total_cost_itd',
    formula:
      '(itd_res_1_pp+delta_res_1+itd_res_2_pp+delta_res_2+itd_res_3_pp+delta_res_3 + subs_itd + odc_itd)',
  },

  {
    field: 'etc',
    formula: 'at_comp_plan2_cost-total_cost_itd',
  },
  {
    field: 'percent_costs_to_date',
    formula: '(total_costs_itd/at_comp_plan2_cost)',
  },

  {
    field: 'balance_due',
    formula: 'total_invoice_amount - payment_received',
  },
  {
    field: 'total_billed',
    formula: 'ar_total + payment_received',
  },
  // {
  //     field: 'days_outstanding',
  //     formula: "Math.ceil((new Date().getTime() - new Date('2021-10-25').getTime()) / (1000 * 3600 * 24))"
  // },
  // {
  //   field: "est_collections_over_contract",
  //   formula: "(itd_paid_pp + delta_paid) - at_comp_plan1_revenue",
  // },
  {
    field: 'approved_salary_cost_multiplier',
    formula:
      'approved_nsr_budget / (at_comp_plan1_res1_cost+at_comp_plan1_res2_cost)',

    // column Approved NSR Budget  / (column Approved Direct Labor Budget + column Approved Fringe Budget)
  },
  {
    field: 'approved_overhead_budget_percent_of_direct_labor',
    formula: '(at_comp_plan1_res3_cost/at_comp_plan1_res1_cost)',
    // column Approved Overhead Budget / Approved Direct Labor Budget
  },
  {
    field: 'forecast_salary_cost_multiplier',
    formula:
      'forecast_nsr_budget/(at_comp_plan2_res1_cost+at_comp_plan2_res2_cost)',
    // column Forecast NSR Budget  / (column Forecast Direct Labor Budget + column Forecastd Fringe Budget)
  },
  {
    field: 'forecast_overhead_budget_percent_of_direct_labor',
    formula: '(at_comp_plan2_res3_cost/at_comp_plan2_res1_cost)',
    // column Forecast Overhead Budget / Forecast Direct Labor Budget
  },
  {
    field: 'gross_revenue_mtd_calculated',
    formula:
      '(total_costs_mtd/at_comp_plan2_cost)*at_comp_plan2_revenue',
    // column Total Costs - MTD / Forecast Cost Budget * Revenue Budget
  },
  {
    field: 'gross_revenue_mtd_impact',
    formula: '(gr_mtd- gross_revenue_mtd_calculated)',
    // Gross Revenue MTD - Gross Revenue MTD (Calculated)
  },
  {
    field: 'salary_cost_multiplier_mtd',
    formula: 'nsr_mtd/(delta_res_1+delta_res_2)',
    // column NSR - MTD / (column Direct Labor - MTD + column Fringe - MTD)
  },
  {
    field: 'overhead_percent_of_direct_labor_mtd',
    formula: '(delta_res_3/delta_res_1)',
    // formula: "delta_res_3 == 0 || delta_res_1 == 0? 0: delta_res_3/delta_res_1",
    // column Overhead - MTD / column Direct Labor - MTD
  },
  {
    field: 'salary_cost_multiplier_ytd',
    formula: 'nsr_ytd/(direct_labor_ytd+fringe_ytd)',
    // column NSR - YTD / (column Direct Labor - YTD + column Fringe - YTD)
  },
  {
    field: 'overhead_percent_of_direct_labor_ytd',
    formula: '(overhead_ytd/direct_labor_ytd)',
    // column Overhead - YTD / column Direct Labor - YTD
  },
  {
    field: 'billed_ytd',
    formula: 'ytd_delta_billed',
    // acm_project_snapshot.ytd_billed_py + acm_project_snapshot.ytd_delta_billed
  },
  {
    field: 'cash_apps_ytd',
    formula: 'ytd_delta_paid',
    // acm_project_snapshot.ytd_paid_py + acm_project_snapshot.ytd_delta_paid
  },
  {
    field: 'percent_complete_itd_cost',
    formula: '(total_costs_itd/at_comp_plan2_cost)',
    // (column Total Costs - ITD / column Forecast Cost Budget)
  },
  {
    field: 'percent_complete_itd_gross_revenue',
    formula: '(gr_itd/at_comp_plan2_revenue)',
    // (column Gross Revenue - ITD / Forecast Revenue Budget)
  },
  {
    field: 'salary_cost_multiplier_itd',
    formula: 'nsr_itd/(direct_labor_itd+fringe_itd)',
    // column NSR - ITD / (column Direct Labor - ITD + column Fringe - ITD)
  },
  {
    field: 'overhead_percent_of_direct_labor_itd',
    formula: '(overhead_itd/direct_labor_itd)',
    // column Overhead - ITD / column Direct Labor - ITD
  },
  {
    field: 'itd_net_margin',
    formula: '(itd_rev_pp + delta_rev) - (itd_cost_pp + delta_cost)',
    // Pending
  },

  {
    field: 'loss_provision_itd',
    formula:
      "(at_comp_plan2_revenue - at_comp_plan2_cost) < 0 ? forecast_net_margin - itd_net_margin:''",
    // Pending
  },
  {
    field: 'percent_billed_itd',
    formula: '(billed_itd/at_comp_plan2_revenue)',
    // column Billed - ITD / column Forecast Revenue Budget
  },
  {
    field: 'forecast_revenue_to_bill',
    formula: 'at_comp_plan2_revenue-billed_itd',
    // column Forecast Revenue Budget - column Billed - ITD
  },
  {
    field: 'billed_itd_arb',
    formula:
      "billed_itd>at_comp_plan1_revenue?(billed_itd-at_comp_plan1_revenue):''",
    // 'column Billed ITD - column Approved Revenue Budget -- only populate if Billed ITD > ARB
  },
  {
    field: 'billed_itd_frb',
    formula:
      "billed_itd>at_comp_plan2_revenue?billed_itd-at_comp_plan2_revenue:''",
    //column Billed ITD - column Forecast Revenue Budget -- only populate if Billed ITD > FRB
  },
  {
    field: 'cash_apps_itd',
    formula: '(itd_paid_pp+delta_paid)',
    // acm_project_snapshot.itd_paid_pp + acm_project_snapshot.delta_paid
  },
  {
    field: 'est_collections_over_contract',
    formula:
      "(itd_paid_pp+delta_paid)-at_comp_plan1_revenue>0?(itd_paid_pp+delta_paid)-at_comp_plan1_revenue:''",
    //(acm_project_snapshot.itd_paid_pp + acm_project_snapshot.delta_paid) - column Approved Revenue Budget > 0 then show
  },
  {
    field: 'revenue_over_contract',
    formula: '(itd_rev_pp+delta_rev)-funding > 0?(itd_rev_pp+delta_rev)-funding:0',
    // (acm_project_snapshot.itd_rev_pp + acm_project_snapshot.delta_rev) - acm_project_snapshot.funding
  },
  {
    field: 'etc_gross_revenue',
    formula: '(at_comp_plan2_revenue- gr_itd)',
    //(column Forecast Revenue Budget - column ITD Gross Revenue)
  },
  {
    field: 'etc_nsr',
    formula: '(forecast_nsr_budget-nsr_itd)',
    // (column Forecast NSR Budget - column NSR ITD)
  },
  {
    field: 'etc_total_cost',
    formula: 'at_comp_plan2_cost-total_costs_itd',
    //(column Forecast Total Cost Budget - column ITD Total Costs)
  },
  {
    field: 'etc_net_margin',
    formula: '(forecast_net_margin - nm_itd)',
    // (column Forecast Net Margin - column ITD Net Margin)
  },
  {
    field: 'etc_subs_cost',
    formula: 'at_comp_plan2_res5_cost-subs_itd',
    //(column Forecast Total Subs Cost Budget - column ITD Subs Costs)
  },
  {
    field: 'etc_odc_cost',
    formula: 'at_comp_plan2_res4_cost-odc_itd',
    // (column Forecast Total ODC Cost Budget - column ITD ODC Costs)odc_itd
  },
  {
    field: 'etc_contingency',
    formula: 'at_comp_plan2_res6_cost',
    //(column Forecast Total Contingency Cost Budget - column ITD Contingency Costs) Pending
  },
  {
    field: 'etc_fringe_cost',
    formula: 'at_comp_plan2_res2_cost-fringe_itd',
    // (column Forecast Total Fringe Cost Budget - column ITD Fringe Costs)
  },
  {
    field: 'etc_overhead_cost',
    formula: 'at_comp_plan2_res3_cost-overhead_itd',
    //(column Forecast Total Overhead Cost Budget - column ITD Overhead Costs)overhead_itd
  },
  {
    field: 'backlog',
    formula: "funding>gr_itd?funding-gr_itd:''",
    // acm_project_snapshot.funding - column Gross Revenue - ITD where Baselined Funding > ITD Revenue
  },
  {
    field: 'backlog_mtd_change',
    formula:
      'backlog-(funding_pp -  (itd_labor_rev_pp + itd_non_labor_rev_pp +itd_event_rev_pp))',
    //Backlog MTD change  = column Backlog - Backlog prior period

    // column Backlog - (acm_project_snapshot.funding_pp -  (acm_project_snapshot.itd_labor_revenue_pp +
    // acm_project_snapshot.itd_non_labor_revenue_pp +
    // acm_project_snapshot.itd_event_revenue_pp))
  },
  {
    field: 'forecast_budget_at_risk',
    formula:
      "at_comp_plan2_revenue>at_comp_plan1_revenue?at_comp_plan2_revenue-at_comp_plan1_revenue:''",
    // column Forecast Revenue Budget - Approved Revenue Budget, don't show negative values
  },
  {
    field: 'ar_reserves',
    formula: '',
    //
  },
  {
    field: 'approved_flag',
    formula: "project_status == 'Approved'  ? 'Y' : 'N'",
    //
  },
  {
    field: 'revenue_at_risk_rar',
    formula: "funding_rar >0 ? 'Y' : 'N'",
  },

  {
    field: 'negative_etc_calc',
    formula:
      'at_comp_plan2_cost-total_cost_itd > 0 ? 0 : (at_comp_plan2_cost-total_cost_itd) * -1',
  },
  // {
  //   field:"biee_calc",
  //   formula:"biee > 0 ? biee : ''"
  // },
  {
    field: 'nm_approved',
    formula: 'gr_approved - total_costs_approved',
  },
  {
    field: 'gain_lost_margin_ytd',
    // formula: "((nm_ytd /nsr_ytd ) -(nm_approved/gr_approved))*gr_ytd",
    //modified as below as per email WB020 - P&L testing result on Sprint01
    formula: '((nm_ytd /gr_ytd ) -(nm_approved/gr_approved))*gr_ytd',
  },
  {
    field: 'gain_lost_margin_mtd',
    // formula: "((nm_ytd /nsr_ytd ) -(nm_approved/gr_approved))*gr_ytd",
    //modified as below as per email WB020 - P&L testing result on Sprint01
    formula: '((nm_mtd /gr_mtd ) -(nm_approved/gr_approved))*gr_mtd',
  },
  {
    field: 'gain_lost_margin_itd',
    // formula: "((nm_itd /nsr_itd ) -(nm_approved/gr_approved)*gr_itd) ",
    //modified as below as per email WB020 - P&L testing result on Sprint01
    formula: '((nm_itd /gr_itd  ) -(nm_approved/gr_approved))*gr_itd',
  },
  {
    field: 'etc_direct_labor_cost',
    formula: '(at_comp_plan2_res1_cost)- (itd_res_1_pp + delta_res_1)',
  }
]
