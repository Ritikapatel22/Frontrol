const SERIES_INFO_INVOICE = [
  { type: "Paid", coulmnRefer: "cash_apps_itd" },
  { type: "Billed AR current", coulmnRefer: "ar_0030" },
  { type: "Billed AR 31-60 days", coulmnRefer: "ar_3160" },
  { type: "Billed AR 61-90 days", coulmnRefer: "ar_6190" },
  { type: "Billed AR 91-180 days", coulmnRefer: "ar_91180" },
  { type: "Billed AR >180 days", coulmnRefer: "ar_over_180" },
  { type: "Retention", coulmnRefer: "retention" },
];
export { SERIES_INFO_INVOICE };

const SERIES_INFO_INVOICE_Bill = [
  { type: "Paid" },
  { type: "Billed AR current" },
  { type: "Billed AR 31-60 days" },
  { type: "Billed AR 61-90 days" },
  { type: "Billed AR 91-180 days" },
  { type: "Billed AR >180 days" },
  { type: "Retention" },
];
export { SERIES_INFO_INVOICE_Bill };