const COLUMN_NAMES = [
                        "unbilled_rec_0030_series","unbilled_rec_3160_series", "unbilled_rec_6190_series",
                        "unbilled_rec_91180_series", "unbilled_rec_over_180_series","biee_series" 
                        ];

const SERIES_INFO = {
    "unbilled_rec_0030_series": {
        "label" : "Unbilled AR current",//"Billed AR < 30 Days",
        "color": "#00353E",
        "group": 'Net Unbilled'
    },
    "unbilled_rec_3160_series": {
        "label" : "Unbilled AR 31-60 days",
        "color": "#008768",
        "group": 'Net Unbilled'
    },
    "unbilled_rec_6190_series": {
        "label" : "Unbilled AR 61-90 days",
        "color": "#AECC53",
        "group": 'Net Unbilled'
    },
    "unbilled_rec_91180_series": {
        "label" : "Unbilled AR 91-180 days",
        "color": "#FFCE00",
        "group": 'Net Unbilled'
    },
    "unbilled_rec_over_180_series": {
        "label" : "Unbilled AR >180 days",
        "color": "#009A9B",
        "group": 'Net Unbilled'
    },
    "biee_series": {
        "label" : "BIEE",
        "color": "#5F909A", //"#FFCE00"
        "group": 'Net Unbilled'
    },
}


  export {
    COLUMN_NAMES,
    SERIES_INFO
  } ;


  const SERIES_INFO_INVOICE_Bill = [
    // { type: "Paid" },
    // { type: "Unbilled AR Current" },
    // { type: "Unbilled AR 31 - 60 Days" },
    // { type: "Unbilled AR 61 - 90 Days" },
    // { type: "Unbilled AR 61 - 90 Days" },
    // { type: "Unbilled AR 91 - 180 Days" },
    // { type: "Unbilled AR > 180 Days" },
    // { type: "unbilled_rec_total" },
    // { type: "BIEE" },
    // { type: "retention" },
    // { type: "Retention" },
  ];
  export { SERIES_INFO_INVOICE_Bill };
  
// export default COLUMN_NAMES;