const COLUMN_NAMES = ["ar_0030_series","ar_3160_series","ar_6190_series","ar_91180_series",
                        "ar_over_180_series","retention_series"
                        ];

const SERIES_INFO = {
    "ar_0030_series": {
        "label" : "Billed AR current",//"Billed AR < 30 Days",
        "color": "#00353E"
    },
    "ar_3160_series": {
        "label" : "Billed AR 31-60",
        "color": "#008768"
    },
    "ar_6190_series": {
        "label" : "Billed AR 61-90",
        "color": "#AECC53"
    },
    "ar_91180_series": {
        "label" : "Billed AR 91-180",
        "color": "#FFCE00"
    },
    "ar_121180_series": {
        "label" : "Billed AR 121-180",
        "color": "#FFCE00"
    },
    "ar_over_180_series": {
        "label" : "Billed AR >180",
        "color": "#009A9B"
    },
    // "ar_181360_series": {
    //     "label" : "Billed 181 - 360 Days",
    //     "color": "#FFCE00"
    // },
    // "ar_over_360_series": {
    //     "label" : "Billed AR > 360 Days",
    //     "color": "#E52013"
    // },
    "retention_series": {
        "label" : "Retention",
        "color": "#5F909A" //"#FFCE00"
    },
    "billedARDaysActuals": {
        "label" : "Billed AR-Actual",
        "color": "#C70C6F"
    },
}


  
  export {
    COLUMN_NAMES,
    SERIES_INFO
  } ;

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
// export default COLUMN_NAMES;