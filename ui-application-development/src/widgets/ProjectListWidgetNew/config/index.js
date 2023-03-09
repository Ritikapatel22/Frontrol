import {
  columnTypesConfig,
  sidebarColsConfig,
  sidebarFilterConfig,
} from '../../../formatCols'
import summaryUiConfig from './summary.json'

summaryUiConfig.columnTypes = columnTypesConfig

summaryUiConfig.sideBar = {
  toolPanels: [sidebarColsConfig, , sidebarFilterConfig],
}

export default { summaryUiConfig }
