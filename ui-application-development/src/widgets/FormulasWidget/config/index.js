import { useCallback } from 'react';
import formulasUiConfig from "./formulas.json";
import { getComputedData } from "@frontrolinc/pace-ui-framework";
import { hideModifiedFields } from '../utils'


import {
  columnTypesConfig,
  sidebarColsConfig,
  sidebarFilterConfig,
} from "../../../formatCols";

formulasUiConfig.columnTypes = columnTypesConfig;

formulasUiConfig.sideBar = {
  toolPanels: [sidebarColsConfig, sidebarFilterConfig],
}

formulasUiConfig.columnTypes = columnTypesConfig;

formulasUiConfig.defaultColDef.cellStyle = (params) => {
  if (params.data.query_name=='Queried' && params.colDef.field=='modifiedValue') {
    return {backgroundColor: 'white'};
  }
  if (params.data.query_name!='Queried' && params.colDef.field=='modifiedFormula') {
    return {backgroundColor: 'white'};
  }
  if (params.data.errors && params.data.errors != '') {
    return {color: 'red'};
  }
  if (params.data.dependency && params.data.dependency == 'Source') {
    return {backgroundColor: 'cornsilk'};
  }
  if (params.data.dependency && params.data.dependency == 'Impacted') {
    return {backgroundColor: 'mistyrose'};
  }
}

formulasUiConfig.defaultColDef.editable = (params) => {
  return ( (params.data.query_name=='Queried' && params.colDef.field=='modifiedValue') ||
  (params.data.query_name!='Queried' && params.colDef.field=='modifiedFormula'))
}

formulasUiConfig.isRowSelectable = (params) => {
    return !!params.data && (params.data.sourceFields || params.data.impactedFields) ;
};

formulasUiConfig.onRowSelected = (event) => {
  //console.log ("onRowSelected", event, event.node.selected);
  if (!event.node.selected) {
    //unselected
    if (event.api.getSelectedNodes().length == 0) {
      //unselected and nothing else selected - clear everything
      event.api.forEachNode( (node) => {
          node.data.dependency = null;
      });
      //clear all filters and refresh grid
      event.api.refreshCells();
      const filterInstance = event.api.getFilterInstance('dependency');
      filterInstance.setModel(null);
      filterInstance.applyModel();
      event.api.onFilterChanged();  

      hideModifiedFields(event.api, true);
    }
    return;
  }

  //tag the Source & Impacted rows for selected row
  const sourceFields = event.data.sourceFields, impactedFields = event.data.impactedFields;
  event.api.forEachNode( (node) => {
    if (sourceFields && sourceFields.includes(node.data.field_name))
      node.data.dependency = 'Source';
    else if (impactedFields && impactedFields.includes(node.data.field_name))
      node.data.dependency = 'Impacted';
    else
      node.data.dependency = null;
  });
  event.data.dependency = 'Current';

  //clear all filters, set dependency filter and refresh grid
  event.api.refreshCells();
  event.api.setFilterModel(null);
  const filterInstance = event.api.getFilterInstance('dependency'); 
  filterInstance.setModel({filterType: 'text', type: 'notBlank'});
  filterInstance.applyModel();
  event.api.onFilterChanged();  

  hideModifiedFields(event.api, false);
};

formulasUiConfig.onCellValueChanged = (event) => {
  if (event.colDef.field=='modifiedValue' || event.colDef.field=='modifiedFormula') {
    recomputeNewValues (event.api);
  }
}

const recomputeNewValues = (gridApi) => {
  const values = {}, formulas = [];
  gridApi.forEachNode( (node) => {
    if (node.data.formula && node.data.formula!='') {
      formulas.push({"field": node.data.field_name, 
        "formula": node.data.modifiedFormula && node.data.modifiedFormula != '' ? 
        node.data.modifiedFormula: node.data.formula});
    } else {
      values[node.data.field_name] = node.data.modifiedValue && node.data.modifiedValue != '' ? 
        node.data.modifiedValue: node.data.field_value;
    }
  });
  console.log ('recomputeNewValues: values',[values]);
  console.log ('recomputeNewValues: formulas', formulas);

  const newValues = getComputedData([values], formulas)[0];

  gridApi.forEachNode( (node) => {
    if (node.data.formula && node.data.formula!='') {
      for (let key of Object.keys(newValues)) {
        if (node.data.field_name==key) {
          if (!Number.isNaN(node.data.field_value) & !Number.isNaN(newValues[key]) && node.data.field_value!=newValues[key]) {
            console.log(key, node.data.field_value, newValues[key]);
            node.data.modifiedValue = newValues[key];
          } else {
            node.data.modifiedValue = null;
          }
          break;
        }
      }
    }
    gridApi.refreshCells();
  });
}

export default { formulasUiConfig };