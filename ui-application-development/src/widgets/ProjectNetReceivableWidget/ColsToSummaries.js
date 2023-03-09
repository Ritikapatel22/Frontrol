const COLUMN_NAMES = [
  "ar_0030_series",
  "ar_3160_series",
  "ar_6190_series",
  "ar_91180_series",
  "ar_over_180_series",
  "retention_series",

  "unbilled_rec_0030_series",
  "unbilled_rec_3160_series",
  "unbilled_rec_6190_series",
  "unbilled_rec_91180_series",
  "unbilled_rec_over_180_series",
  "biee_series"

  // "nr_rec_0030_series",
  // "nr_rec_3160_series",
  // "nr_rec_6190_series",
];

const COLUMN_NAMES_AR_SUMMARY = [
  "ar_0030_series",
  "ar_3160_series",
  "ar_6190_series",
  "ar_91180_series",
  "ar_over_180_series",
  "retention_series",

  // "nr_rec_0030_series",
  // "nr_rec_3160_series",
  // "nr_rec_6190_series",
];

const COLUMN_NAMES_UNBILLED_SUMMARY = [
  "unbilled_rec_0030_series",
  "unbilled_rec_3160_series",
  "unbilled_rec_6190_series",
  "unbilled_rec_91180_series",
  "unbilled_rec_over_180_series",
  "biee_series"
];

const SERIES_INFO = {
  ar_0030_series: {
    label: "Billed AR current", //"Billed AR < 30 Days",
    color: "#00353E",
    group: "Accounts Receivable",
  },
  ar_3160_series: {
    label: "Billed AR 31-60 days",
    color: "#008768",
    group: "Accounts Receivable",
  },
  ar_6190_series: {
    label: "Billed AR 61-90 days",
    color: "#AECC53",
    group: "Accounts Receivable",
  },
  ar_91180_series: {
    label: "Billed AR 91-180 days",
    color: "#FFCE00",
    group: "Accounts Receivable",
  },
  ar_121180_series: {
    label: "Billed AR 121-180 days",
    color: "#FFCE00",
    group: "Accounts Receivable",
  },
  ar_over_180_series: {
    label: "Billed AR >180 days",
    color: "#009A9B",
    group: "Accounts Receivable",
  },
  retention_series: {
    label: "Retention",
    color: "#5F909A", //"#FFCE00"
    group: "Accounts Receivable",
  },
  billedARDaysActuals: {
    label: "Billed AR-Actual",
    color: "#C70C6F",
    group: "Accounts Receivable",
  },

  unbilled_rec_0030_series: {
    label: "Unbilled AR current", //"Billed AR < 30 Days",
    color: "#00353E",
    group: "Net Unbilled",
  },
  unbilled_rec_3160_series: {
    label: "Unbilled AR 31-60 days",
    color: "#008768",
    group: "Net Unbilled",
  },
  unbilled_rec_6190_series: {
    label: "Unbilled AR 61-90 days",
    color: "#AECC53",
    group: "Net Unbilled",
  },
  unbilled_rec_91180_series: {
    label: "Unbilled AR 91-180 days",
    color: "#FFCE00",
    group: "Net Unbilled",
  },
  unbilled_rec_over_180_series: {
    label: "Unbilled AR >180 days",
    color: "#009A9B",
    group: "Net Unbilled",
  },
  biee_series: {
    label: "BIEE",
    color: "#009A9B",
    group: "Net Unbilled",
  },

  // nr_rec_0030_series: {
  //   label: "Accounts Receivable", //"Billed AR < 30 Days",
  //   color: "#00353E",
  //   group: "Net Receviable",
  // },
  // nr_rec_3160_series: {
  //   label: "Net Unbilled", //"Billed AR < 30 Days",
  //   color: "#00353E",
  //   group: "Net Receviable",
  // },
  // nr_rec_6190_series: {
  //   label: "Net Receivables",
  //   color: "#008768",
  //   group: "Net Receviable",
  // },
};

const SERIES_INFO_FOR_SUMMARY = {
  ar_0030_series: {
    label: "Current", //"Billed AR < 30 Days",
    color: "#00353E",
    group: "Accounts Receivable",
  },
  ar_3160_series: {
    label: "31-60 days",
    color: "#008768",
    group: "Accounts Receivable",
  },
  ar_6190_series: {
    label: "61-90 days",
    color: "#AECC53",
    group: "Accounts Receivable",
  },
  ar_91180_series: {
    label: "91-180 days",
    color: "#FFCE00",
    group: "Accounts Receivable",
  },
  ar_121180_series: {
    label: "121-180 days",
    color: "#FFCE00",
    group: "Accounts Receivable",
  },
  ar_over_180_series: {
    label: ">180 days",
    color: "#009A9B",
    group: "Accounts Receivable",
  },
  retention_series: {
    label: "Retention",
    color: "#5F909A", //"#FFCE00"
    group: "Accounts Receivable",
  },
  billedARDaysActuals: {
    label: "AR-Actual",
    color: "#C70C6F",
    group: "Accounts Receivable",
  },

  unbilled_rec_0030_series: {
    label: "Current", //"Billed AR < 30 Days",
    color: "#00353E",
    group: "Net Unbilled",
  },
  unbilled_rec_3160_series: {
    label: "31-60 days",
    color: "#008768",
    group: "Net Unbilled",
  },
  unbilled_rec_6190_series: {
    label: "61-90 days",
    color: "#AECC53",
    group: "Net Unbilled",
  },
  unbilled_rec_91180_series: {
    label: "91-180 days",
    color: "#FFCE00",
    group: "Net Unbilled",
  },
  unbilled_rec_over_180_series: {
    label: ">180 days",
    color: "#009A9B",
    group: "Net Unbilled",
  },
  biee_series: {
    label: "BIEE",
    color: "#009A9B",
    group: "Net Unbilled",
  },
};

const SERIES_INFO_AR_SUMMARY = {
  ar_0030_series: {
    label: "Current", //"Billed AR < 30 Days",
    color: "#00353E",
    group: "Accounts Receivable",
  },
  ar_3160_series: {
    label: "31-60 days",
    color: "#008768",
    group: "Accounts Receivable",
  },
  ar_6190_series: {
    label: "61-90 days",
    color: "#AECC53",
    group: "Accounts Receivable",
  },
  ar_91180_series: {
    label: "91-180 days",
    color: "#FFCE00",
    group: "Accounts Receivable",
  },
  ar_121180_series: {
    label: "121-180 days",
    color: "#FFCE00",
    group: "Accounts Receivable",
  },
  ar_over_180_series: {
    label: ">180 days",
    color: "#009A9B",
    group: "Accounts Receivable",
  },
  retention_series: {
    label: "Retention",
    color: "#5F909A", //"#FFCE00"
    group: "Accounts Receivable",
  },
  billedARDaysActuals: {
    label: "AR-Actual",
    color: "#C70C6F",
    group: "Accounts Receivable",
  },
};

const SERIES_INFO_UNBILLED_SUMMARY = {
  unbilled_rec_0030_series: {
    label: "Current", //"Billed AR < 30 Days",
    color: "#00353E",
    group: "Net Unbilled",
  },
  unbilled_rec_3160_series: {
    label: "31-60 days",
    color: "#008768",
    group: "Net Unbilled",
  },
  unbilled_rec_6190_series: {
    label: "61-90 days",
    color: "#AECC53",
    group: "Net Unbilled",
  },
  unbilled_rec_91180_series: {
    label: "91-180 days",
    color: "#FFCE00",
    group: "Net Unbilled",
  },
  unbilled_rec_over_180_series: {
    label: ">180 days",
    color: "#009A9B",
    group: "Net Unbilled",
  },
  biee_series: {
    label: "BIEE",
    color: "#009A9B",
    group: "Net Unbilled",
  },
  
};

const COLUMN_GROUP_NAME = [
  "bucket1",
  "bucket2",
  "bucket3",
  "bucket4",
  "bucket5",
  "bucket6",
  "bucket7",
  "bucket8",
  "bucket9",
  "bucket10",
  "bucket11",
  "bucket12",
];

const SERIES_INFO_INVOICE_BIll = [
  { type: "Paid" },
  { type: "Billed AR current" },
  { type: "Billed AR 31-60 days" },
  { type: "Billed AR 61-90 days" },
  { type: "Billed AR 91-180 days" },
  { type: "Billed AR >180 days" },
  { type: "Retention" },
  { type: "Unbilled AR current" },
  { type: "Unbilled AR 31-60 days" },
  { type: "Unbilled AR 61-90 days" },
  { type: "Unbilled AR 61-90 days" },
  { type: "Unbilled AR 91-180 days" },
  { type: "Unbilled AR >180 days" },
  { type: "unbilled_rec_total" },
  { type: "BIEE" },
  { type: "retention" },
];

const BILLED_SERIES_INFO = {
  ar_0030_series: {
    label: "Billed AR current", //"Billed AR < 30 Days",
    color: "#00353E",
    group: "Accounts Receivable",
  },
  ar_3160_series: {
    label: "Billed AR 31-60 days",
    color: "#008768",
    group: "Accounts Receivable",
  },
  ar_6190_series: {
    label: "Billed AR 61-90 days",
    color: "#AECC53",
    group: "Accounts Receivable",
  },
  ar_91180_series: {
    label: "Billed AR 91-180 days",
    color: "#FFCE00",
    group: "Accounts Receivable",
  },
  ar_121180_series: {
    label: "Billed AR 121-180 days",
    color: "#FFCE00",
    group: "Accounts Receivable",
  },
  ar_over_180_series: {
    label: "Billed AR >180 days",
    color: "#009A9B",
    group: "Accounts Receivable",
  },
  retention_series: {
    label: "Retention",
    color: "#5F909A", //"#FFCE00"
    group: "Accounts Receivable",
  },
  billedARDaysActuals: {
    label: "Billed AR - Actual",
    color: "#C70C6F",
    group: "Accounts Receivable",
  }   
};

  const UNBILLED_SERIES_INFO = {
    unbilled_rec_0030_series: {
    label: "Unbilled AR current", //"Billed AR < 30 Days",
    color: "#00353E",
    group: "Net Unbilled",
  },
  unbilled_rec_3160_series: {
    label: "Unbilled AR 31-60 days",
    color: "#008768",
    group: "Net Unbilled",
  },
  unbilled_rec_6190_series: {
    label: "Unbilled AR 61-90 days",
    color: "#AECC53",
    group: "Net Unbilled",
  },
  unbilled_rec_91180_series: {
    label: "Unbilled AR 91-180 days",
    color: "#FFCE00",
    group: "Net Unbilled",
  },
  unbilled_rec_over_180_series: {
    label: "Unbilled AR >180 days",
    color: "#009A9B",
    group: "Net Unbilled",
  },
  biee_series: {
    label: "BIEE",
    color: "#5F909A", //"#FFCE00"
    group: "Net Unbilled",
  },

};

export {
  COLUMN_NAMES,
  SERIES_INFO,
  SERIES_INFO_FOR_SUMMARY,
  COLUMN_GROUP_NAME,
  SERIES_INFO_AR_SUMMARY,
  COLUMN_NAMES_AR_SUMMARY,
  COLUMN_NAMES_UNBILLED_SUMMARY,
  SERIES_INFO_UNBILLED_SUMMARY,
  SERIES_INFO_INVOICE_BIll,
  BILLED_SERIES_INFO,
  UNBILLED_SERIES_INFO };
// export default COLUMN_NAMES;
