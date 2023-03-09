import { projectColumns } from "../../app/columnConfiguration";
import { formulaDefs } from "../ProfitLossWidget/projectColumn";
import { formulaDefs as KPIFormulaDefs } from "../KeyPerfomanceIndicators/kpiFormulas";
import { getComputedData } from "@frontrolinc/pace-ui-framework";

export const rowsCreation = (data) =>{

  let new_array = []
  //let duplicateCounter = {}

  //queried
  for(let fieldName of  Object.keys(data)){
    let currentRow = {
      field_name:fieldName,
      field_value:data[fieldName],
      query_name: "Queried"
    }
    new_array.push(currentRow);
    //duplicateCounter[fieldName] = duplicateCounter[fieldName] > 0 ? duplicateCounter[fieldName]++ : 1;
  }

  data = getComputedData([JSON.parse(JSON.stringify(data))], projectColumns);

  //basic formula
  for(let item of projectColumns){
    let currentRow = {
      field_name:item.field,
      formula:item.formula,
      query_name: "Base formula",
      field_value:data[0][item.field]
    }
    new_array.push(currentRow);
    //duplicateCounter[item.field] = duplicateCounter[item.field] > 0 ? duplicateCounter[item.field]++ : 1;
  }

  data =  getComputedData([data[0]], formulaDefs);

  // profit loss
  for(let item of formulaDefs){
    let currentRow = {
      field_name:item.field,
      formula:item.formula,
      query_name: 'P&L formula',
      field_value:data[0][item.field]
    }
    new_array.push(currentRow);
    //duplicateCounter[item.field] = duplicateCounter[item.field] > 0 ? duplicateCounter[item.field]++ : 1;
  }

  data = getComputedData([data[0]], KPIFormulaDefs);

  // KPI
  for(let item of KPIFormulaDefs){
    let currentRow = {
      field_name:item.field,
      formula:item.formula,
      query_name: "KPI formula",
      field_value:data[0][item.field]
    }
    new_array.push(currentRow);
    //duplicateCounter[item.field] = duplicateCounter[item.field] > 0 ? duplicateCounter[item.field]++ : 1;
  }
  for(let row of new_array){
    //if(duplicateCounter[row.field_name] > 1){
    //  row.isDuplicate = "Y"
    //}
    /* else{
      row.isDuplicate = ""
    } */
  }
  // console.log(duplicateCounter)


  //identify invalid fields in formulas
  for (let i=0; i<new_array.length; i++){
    let row1 = new_array[i];

    if (row1.formula && row1.formula != '') {
      let tokens = getFormulaTokens(row1.formula);

      for (let token of tokens){
        let match = false;
        for (let j=0; j<i; j++){
          let row2 = new_array[j];
          if (token == row2.field_name) {
            match = true;
            break; 
          }
        }
        if (!match) {
          if (!row1.missing) row1.missing = [];
          row1.missing.push(token);
        }
      }

      if (row1.missing) {
        row1.formula_missing = row1.missing;
      }
    }
  }

  //identify source fields for each formula
  for (let row of new_array){
    row.sourceFields = getSourceFields(row.field_name, row.formula, new_array);
    if (!row.sourceFields || row.sourceFields.length == 0) row.sourceFields = null;
  }

  //identify impacted fields for each field
  for (let row of new_array){
    row.impactedFields = getImpactedFields (row.field_name, new_array);
    if (!row.impactedFields || row.impactedFields.length == 0) row.impactedFields = null;
  }

  //identify duplicates
  for (let i=0; i<new_array.length; i++) {
    for (let j=i+1; j<new_array.length; j++) {
      if (new_array[i].field_name.trim() == new_array[j].field_name.trim()) {
        new_array[i].isDuplicate = 'Y';
        new_array[j].isDuplicate = 'Y';
      }
    }
  }

  //identify formulas out of sequence
  for (let i=0; i<new_array.length; i++) {
    if (new_array[i].sourceFields) {
      for (let j=i+1; j<new_array.length; j++) {
        if (new_array[i].sourceFields.includes(new_array[j].field_name)) {
          new_array[i].outOfSequence = 'Y';
          new_array[j].outOfSequence = 'Y';
        }
      }
    }
  }

  //identify all errors
  for (let i=0; i<new_array.length; i++) {
    new_array[i].errors = '';
    if (Number.isNaN(new_array[i].field_value)) {
      new_array[i].errors += ', Invalid value';
    }
    if (new_array[i].isDuplicate && new_array[i].isDuplicate=='Y') {
      new_array[i].errors += ', Duplicate';
    }
    if (new_array[i].outOfSequence && new_array[i].outOfSequence=='Y') {
      new_array[i].errors += ', Out of sequence';
    }
    if (new_array[i].formula_missing) {
      new_array[i].errors += ', Invalid fields in formula';
    }
    if (new_array[i].errors == '') 
      new_array[i].errors = null;
    else
      new_array[i].errors = new_array[i].errors.substr(2);
  }

  return new_array;
}

export const getFormulaTokens = (str) => {
  const separators = [' ', '(', ')', '+', '-', "'n/a'", '"n/a"', '/', '*', '?', ':', '>=', '<=', '>', '<', '==', '&&']; //"'",
  const tmpStr = '|';
  const isLiteralString = (str) => {
    str = str.trim();
    if (str.substr(0,1) == '"' && str.substr(str.length-1,1) == '"') return true;
    if (str.substr(0,1) == "'" && str.substr(str.length-1,1) == "'") return true;
    return false;
  }

  str = str.trim();
  for (let sep of separators) {
    str = str.replaceAll(sep, tmpStr);
  }
  let tokens = str.split(tmpStr);
  tokens = tokens.filter((value) => {
    return isNaN (value) && (value != '') && !isLiteralString(value);
  })
  return tokens;
}

const getSourceFields = (field, formula, gridData, sourceFields) => {
  if (sourceFields) 
    sourceFields.push(field) 
  else 
    sourceFields = [];

  if (!formula || formula == '') {
    return sourceFields;
  }
  const formulaTokens = getFormulaTokens(formula);
  for (let token of formulaTokens) {
    for (let data of gridData) {
      if (token == data.field_name) {
        sourceFields = getSourceFields (data.field_name, data.formula, gridData, sourceFields);
        break;
      }
    }
  }
  //return (!sourceFields || sourceFields.length == 0) ? null : sourceFields;
  return sourceFields;
}

const getImpactedFields = (field, gridData) => {
  let impactedFields = [];
  for (let data of gridData) {
      if (data.sourceFields && data.sourceFields.includes(field)) {
        impactedFields.push(data.field_name);
      }
  }
  return impactedFields;
  //return (!impactedFields || impactedFields.length == 0) ? null : impactedFields;
}

export const hideModifiedFields = (gridApi, hide) => {
  const columnDefs = gridApi.getColumnDefs();
  columnDefs.forEach(function (colDef, index) {
    if (colDef.field == 'modifiedValue' || colDef.field == 'modifiedFormula') {
      colDef.hide = hide;
    }
  });
  gridApi.setColumnDefs(columnDefs);
  clearModifiedFields(gridApi);
}

export const clearModifiedFields = (gridApi) => {
  gridApi.forEachNode( (node) => {
    node.data.modifiedValue = null;
    node.data.modifiedFormula = null;
  });
  gridApi.refreshCells();
}
