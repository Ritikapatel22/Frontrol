import { createSlice } from "@reduxjs/toolkit";
import { uid } from "../helpers/utils";
import AgedARWidget from "../widgets/ProjectAgedARWidget";
import BilledARWidget from "../widgets/ProjectBilledARWidget";
import UnbilledARWidget from "../widgets/ProjectUnbilledARWidget";
import NetReceivableWidget from "../widgets/ProjectNetReceivableWidget";
import CommitmentsDtlPoWidget from "../widgets/CommitmentsWidget";
import TrendAnalysis from "../widgets/TrendAnalysis";
import WeekCostWidget from "../widgets/ProjectWeekCostWidget";
import PendingProjectApprovalWidget from "../widgets/PendingProjectApproval";
import DocumentsWidget from "../widgets/Documents";
import FormulasWidget from "../widgets/FormulasWidget";

// import ProfitLossTable from "../components/ProfitLossWidget";
import ProfitLossTable from "../widgets/ProfitLossWidget";
import KeyPerformanceIndicators from "../widgets/KeyPerfomanceIndicators";
import EarnedValue from "../widgets/ProjectEarnedValueWidget";
// import AgedARWidgetNew from "../widgets/AgedARWidgetNew";

let initialState = {
  Views: [
    {
      name: "Billing view",
      widgets: [
        {
          name: "test",
          filters: [{ param: "Unit", operator: "equal", value: "test" }],
          component: "test",
          _uid: uid(),
        },
      ],
    },
    {
      name: "Costing view",
      widgets: [
        {
          name: "test1",
          filters: [{ param: "Unit", operator: "equal", value: "test" }],
          component: "test",
          _uid: uid(),
        },
      ],
    },
  ],
  selectedView: {
    name: "Billing view",
    widgets: [
      {
        name: "Aged AR trend",
        description:
          "Aged AR trend.",
        filters: [{ param: "Unit", operator: "equal", value: "test" }],
        component: AgedARWidget,
        _uid: uid(),
        fullWidth: false,
      },
      {
        name: "Aged unbilled trend",
        description: "Aged unbilled trend.",
        filters: [{ param: "Unit", operator: "equal", value: "test" }],
        component: UnbilledARWidget,
        _uid: uid(),
        fullWidth: false,
      },
      {
        name: "Net receivables",
        description: "Net receivables.",
        filters: [{ param: "Unit", operator: "equal", value: "test" }],
        component: NetReceivableWidget,
        _uid: uid(),
        fullWidth: false,
      },
      {
        name: "Commitments detail PO status",
        description: "Commitments detail PO status",
        filters: [{ param: "Unit", operator: "equal", value: "test" }],
        component: CommitmentsDtlPoWidget,
        _uid: uid(),
        fullWidth: false,
      },
      {
        name: "Billing & AR detail report",
        description: "Billing & AR detail report.",
        filters: [{ param: "Unit", operator: "equal", value: "test" }],
        component: BilledARWidget,
        _uid: uid(),
        fullWidth: false,
      },

      {
        name: "Trend analysis",
        description: "Trend analysis.",
        filters: [{ param: "Unit", operator: "equal", value: "test" }],
        component: TrendAnalysis,
        _uid: uid(),
        fullWidth: false,
      },
      {
        name: "This week cost",
        description: "This week cost.",
        filters: [{ param: "Unit", operator: "equal", value: "test" }],
        component: WeekCostWidget,
        _uid: uid(),
        fullWidth: true,
      },
      {
        name: "Profit & loss",
        description: "Profit & loss.",
        filters: [{ param: "Unit", operator: "equal", value: "test" }],
        component: ProfitLossTable,
        _uid: uid(),
        fullWidth: false,
      },

      {
        name: "Commitments detail PO status",
        description: "Commitments detail PO status",
        filters: [{ param: "Unit", operator: "equal", value: "test" }],
        component: CommitmentsDtlPoWidget,
        _uid: uid(),
        fullWidth: false,
      },
      {
        name: "Earned value",
        description: "Earned value.",
        filters: [{ param: "Unit", operator: "equal", value: "test" }],
        component: EarnedValue,
        _uid: uid(),
        fullWidth: false,
      },
      {
        name: "Pending project approvals",
        description: "Pending project approvals.",
        filters: [{ param: "Unit", operator: "equal", value: "test" }],
        component: PendingProjectApprovalWidget,
        _uid: uid(),
        fullWidth: false,
      },
      {
        name: "Documents",
        description: "Documents.",
        filters: [{ param: "Unit", operator: "equal", value: "test" }],
        component: DocumentsWidget,
        _uid: uid(),
        fullWidth: false,
      },
      {
        name: "Key performance indicators",
        description: "Key performance indicators",
        filters: [{ param: "Unit", operator: "equal", value: "test" }],
        component: KeyPerformanceIndicators,
        _uid: uid(),
        fullWidth: false,
      },
      {
        name: "This week cost",
        description: "This week cost.",
        filters: [{ param: "Unit", operator: "equal", value: "test" }],
        component: WeekCostWidget,
        _uid: uid(),
        fullWidth: true,
      },
      {
        name: "Project fields",
        description: "List of project fields, formulas, and values.",
        filters: [{ param: "Unit", operator: "equal", value: "test" }],
        component: FormulasWidget,
        _uid: uid(),
        fullWidth: true,
      }
    ],
  },
  projectInfo: [
    {
      title: "Project name",
      summary: "DFAT document review",
    },
    {
      title: "Project#",
      summary: "6027000",
    },
    {
      title: "Status",
      summary: "Approved",
    },
    {
      title: "Description",
      summary:
        "The document explains a project's objectives and its essential qualities. Think of it as the elevator pitch that focuses on what and why without delving into how.",
    },
    {
      title: "Approved start date",
      summary: "1 Jan 2022",
    },
    {
      title: "Approved end date",
      summary: "31 Jun 2022",
    },
    {
      title: "Forecast end date",
      summary: "1 Jan 2022",
    },
    {
      title: "Project Manager",
      summary: "Bruce Cunningham",
    },
    {
      title: "Project Director",
      summary: "Katherine Woods",
    },
    {
      title: "Project Accountant",
      summary: "Eduardo Newman",
    },
    {
      title: "Type",
      summary: "Lump sum (Cost/Work_M)",
    },
    {
      title: "Owning organization",
      summary:
        "International, ANZ, Environment,2471 - 80.ENV - GRS - Christchurch",
    },
    {
      title: "Review category",
      summary: "C-3A",
    },
    {
      title: "Agreement amount",
      summary: "AUD 233,359.41",
    },
    {
      title: "RAR funding",
      summary: "AUD 0.00",
    },
    {
      title: "Revenue opportunity",
      summary: "AUD 0.00",
    },
    {
      title: "Last EAC date",
      summary: "31 Jun 2022",
    },
  ],
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setSelectedProject: (state, action) => {
      debugger;
      state.selectedProject = state;
    },

    toggleFullScreen: (state, action) => {
      state.selectedView.widgets.forEach((data, index) => {
        if (data._uid === action.payload.id) {
          state.selectedView.widgets[index].isFullScreen =
            action.payload.isFullScreen;
        }
      });
    },
  },
});
export const { setSelectedProject, toggleFullScreen } = projectSlice.actions;

const { reducer } = projectSlice;
export default reducer;
