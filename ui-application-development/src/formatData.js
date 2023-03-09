import { currencyFactory, userSettingsFactory } from "@frontrolinc/pace-ui-framework";

const applyLocalNumberFormat = (val, fraction) =>{
  const userNumberFormat = userSettingsFactory.numberFormat?userSettingsFactory.numberFormat: "decimal_period";
  const numberFormatRegion = (userNumberFormat == "decimal_period"? "en-US": "de-DE");

  // return new Intl.NumberFormat(numberFormatRegion, {style: "decimal"},{minimumFractionDigits: fraction, maximumFractionDigits: fraction}).format(val );
  return new Intl.NumberFormat(numberFormatRegion,{minimumFractionDigits: fraction, maximumFractionDigits: fraction}).format(val );
};

const formatNumber = (params) => {
  // if ((params.value == 0) || (isNaN(parseFloat(params.value))))  return '-';
  // if (params.value == 0) return '-';

  try {
    let val = parseFloat(params.value);
    if (val == 0) return "-";
    // if (val == "-Infinity") return "";
    // if (val == "Infinity") return "";

    if (!val) return "";
    if (val < 0) {
      return (
        // "(" + new Intl.NumberFormat("en-US", {minimumFractionDigits: 0, maximumFractionDigits: 0}).format(val * -1) + ")"
        "(" + applyLocalNumberFormat(val * -1, 0) +")"
      );
    } else {
      // return new Intl.NumberFormat("en-US", {minimumFractionDigits: 0, maximumFractionDigits: 0}).format(val);
      return applyLocalNumberFormat(val, 0)
    }
  } catch (e) {
    return "";
  }
};

const formatNumber2Decimal = (params) => {
  // if ((params.value == 0) || (isNaN(parseFloat(params.value))))  return '-';
  // if (params.value == 0) return '-';

  try {
    let val =params.value =='n/a' ? "n/a":parseFloat(params.value)
    if (val == 0) return "-";
    // if (val == "-Infinity") return "";
    // if (val == "Infinity") return "";
    if (val == "n/a") return "n/a";
    if (!val) return "";
    if (val < 0) {
      return (
        // "(" + new Intl.NumberFormat("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(val * -1) + ")"
        "(" + applyLocalNumberFormat(val * -1, 2) +")"
      );
    } else {
      // return new Intl.NumberFormat("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(val);
      return applyLocalNumberFormat(val, 2)
    }
  } catch (e) {
    return "";
  }
};

const formatNumber1Decimal = (params) => {
  // if ((params.value == 0) || (isNaN(parseFloat(params.value))))  return '-';
  // if (params.value == 0) return '-';

  try {
     let val =params.value =='n/a' ? "n/a":parseFloat(params.value)
    if (val == 0) return "-";
    // if (val == "-Infinity") return "";
    // if (val == "Infinity") return "";
    if (val == "n/a") return "n/a";


    if (!val) return "";
    if (val < 0) {
      return (
        // "(" + new Intl.NumberFormat("en-US",{minimumFractionDigits: 1, maximumFractionDigits: 1}).format(val * -1) + ")"
        "(" + applyLocalNumberFormat(val * -1, 1) +")"
      );
    } else {
      // return new Intl.NumberFormat("en-US",{minimumFractionDigits: 1, maximumFractionDigits: 1}).format(val);
      return applyLocalNumberFormat(val, 1)
    }
  } catch (e) {
    return "";
  }
};

const fractionConfig = {
  QAR: 3,
  BHD: 3,
  EGP: 3,
  JOD: 3,
  KWD: 3,
  LYD: 3,
  OMR: 3,
  TND: 3,
};

const formatCurrency = (params) => {
  // if ((params.value == 0) || (isNaN(parseFloat(params.value))))  return '-';
  // if (params.value == 0) return '-';
  const currentCurrency = currencyFactory.convertTo;
  const shouldConvert = currencyFactory.shouldConvert;
  let fraction = 2;

  if (
    shouldConvert &&
    currentCurrency &&
    fractionConfig[currentCurrency] != undefined &&
    typeof fractionConfig[currentCurrency] === "number"
  ) {
    fraction = fractionConfig[currentCurrency];
  }
  if (
    !shouldConvert &&
    params.colDef?.currencyColumnName &&
    params.data[params.colDef.currencyColumnName] &&
    fractionConfig[params.data[params.colDef.currencyColumnName]] != undefined
  ) {
    fraction = fractionConfig[params.data[params.colDef.currencyColumnName]];
  }

  currencyFactory.setFractionValue(fraction)

  try {
    let val =params.value =='n/a' ? "n/a":parseFloat(params.value)
    if (params.value === 0) {
      val = 0;
    }
    if (val == 0) return "-";
    if (val == "n/a") return "n/a";
    // if (val == "-Infinity") return "";
    // if (val == "Infinity") return "";

    if (!val) return "";
    if (val < 0) {
      return (
        // "(" +
        //   new Intl.NumberFormat("en-US", {
        //   style: "decimal",
        //   minimumFractionDigits: fraction,
        //   maximumFractionDigits: fraction,
        // }).format(val * -1) +
        // ")"

        "(" + applyLocalNumberFormat(val * -1, fraction) +")"
      );
    } else {
      return (
      //   new Intl.NumberFormat("en-US", {
      //   style: "decimal",
      //   minimumFractionDigits: fraction,
      //   maximumFractionDigits: fraction,
      // }).format(val)

      applyLocalNumberFormat(val, fraction)
      
      );
    }
  } catch (e) {
    return "";
  }
};

const formatDate = (params) => {
  const dateFormat = userSettingsFactory.dateFormat;
  //mm-dd-yyyy
  // console.log("dateFormat", dateFormat);
  try {
    if (params.value !== null) {
      let y, m, d;
      if (typeof params === "object") {
        (y = params.value.substr(0, 4)),
          (m = params.value.substr(5, 2)),
          (d = params.value.substr(8, 2));
      } else {
        (y = params.substr(0, 4)),
          (m = params.substr(5, 2)),
          (d = params.substr(8, 2));
      }

      let dt = new Date(y, m - 1, d);

      let yy = new Intl.DateTimeFormat("en", { year: "2-digit" }).format(dt);
      let yyyy = new Intl.DateTimeFormat("en", { year: "numeric" }).format(dt);
      let mm = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(dt);
      let mmm = new Intl.DateTimeFormat("en", { month: "short" }).format(dt);      
      let dd = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(dt);
      if(dateFormat == null || dateFormat == '' || dateFormat == 'dd-mmm-yy') return `${dd}-${mmm}-${yy}`;
      if(dateFormat == 'mm/dd/yyyy') return `${mm}/${dd}/${yyyy}`;             
      if(dateFormat == 'dd/mm/yyyy') return `${dd}/${mm}/${yyyy}`;

    } else {
      return "";
    }
  } catch (e) {
    return "";
  }
};

const formatDateMonth = (params) => {
  try {
    if (params.value !== null) {
      let y, m, d;
      if (typeof params === "object") {
        (y = params.value.substr(0, 4)),
          (m = params.value.substr(5, 2)),
          (d = params.value.substr(8, 2));
      } else {
        (y = params.substr(0, 4)),
          (m = params.substr(5, 2)),
          (d = params.substr(8, 2));
      }

      let dt = new Date(y, m - 1, d);

      let ye = new Intl.DateTimeFormat("en", { year: "2-digit" }).format(dt);
      let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(dt);
      let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(dt);
      return `${da}-${mo}`;
    } else {
      return "";
    }
  } catch (e) {
    return "";
  }
};

const formatPercentage = (params) => {
  try {
    let val = parseFloat(params.value);
    // if (val == "-Infinity") return "";
    // if (val == "Infinity") return "";
    if (val == 0) return "-";
    if (!val) return "";
    val = val*100;
    if (val< 0) {
     return (
        // "(" + new Intl.NumberFormat("en-US", {minimumFractionDigits: 1, maximumFractionDigits: 1}).format(val * -1) + '%' +")"
        "(" + applyLocalNumberFormat(val * -1, 1) + '%' +")"
      );
    } else {
      // return new Intl.NumberFormat("en-US", {minimumFractionDigits: 1, maximumFractionDigits: 1}).format(val) + '%' ;
      return applyLocalNumberFormat(val, 1) + '%' ;
    }
  } catch (e) {
    return "";
  }
};

const formatDynamicColumn = (params) => {
  if (params.data.colType == "percentageColumn") {
    return formatPercentage(params);
  } else if (params.data.colType == "currencyColumn") {
    return formatCurrency(params);
  } else if (params.data.colType == "currencyConversionColumn") {
    return formatCurrency(params); 
  } else if (params.data.colType == "numberColumn") {
    return formatNumber(params);
  } else if (params.data.colType == "number1DecimalColumn") {
    return formatNumber1Decimal(params);
  } else if (params.data.colType == "number2DecimalColumn") {
    return formatNumber2Decimal(params);
  }else if (params.data.colType == "dateFormat") {
    return formatDate(params);
  }
};

const cellStyleDynamicColumn = (params) => {
  if(params.data.colType !== "dateFormat") {
    if (parseFloat(params.value) < 0) {
      //mark cells as red
      return { color: "red", textAlign: "right" };
    }
  }
  return { textAlign: "right" };
  // if (params.data.colType == 'formatPercentage'){
  //   return { textAlign: "right" };
  // }else{
  //   return { textAlign: "right" };
  // }
};


const numberErrorValueGetter = (params)=> {   
  try{
    if(!(params.data && params.colDef.field && params.data[params.colDef.field]) && params.data[params.colDef.field] != 0) return null
    if (params.data[params.colDef.field] == 'Infinity' || params.data[params.colDef.field] == '-Infinity' ||
        Number.isNaN(params.data[params.colDef.field])) {
      return null;
    } else {
      return params.data[params.colDef.field];
    }
  } catch(e){
    console.log(e);
  }
} 


export {
  formatNumber,
  formatNumber1Decimal,
  formatNumber2Decimal,
  formatDate,
  formatPercentage,
  formatCurrency,
  formatDynamicColumn,
  cellStyleDynamicColumn,
  formatDateMonth,
  numberErrorValueGetter,
};
