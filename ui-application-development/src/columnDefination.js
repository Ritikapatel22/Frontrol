import AgedARWidgetConfig from "./widgets/AgedARWidget/config";
import AgedARWidgetNewConfig from "./widgets/AgedARWidget/config";
import BilledARWidgetConfig from './widgets/BilledARWidget/config';
import CommitmentsWidgetConfig from "./widgets/CommitmentsWidget/config";
import DocumentsConfig from './widgets/Documents/config';
import FormulasWidgetConfig from './widgets/FormulasWidget/config';
import KeyPerfomanceIndicatorsConfig from './widgets/KeyPerfomanceIndicators/config';
import NetReceivableWidgetConfig from'./widgets/NetReceivableWidget/config';
import PendingProjectApprovalConfig from './widgets/PendingProjectApproval/config';
import ProfitLossWidgetConfig from './widgets/ProfitLossWidget/config';
import ProjectAgedARWidgetConfig from './widgets/ProjectAgedARWidget/config';
import ProjectBilledARWidgetConfig from './widgets/ProjectBilledARWidget/config';
import ProjectEarnedValueWidgetConfig from './widgets/ProjectEarnedValueWidget/config'
import ProjectListWidgetConfig from './widgets/ProjectListWidget/config';
import ProjectNetReceivableWidgetConfig from './widgets/ProjectNetReceivableWidget/config';
import ProjectUnbilledARWidgetConfig from './widgets/ProjectUnbilledARWidget/config';
import ProjectWeekCostWidgetConfig from './widgets/ProjectWeekCostWidget/config';
import SingleProjectListWidgetConfig from './widgets/SingleProjectListWidget/config';
import TrendAnalysisConfig from './widgets/TrendAnalysis/config';
import UnbilledARWidgetConfig from './widgets/UnbilledARWidget/config';
import VendorInvoicesWidgetConfig from'./widgets/VendorInvoicesWidget/config';
import WeekCostWidgetConfig from './widgets/WeekCostWidget/config';
import {FavoriteConfig} from "./components/projectspage/favorites";
import {RecentConfig} from "./components/projectspage/recent";
import {ProjectConfig} from "./components/projectspage/myProject";
import {CDReportConfig} from "./components/Reportpage/CostDetailReport/index";
import {RHWReportConfig} from "./components/Reportpage/ResourceHrsByWeek/index";
import {RDReportConfig} from "./components/Reportpage/RevenuetransactionDetailReport/index";
import {TSReportConfig} from "./components/Reportpage/TaskSummaryReport/index";
import {SPConfig} from "./components/adminconfig/submitProcess";
import {SRASConfig} from "./components/Common/advacedSearch/searchResult"
import { TextFile } from "./translateData";
function generateColumns() {
  
    const columns = {};
    let allColumns = [
        ...AgedARWidgetConfig.projectUiConfig.columnDefs, 
        ...AgedARWidgetConfig.projectInvoiceConfig.columnDefs,
        ...AgedARWidgetConfig.summaryUiConfig.columnDefs, 
        ...AgedARWidgetConfig.tableUiConfig.columnDefs,
        ...AgedARWidgetNewConfig.projectUiConfig.columnDefs,
        // ...AgedARWidgetNewConfig.projectInvoiceUiConfig.columnDefs,
        // ...AgedARWidgetNewConfig.projectTestUiConfig.columnDefs,
        ...AgedARWidgetNewConfig.summaryUiConfig.columnDefs,
        ...AgedARWidgetNewConfig.tableUiConfig.columnDefs,
        ...BilledARWidgetConfig.projectInvoiceConfig.columnDefs,
        ...BilledARWidgetConfig.projectUiConfig.columnDefs, 
        ...BilledARWidgetConfig.tableUiConfig.columnDefs,
        ...CommitmentsWidgetConfig.purchaseOrderUiConfig.columnDefs,
        ...CommitmentsWidgetConfig.tableUiConfig.columnDefs,
        ...DocumentsConfig.projectdocumentUiConfig.columnDefs,
        ...FormulasWidgetConfig.formulasUiConfig.columnDefs,
        ...KeyPerfomanceIndicatorsConfig.CashUiConfig.columnDefs,
        ...KeyPerfomanceIndicatorsConfig.DataQualityUiConfig.columnDefs,
        ...KeyPerfomanceIndicatorsConfig.FinancialUiConfig.columnDefs,
        ...KeyPerfomanceIndicatorsConfig.ProgressUiConfig.columnDefs,
        ...KeyPerfomanceIndicatorsConfig.ProjectsFlagsUiConfig.columnDefs,
        ...NetReceivableWidgetConfig.projectInvoiceConfig.columnDefs,
        ...NetReceivableWidgetConfig.projectUiConfig.columnDefs,
        ...NetReceivableWidgetConfig.summaryUiConfig.columnDefs,
        ...NetReceivableWidgetConfig.tableUiConfig.columnDefs,
        ...PendingProjectApprovalConfig.summaryUiConfig.columnDefs,
        ...ProfitLossWidgetConfig.metricsUiConfig.columnDefs,
        ...ProfitLossWidgetConfig.trendValueUiConfig.columnDefs,
        ...ProjectAgedARWidgetConfig.invoiceUiConfig.columnDefs,
        ...ProjectAgedARWidgetConfig.summaryUiConfig.columnDefs,
        ...ProjectAgedARWidgetConfig.tableUiConfig.columnDefs,
        ...ProjectBilledARWidgetConfig.invoiceUiConfig.columnDefs,
        ...ProjectBilledARWidgetConfig.tableUiConfig.columnDefs,
        ...ProjectEarnedValueWidgetConfig.earnedValueTableUiConfig.columnDefs,
        ...ProjectEarnedValueWidgetConfig.taskSummaryUiConfig.columnDefs,
        ...ProjectListWidgetConfig.approvedUiConfig.columnDefs,
        ...ProjectListWidgetConfig.arUnBilledUiConfig.columnDefs,
        ...ProjectListWidgetConfig.changeUiConfig.columnDefs,
        ...ProjectListWidgetConfig.forecastUiConfig.columnDefs,
        ...ProjectListWidgetConfig.itdUiConfig.columnDefs,
        ...ProjectListWidgetConfig.keymemberUiConfig.columnDefs,
        ...ProjectListWidgetConfig.kpisUiConfig.columnDefs,
        ...ProjectListWidgetConfig.mtdUiConfig.columnDefs,
        ...ProjectListWidgetConfig.summaryUiConfig.columnDefs,
        ...ProjectListWidgetConfig.ytdUiConfig.columnDefs,
        ...ProjectNetReceivableWidgetConfig.invoiceUiConfig.columnDefs,
        ...ProjectNetReceivableWidgetConfig.summaryUiConfig.columnDefs,
        ...ProjectNetReceivableWidgetConfig.tableUiConfig.columnDefs,
        ...ProjectUnbilledARWidgetConfig.summaryUiConfig.columnDefs,
        ...ProjectUnbilledARWidgetConfig.tableUiConfig.columnDefs,
        ...ProjectWeekCostWidgetConfig.weekCostUiConfig.columnDefs,
        ...SingleProjectListWidgetConfig.singleprojectUiConfig.columnDefs,
        ...TrendAnalysisConfig.trendValuesUiConfig.columnDefs,
        ...UnbilledARWidgetConfig.projectUiConfig.columnDefs,
        ...UnbilledARWidgetConfig.summaryUiConfig.columnDefs,
        ...UnbilledARWidgetConfig.tableUiConfig.columnDefs,
        ...VendorInvoicesWidgetConfig.purchaseInvoiceUiConfig.columnDefs,
        ...VendorInvoicesWidgetConfig.tableUiConfig.columnDefs,
        ...WeekCostWidgetConfig.weekCostUiConfig.columnDefs,
        ...FavoriteConfig.columnDefs,
        ...RecentConfig.columnDefs,
        ...ProjectConfig.columnDefs,
        ...CDReportConfig.columnDefs,
        ...RHWReportConfig.columnDefs,
        ...RDReportConfig.columnDefs,
        ...TSReportConfig.columnDefs,
        ...SPConfig.columnDefs,
        ...SRASConfig.columnDefs,
    ]
    let children = [];
    allColumns.forEach((col) => {
      if (col.children && Array.isArray(col.children)) {
        children = [...children, ...col.children]
      }
    })
    allColumns = [...allColumns, ...children];
    allColumns.forEach((col) => {
        if (col.headerName && !col.headerHidden) {
        columns[col.headerName] = col.headerName;
        }
    })
    fetch(`http://localhost:3000/assests/i18n/label/en.json`).then((res) => res.json()).then((json) => {
       const mergedData = {...json, ...columns};
       //  console.log("all columns",JSON.stringify(mergedData)) 
      // TextFile(mergedData, 'en')
    })
  }
  export default generateColumns;