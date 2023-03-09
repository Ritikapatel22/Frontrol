import testData from "./Data.json";
import { PROJECT_DRILLDOWN } from "../src/ColsToSummaries";
import { SERIES_INFO_INVOICE } from "./widgets/BilledARWidget/ColToinvoice";
import { COLUMN_GROUP_NAME } from "./widgets/NetReceivableWidget/ColsToSummaries";
import { generatePath } from "react-router";
import { currencyFactory } from "@frontrolinc/pace-ui-framework";
import { rootPath } from "./config";
import { ResourceTypes } from "./components/Reportpage/TaskSummaryReport";
import { t } from 'i18next';

const entireData = testData.map((jsonRawData) => {
  return jsonRawData;
});

const jsonData = function () {
  return entireData;
};

const isKeyExist = function (data, searchKey) {
  // if (typeof data !== "undefined" && Object.keys(data).length !== 0) {
    if (data && typeof data.find(key => key == searchKey) !== "undefined"){
      return true;
    }
  // }
  return false;
};

const getSummaryData = function (
  baseData,
  colsToSummaries,
  filters = 0,
  shouldConvert,
  currencyColumnName,
  negativeBIEE = false,
  currencyExclusionCols
) {
  const portfolioSummarieObj = {};
  if (baseData && Object.keys(baseData).length) {
    colsToSummaries.forEach((key) => {
      portfolioSummarieObj[key] = baseData.reduce((sum, records) => {
        const series = records[key] ?? [];
        if (Array.isArray(records[key])) {
          return series.map((item, index) => {
            return (
              parseFloat(
                shouldConvert && !isKeyExist(currencyExclusionCols, key) && currencyColumnName
                  ? currencyFactory.convertCurrency({
                      // currencyValue: item,
                      currencyValue: item == null? 0 :item,
                      currentCurrency: records[currencyColumnName],
                    })
                  : item == null? 0 :item
              ) + (sum[index] ?? 0)
            );
          });
        } else {
          return (
            parseFloat(
              shouldConvert && !isKeyExist(currencyExclusionCols, key)
                ? currencyFactory.convertCurrency({
                    currencyValue: records[key] == null? 0 :records[key],
                    currentCurrency: records.project_currency_code,
                  })
                : records[key] == null? 0 :records[key]
            ) + (isNaN(sum) || sum.length === 0 ? 0 : sum)
          );
        }
      }, []);
    });
  }
  // return portfolioSummarieObj
  let flipArrayobjData = {};

  for (let i = 0; i < Object.keys(portfolioSummarieObj).length; i++) {
    let keyName = Object.keys(portfolioSummarieObj)[i];
    if (Array.isArray(portfolioSummarieObj[keyName])) {
      portfolioSummarieObj[keyName] =
        Object.values(portfolioSummarieObj)[i].reverse();
    } else {
      portfolioSummarieObj[keyName] = Object.values(portfolioSummarieObj)[i];
    }
  }
  if(negativeBIEE){
    for(let key in portfolioSummarieObj){
      if (key == 'biee_series'){
          for(let value in portfolioSummarieObj[key]){
              if(portfolioSummarieObj[key][value]>0)
              portfolioSummarieObj[key][value] = Math.abs(portfolioSummarieObj[key][value]) * -1
          }
      }
    }
  }
  return portfolioSummarieObj;
};

const getTableData = function (summariedData, column_info) {
  if (
    typeof summariedData !== "undefined" &&
    Object.keys(summariedData).length !== 0
  ) {
    const formatted = Object.keys(summariedData).map((aging) => {
      const sumBuckets = {};
      if (Array.isArray(summariedData[aging])) {
        summariedData[aging].forEach((sum, index) => {
          sumBuckets[`bucket${index + 1}`] = sum;
        });
      }
      const lableName = column_info[aging].label;
      const groupName =
        column_info[aging].group !== "undefined"
          ? column_info[aging].group
          : "";
      const hierarchy =
        column_info[aging].group !== "undefined"
          ? [t("Net receivables"), column_info[aging].group, lableName]
          : "";
      return {
        hierarchy: hierarchy,
        aging: lableName,
        group: groupName,
        ...sumBuckets,
      };
    });
    // formatted.push({"aging":"Accounts Receivable","group":"Net Receviables"},{"aging":"Net unbilled","group":"Net Receviables"},
    // {"aging":"Net Receviables","group":"Net Receviables"})
    return formatted;
  } else {
    return [];
  }
};
// 3 label
//column_info---   //Accounts Receivable, Net unbilled, Net Receivable
// summariedData

const getSummaryTableData = function (
  summariedData,
  column_info,
  label = [],
  netReceivables = false
) {
  if (
    typeof summariedData !== "undefined" &&
    Object.keys(summariedData).length !== 0
  ) {
    const formatted = Object.keys(summariedData).map((aging) => {
      const sumBuckets = {};
      let columnData = 0;
      if (Array.isArray(summariedData[aging])) {
        // summariedData[aging].forEach((sum, index) => {
        columnData = summariedData[aging][11] + columnData; // to show the last bucket
        // })

        //ABOVE CODE IS COMMENTED AS WE ARE ONLY SHOWING THE CURRENT DATA IN SUMMARY TAB
        //AND DATA IN BUCKET 0 IS FOR CURRENT MONTH
      } else {
        columnData = summariedData[aging];
      }
      column_info[aging].group !== undefined &&
      label !== undefined &&
      label.length !== 0
        ? (sumBuckets[column_info[aging].group] = columnData)
        : column_info[aging].group !== undefined && netReceivables == true
        ? (sumBuckets["Net receivables"] = columnData)
        : (sumBuckets["balance"] = columnData); // sumBuckets[column_info[aging].group] = columnData;
      const lableName = column_info[aging].label;
      return {
        aging: lableName,
        ...sumBuckets,
      };
    });
    return formatted;
  } else {
    return [];
  }
};

const getSummaryData1 = function (baseData, colsToSummaries, filters = 0) {
  // filters: [
  //     {name, operator, value}
  var formatted = [];
  var indexOfKey = -1;
  var portfolioSummarieObj = {};
  for (let i = 0; i < baseData.length; i++) {
    for (let j = 0; j < colsToSummaries.length; j++) {
      if (baseData[i].hasOwnProperty(colsToSummaries[j])) {
        //json element has the entry seeded in the ColsList to summaries
        indexOfKey = Object.keys(baseData[i]).indexOf(colsToSummaries[j]);

        // we assume the key of json is same summariesCol
        var cols = colsToSummaries;
        if (formatted.length === 0 || formatted.length === j) {
          portfolioSummarieObj[cols[j]] = Object.values(baseData[i])[
            indexOfKey
          ];

          //formatted.push(portfolioSummarieObj)
        } else {
          for (const [key, value] of Object.entries(formatted[j])) {
            for (let k = 0; k < formatted[j][`${key}`].length; k++) {
              formatted[j][`${key}`][k] =
                formatted[j][`${key}`][k] + baseData[i][`${key}`][k];
            }
          }
        }
      }
    }
  }
  return formatted;
};

const invoiceData = function (
  filteredData,
  type,
  shouldConvert,
  currencyColumnName
) {
  const invoiceArray = [];
  SERIES_INFO_INVOICE.map((item) => {
    let totalAmount = 0;
    filteredData.map((balance, key) => {
      totalAmount +=
        shouldConvert && currencyColumnName
          ? currencyFactory.convertCurrency({
              currencyValue:
                filteredData[key][item.coulmnRefer] != undefined &&
                filteredData[key][item.coulmnRefer],
              currentCurrency: balance[currencyColumnName],
            })
          : filteredData[key][item.coulmnRefer] != undefined &&
            filteredData[key][item.coulmnRefer];
    });
    if (type === "invoiceTable") {
      invoiceArray.push({ status: item.type, amount: totalAmount });
    } else {
      invoiceArray.push({
        name: item.type,
        y: totalAmount < 0 ? totalAmount.toFixed(0) * -1 : totalAmount,
        x: totalAmount < 0 ? false : true,
      });
    }
  });
  return invoiceArray;
};

const netReceivables = function (summarizedDataforTable, group, rowType) {
  var count = 0;
  var netReceivables = [];
  var result = [];
  if (
    summarizedDataforTable.length > 0 &&
    summarizedDataforTable != undefined
  ) {
    result = summarizedDataforTable.filter((val, index) => {
      return val.group == group;
    });
    COLUMN_GROUP_NAME.forEach((item, key) => {
      count = 0;
      result.filter((data, i) => {
        if (data.aging !== "Retention") {
          count = count + (typeof data[item] == "undefined" ? 0 : data[item]);
        }
      });

      netReceivables[[item]] = count;
    });

    netReceivables["group"] = rowType;
    netReceivables["aging"] = group;
    return netReceivables;
  }
};

const sumofallegends = function (data) {
  let count = 0;
  data.map((value) => {
    if (value.name != "Retention" && value.name != "Payment received") {
      count += value.y;
    }
  });
  return count;
};

const paidvalue = function (data) {
  let count = 0;
  data.map((value) => {
    if (value.name == "Payment received") {
      count += value.y;
    }
  });
  return count;
};

const itdCostvalue = function (data, shouldConvert) {
  let count = 0;
  if (
    typeof summariedData !== "undefined" &&
    Object.keys(summariedData).length !== 0
  ) {
    data.map((value) => {
      count += value.total_cost_itd;
    });
    return parseFloat(
      shouldConvert
        ? currencyFactory.convertCurrency({
            currencyValue: count,
            currentCurrency: data[0].project_currency_code,
          })
        : count
    );
  } else {
    return [];
  }
};
const itdRevenuevalue = function (data, shouldConvert) {
  let count = 0;
  if (
    typeof summariedData !== "undefined" &&
    Object.keys(summariedData).length !== 0
  ) {
    data.map((value) => {
      count += value.gr_itd;
    });
    return parseFloat(
      shouldConvert
        ? currencyFactory.convertCurrency({
            currencyValue: count,
            currentCurrency: data[0].project_currency_code,
          })
        : count
    );
  } else {
    return [];
  }
};
const gmNsrvalue =  function (data) {
  var count = 0
  var gm_itd = 0;
  var nsr_itd = 0;

  data.map((value) => {
     gm_itd += (value.itd_labor_rev_pp +value.itd_non_labor_rev_pp + value.itd_event_rev_pp + value.delta_labor_rev +value.delta_non_labor_rev + value.delta_event_rev) -
     (value.itd_res_5_pp +  value.delta_res_5 +  value.itd_res_4_pp + value.delta_res_4 + value.itd_res_1_pp + value.delta_res_1 + value.itd_res_2_pp + value.delta_res_2);
    nsr_itd += value.nsr_itd
  });
  count = (gm_itd==0 || nsr_itd == 0)?0:(gm_itd /nsr_itd);
  // count = (gm_itd /nsr_itd)*100
  return count;
};

const outstandingWorkflow = function (filteredData, type) {
  const invoiceArray = [];

  const workflowTypes = [
    { workflow_type: "Project Approval" },
    { workflow_type: "EAC Approval" },
  ];

  for (let item of workflowTypes) {
    let count = 0;
    let data = item.workflow_type;
    filteredData &&
      filteredData.map((item) => {
        if (
          item?.workflow_type &&
          data.toLowerCase() === item.workflow_type.toLowerCase()
        ) {
          count = count + 1;
        }
      });
    if (data) {
      invoiceArray.push({ name: data, y: count });
    }
  }

  let unique = [];
  let distinct = [];
  for (let i = 0; i < invoiceArray.length; i++) {
    if (!unique[invoiceArray[i].name]) {
      distinct.push({ name: invoiceArray[i].name, y: invoiceArray[i].y });
      unique[invoiceArray[i].name] = 1;
    }
  }
  return distinct;
};

const projectDrilldown = (e, navigate) => {
  if (e.isOpenInNewTab) {
    const rowKey = e.data.project_id;
    let url = generatePath("/project/:id", {
      id: rowKey,
    });
    const baseName = rootPath ? rootPath.replace(/\/$/, "") : "";

    url = baseName + url;
    window.open(url, "_blank");
  } else if (
    e.isSkipColDefCheck ||
    PROJECT_DRILLDOWN.find(
      (item) => e.colDef.field.toLowerCase() === item.type.toLowerCase()
    )
  ) {
    navigate(`/project/${e.data.project_id}`);
  }
};

const gridData = (data, formula) => {
  let mainData = JSON.parse(JSON.stringify(formula));
  mainData.map((value) => {
    Object.keys(value).map((y) => {
      Object.keys(data[0]).map((x) => {
        if (x == value[y]) {
          value[y] = data[0][x];
        }
      });
    });
  });
  return mainData;
};

const filterDistinctCol = function (filteredData, type, select) {
  //{ name: "company1", bucket1: 16000, bucket2: 0, bucket3: 16000 }
  const invoiceArray = [];

  if (type == "commitments") {
    filteredData.map((item) => {
      var poPendingApproval = 0;
      var approvedValue = 0;
      var invoicedValue = 0;
      var remaning = 0;

      var data = item.suppliername;
      filteredData.map((item) => {
        if (data === item.suppliername) {
          if (item.approveddate == "null") {
            poPendingApproval = poPendingApproval + item.povaluepfc;
          }
          approvedValue = approvedValue + item.povaluepfc;
          invoicedValue = invoicedValue + item.invoicedvaluepfc;
          remaning = remaning + (item.povaluepfc - item.invoicedvaluepfc);
        }
      });
      invoiceArray.push({
        suppliername: data,
        bucket1: approvedValue,
        bucket2: invoicedValue,
        bucket3: remaning,
        bucket4: poPendingApproval,
      });
    });
  } else {
    filteredData.map((item) => {
      var totalAmount = 0;
      var totalInvoice = 0;
      var paidAmount = 0;
      var pendingAmount = 0;
      var notApproved = 0;
      var data = item.suppliername;
      filteredData.map((item) => {
        if (data === item.suppliername) {
          if (item.paymentstatus === "Paid") {
            paidAmount = paidAmount + item.pfcvaluepretax;
          } else if (item.paymentstatus === "Pending") {
            pendingAmount = pendingAmount + item.pfcvaluepretax;
          } else if (item.paymentstatus === "Unapproved") {
            notApproved = notApproved + item.pfcvaluepretax;
          }
          totalAmount = paidAmount + pendingAmount;
          totalInvoice = totalAmount + notApproved;
        }
      });
      invoiceArray.push({
        suppliername: data,
        y: totalAmount,
        bucket1: paidAmount,
        bucket2: pendingAmount,
        bucket3: notApproved,
        bucket4: totalAmount,
        bucket5: totalInvoice,
      });
    });
  }

  var unique = [];
  var distinct = [];
  for (let i = 0; i < invoiceArray.length; i++) {
    if (!unique[invoiceArray[i].suppliername]) {
      if (type == "commitments") {
        distinct.push({
          suppliername: invoiceArray[i].suppliername,
          bucket1: invoiceArray[i].bucket1,
          bucket2: invoiceArray[i].bucket2,
          bucket3: invoiceArray[i].bucket3,
          bucket4: invoiceArray[i].bucket4,
        });
      } else {
        distinct.push({
          suppliername: invoiceArray[i].suppliername,
          y: invoiceArray[i].y,
          bucket1: invoiceArray[i].bucket1,
          bucket2: invoiceArray[i].bucket2,
          bucket3: invoiceArray[i].bucket3,
          bucket4: invoiceArray[i].bucket4,
          bucket5: invoiceArray[i].bucket5,
        });
      }
      unique[invoiceArray[i].suppliername] = 1;
    }
  }
  let summarizedTotal = [];

  for (var i = 0; i < distinct.length; i++) {
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

  if (select == "commitment_graph") {
    return summarizedTotal;
  }

  distinct.push(summarizedTotal);
  return distinct;
};

const populateHierarchyCall = function (data) {
  // let projData = data;

  let proj_id = 0;
  let project_numName = "";
  let hierarchyData = [];
  const transposedProjData = data.map((item) => {
    if (item.row_type == "P" || item.wbs_level == 0) {
      proj_id = item.project_id;
      project_numName = item.project_number + " (" + item.project_name + ")";

      return {
        hierarchy: [item.project_number + " (" + item.project_name + ")"],
        ...item,
      };
      // } else if (item.row_type == 'R' && item.project_id == proj_id) {  //this is commented as row_type can also have XP
    } else if (item.project_id == proj_id) {
      hierarchyData = [];
      hierarchyData.push(project_numName);
      hierarchyData.push(item.resource_name);
      return {
        hierarchy: hierarchyData,
        ...item,
      };
    }
  });
  return transposedProjData;
};

const populateProjWeekHierarchy = function (data) {
  let projData = data;

  let project_numName = "";

  let hierarchy_data = [];
  let hierarchy_TaskData = [];
  let resourceExist = false;
  let taskWbsLevel = 0;
  const transposedProjData = projData.map((item) => {
    if (item.row_type == "P" || item.row_type == 0) {
      hierarchy_data.push("Project Level");
      return {
        hierarchy: ["Project Level"],
        ...item,
      };
    } else if (
      item.row_type == "T" ||
      (typeof item.wbs_level !== "undefined" && item.wbs_level !== 0)
    ) {
      hierarchy_TaskData = [];
      if (resourceExist) {
        resourceExist = false;
        // hierarchy_data.pop(hierarchy_data.length - item.wbs_level)
        // hierarchy_data.splice(hierarchy_data.length - item.wbs_level, hierarchy_data.length - item.wbs_level);
        hierarchy_data.splice(
          0 + item.wbs_level,
          hierarchy_data.length - item.wbs_level
        );
      }

      if (taskWbsLevel < item.wbs_level) {
        taskWbsLevel = item.wbs_level;
      } else if (taskWbsLevel >= item.wbs_level) {
        taskWbsLevel = item.wbs_level;
        // hierarchy_data.splice(0 + item.wbs_level, hierarchy_data.length - item.wbs_level);
        hierarchy_data.splice(
          0 + item.wbs_level,
          hierarchy_data.length - item.wbs_level
        );
      }

      for (let j = 0; j < hierarchy_data.length; j++) {
        hierarchy_TaskData.push(hierarchy_data[j]);
      }
      hierarchy_data.push(item.task_number + " (" + item.task_name + ")");
      hierarchy_TaskData.push(item.task_number + " (" + item.task_name + ")");
      return {
        hierarchy: hierarchy_TaskData,
        ...item,
      };
      // } else if (item.row_type == 'R') {  //this line is commented as BE returning XR and XP for Person ODC res
    } else {
      hierarchy_TaskData = [];

      if (resourceExist) {
        hierarchy_data.pop();
      }
      for (let j = 0; j < hierarchy_data.length; j++) {
        hierarchy_TaskData.push(hierarchy_data[j]);
      }
      resourceExist = true;
      hierarchy_data.push(item.resource_name);
      hierarchy_TaskData.push(item.resource_name);
      return {
        hierarchy: hierarchy_TaskData,
        ...item,
      };
    }
  });

  return transposedProjData;
};

const constructHierarchyTaskSummaryReport = (data) => {
  // let copyData = [].concat(data)

  let hierarchyList = [];
  let hierarchyListLocal = [];
  let RCFlag = false;

  if (data.length === 1) {
    return [];
  }

  const finalHierarchyData = data.map((item) => {
    if (item.row_type == "P" || item.wbs_level === 0) {
      hierarchyList.push("Project Level");
      hierarchyListLocal = [].concat(hierarchyList);
      return {
        hierarchy: hierarchyListLocal,
        ...item,
      };
    } else if (item.row_type == "T") {
      RCFlag = false;
      hierarchyList.splice(
        item.wbs_level,
        hierarchyList.length - item.wbs_level
      );
      hierarchyList.push(item.task_number + " (" + item.task_name + ")");
      hierarchyListLocal = [].concat(hierarchyList);
      return {
        hierarchy: hierarchyListLocal,
        ...item,
      };
    } else if (item.row_type == "RC") {
      if (RCFlag) {
        hierarchyList.pop();
      } else {
        RCFlag = true;
      }
      hierarchyList.push(item.roll_up_resource_name);
      hierarchyListLocal = [].concat(hierarchyList);
      return {
        hierarchy: hierarchyListLocal,
        ...item,
      };
    } else if (item.row_type == "R") {
      hierarchyListLocal = [].concat(hierarchyList);
      if (item.roll_up_resource_name === ResourceTypes.rawLabor) {
        hierarchyListLocal.push(item.person_name);
      } else if (item.roll_up_resource_name === ResourceTypes.subs) {
        hierarchyListLocal.push(item.supplier_name);
      } else if (item.roll_up_resource_name === ResourceTypes.odc) {
        hierarchyListLocal.push(item.exp_type);
      } else {
        hierarchyListLocal.push(item.roll_up_resource_name);
      }
      return {
        hierarchy: hierarchyListLocal,
        ...item,
      };
    } else {
      return {
        hierarchy: ["null"],
        ...item,
      };
    }
  });
  return finalHierarchyData;
};

const revenueByWeekHierarchy = (data) => {
  if (data.length === 1) {
    return [];
  }

  let hierarchyList = [];
  let hierarchyListLocal = [];

  const finalHierarchyData = data.map((item) => {
    if (item.row_type == "P" || item.wbs_level === 0) {
      hierarchyList.push("Project Level");
      hierarchyListLocal = [].concat(hierarchyList);
      return {
        hierarchy: hierarchyListLocal,
        ...item,
      };
    } else if (item.row_type == "T") {
      hierarchyList.splice(
        item.wbs_level,
        hierarchyList.length - item.wbs_level
      );
      hierarchyList.push(item.task_number + " (" + item.task_name + ")");
      hierarchyListLocal = [].concat(hierarchyList);
      return {
        hierarchy: hierarchyListLocal,
        ...item,
      };
    } else if (item.row_type == "R") {
      hierarchyListLocal = [].concat(hierarchyList);
      hierarchyListLocal.push(item.key_member);
      return {
        hierarchy: hierarchyListLocal,
        ...item,
      };
    } else {
      return {
        hierarchy: ["null"],
        ...item,
      };
    }
  });
  return finalHierarchyData;
};


const getNumber = (data) => {
  return isNaN(data)? 0: data== null ?0: parseFloat(data);
};

const applyConversion = function (
  gridData,
  currencyExclusionCols,
  currencyColumnName
) {
  const portfolioSummarieObj = {};
  if (gridData && Object.keys(gridData).length) {
    gridData.forEach((key) => {
      portfolioSummarieObj[key] = gridData.reduce((sum, records) => {
        const series = records[key] ?? [];
        if (Array.isArray(records[key])) {
          return series.map((item, index) => {
            return (
              parseFloat(
                !isKeyExist(currencyExclusionCols, key) && currencyColumnName
                  ? currencyFactory.convertCurrency({
                      currencyValue: item,
                      currentCurrency: records[currencyColumnName],
                    })
                  : item
              ) + (sum[index] ?? 0)
            );
          });
        } else {
          return (
            parseFloat(
              !isKeyExist(currencyExclusionCols, key)
                ? currencyFactory.convertCurrency({
                    currencyValue: records[key],
                    currentCurrency: records.project_currency_code,
                  })
                : records[key]
            ) + (isNaN(sum) || sum.length === 0 ? 0 : sum)
          );
        }
      }, []);
    });
  }
  return portfolioSummarieObj;
};

const openInvoiceUrl = (url,filter1, filter2, filter3, filter4, filter5, filter6 ) => {

  // if (e.colDef.field === colName&& e.data?.colName) {
    window.open(
      `${url}/aecom/wc3.html?role=PM&ifilter=WF_ACTION_TYPE,103&invkey=.|bill_to_customer_id,${filter1}|invoice_class%5e,${filter2}|doc_id,${filter1},${filter3},${filter4},${filter5}&uuid=${filter6}`,'_blank',
    )
  // }
}

export {
  getSummaryData,
  getTableData,
  getSummaryTableData,
  invoiceData,
  netReceivables,
  outstandingWorkflow,
  sumofallegends,
  paidvalue,
  projectDrilldown,
  gridData,
  filterDistinctCol,
  populateHierarchyCall,
  populateProjWeekHierarchy,
  itdCostvalue,
  itdRevenuevalue,
  gmNsrvalue,
  constructHierarchyTaskSummaryReport,
  revenueByWeekHierarchy,
  getNumber,
  applyConversion,
  openInvoiceUrl
};
