const SERIES_INFO_INVOICE = [
  { type: "Paid", coulmnRefer: "cash_apps_itd" },
  { type: "Billed AR current", coulmnRefer: "ar_0030" },
  { type: "Billed AR 31-60", coulmnRefer: "ar_3160" },
  { type: "Billed AR 61-90", coulmnRefer: "ar_6190" },
  { type: "Billed AR 91-180", coulmnRefer: "ar_121180" },
  { type: "Billed AR >180", coulmnRefer: "ar_180" },
  { type: "Retention", coulmnRefer: "retention" },
];
export { SERIES_INFO_INVOICE };

const SERIES_INFO_INVOICE_Bill = [
  { type: "Paid" },
  { type: "Billed AR current" },
  { type: "Billed AR 31-60" },
  { type: "Billed AR 61-90" },
  { type: "Billed AR 91-180" },
  { type: "Billed AR >180" },
  { type: "Retention" },
];
export { SERIES_INFO_INVOICE_Bill };