const getVendorChartData = (data) => {
  data = [...data].sort((p1, p2) => (p1.totalamount < p2.totalamount) ? 1 : (p1.totalamount > p2.totalamount) ? -1 : 0);

  let sortedAndSummedList = [];
  let others = {
    suppliername: "Others",
    bucket1: 0,
    bucket2: 0,
    bucket3: 0,
    bucket4: 0,
    bucket5: 0
  }

  for (let i = 0; i < data.length; i++) {
    if (i < 10) {
      sortedAndSummedList.push({
        suppliername : data[i].supplier_name,
        bucket1 : parseFloat(data[i].paidamount),
        bucket2 : parseFloat(data[i].pendingamount),
        bucket3 : parseFloat(data[i].notapproved),
        bucket4 : parseFloat(data[i].totalamount),
        bucket5 : parseFloat(data[i].totalinvoice)
      })
    } else {
      others.bucket1 += parseFloat(data[i].paidamount)
      others.bucket2 += parseFloat(data[i].pendingamount)
      others.bucket3 += parseFloat(data[i].notapproved)
      others.bucket4 += parseFloat(data[i].totalamount)
      others.bucket5 += parseFloat(data[i].totalinvoice)
    }
  }

  if (data.length >= 10) {
    sortedAndSummedList.push(others);
  }
  return sortedAndSummedList
}

const getVendorGraphData = (data) => {

  let summarizedTotal = [];
  data.map((row) => {
    Object.entries(row).forEach(([key, value]) => {
      if (key === "paidamount" || key === "pendingamount" || key === "totalamount") {
        if (!summarizedTotal[key]) {
          summarizedTotal[key] = parseFloat(value);
        } else {
          summarizedTotal[key] = summarizedTotal[key] + parseFloat(value);
        }
      }
    })
  })
  return summarizedTotal;
}
export {
  getVendorChartData,
  getVendorGraphData
}
