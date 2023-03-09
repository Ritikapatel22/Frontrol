import { currencyFactory } from "@frontrolinc/pace-ui-framework";

const commitmentsColumnTransform = function (filteredData, type = "table", shouldConvert , currencyColumnName) {

  if(type !== "table" && type !== "charts" && type !== "graph"){
    return []
  }

  const invoiceArray = [];
  filteredData?.map((item) => {
    let poPendingApproval = 0;
    let approvedValue = 0;
    let invoicedValue = 0;
    let remaining = 0;

    let data = item.vendor_name;

    filteredData.map((item) => {
      if (data === item.vendor_name) {
        if (item.approveddate == "null") {
          
        poPendingApproval +=
          (( shouldConvert && currencyColumnName)
          ? currencyFactory.convertCurrency({
              currencyValue: Number(item.original_po_amt_in_func_curr),
              currentCurrency: item[currencyColumnName],
            }) :
          Number(item.original_po_amt_in_func_curr));
        }
        
      approvedValue +=
        ((shouldConvert && currencyColumnName) 
        ? 
        currencyFactory.convertCurrency({
          currencyValue: Number(item.original_po_amt_in_func_curr),
          currentCurrency: item[currencyColumnName],
        }) 
        : 
        Number(item.original_po_amt_in_func_curr));

      invoicedValue +=
        ((shouldConvert && currencyColumnName)
        ? 
        currencyFactory.convertCurrency({
          currencyValue:  Number(item.invoiced_amount_in_func_curr),
          currentCurrency: item[currencyColumnName],
        }) 
        :
        Number(item.invoiced_amount_in_func_curr));

      if(Number(item.original_po_amt_in_func_curr) > 0) {
        remaining += 
        ((shouldConvert && currencyColumnName)
        ? 
        currencyFactory.convertCurrency({
          currencyValue:  (Number(item.original_po_amt_in_func_curr) - Number(item.invoiced_amount_in_func_curr)),
          currentCurrency: item[currencyColumnName],
        }) 
        :
        (Number(item.original_po_amt_in_func_curr) - Number(item.invoiced_amount_in_func_curr)));
      }
    }
  });

    invoiceArray.push({
      suppliername: data,
      bucket1: approvedValue,
      bucket2: invoicedValue,
      bucket3: remaining,
      bucket4: poPendingApproval,
    });
  });
  
  let unique = [];
  let distinct = [];
  for (let i = 0; i < invoiceArray.length; i++) {
    if (!unique[invoiceArray[i].suppliername]) {
      distinct.push({
          suppliername: invoiceArray[i].suppliername,
          bucket1: invoiceArray[i].bucket1,
          bucket2: invoiceArray[i].bucket2,
          bucket3: invoiceArray[i].bucket3,
          bucket4: invoiceArray[i].bucket4,
        });
      unique[invoiceArray[i].suppliername] = true;
    }
  }

  // descending order by bucket1
  let sortedDistinct = distinct.sort((p1, p2) => (p1.bucket1 < p2.bucket1) ? 1 : (p1.bucket1 > p2.bucket1) ? -1 : 0);

  if(type === "table"){
    return distinct;
  }
  
  let sortedAndSummedList = [];
  let others = {
    suppliername: "Others",
    bucket1: 0,
    bucket2: 0,
    bucket3: 0,
    bucket4: 0
  }

  for (let i = 0; i < sortedDistinct.length; i++) {
    if(i < 10){
      sortedAndSummedList.push(sortedDistinct[i])
    }else{
      others.y += sortedDistinct[i].y
      others.bucket1 += sortedDistinct[i].bucket1
      others.bucket2 += sortedDistinct[i].bucket2
      others.bucket3 += sortedDistinct[i].bucket3
      others.bucket4 += sortedDistinct[i].bucket4
    }
  }

  if(distinct.length >= 10){
    sortedAndSummedList.push(others);
  }

  if(type === "charts"){
    return sortedAndSummedList;
  }

  let summarizedTotal = [];
  
  for (let i = 0; i < distinct.length; i++) {
    Object.entries(distinct[i]).forEach(([key, value]) => {
      if (key !== "suppliername" && key !== "y") {
        if (!summarizedTotal[key]) {
          summarizedTotal[key] = 0 + value;
        } else {
          summarizedTotal[key] = summarizedTotal[key] + value;
        }
      } else if (key == "suppliername") {
        summarizedTotal[key] = "Total";
      }
    });
  }

  if (type == "graph") {	 
    return summarizedTotal;	    
  }
      
};

export {
  commitmentsColumnTransform
}
  