import projectdocumentUiConfig from './projectdocument.json'
import {
  columnTypesConfig,
  sidebarColsConfig,
  sidebarFilterConfig,
  excelStyles
} from '../../../formatCols'

projectdocumentUiConfig.columnTypes = columnTypesConfig

projectdocumentUiConfig.sideBar = {
  toolPanels: [sidebarColsConfig, sidebarFilterConfig],
}
projectdocumentUiConfig.excelStyles = excelStyles;


export default { projectdocumentUiConfig }
