import { SELECTED_VIEW } from "./actions/types";
import { uid } from "../helpers/utils";

const initialState = {
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
    name: "Billing View",
    widgets: [
      {
        name: "Project single line summary",
        filters: [{ param: "Unit", operator: "equal", value: "test" }],
        component: "test20",
        _uid: uid(),
      },
      {
        name: "Aged AR trend",
        filters: [{ param: "Unit", operator: "equal", value: "test" }],
        component: "test",
        _uid: uid(),
      },
      {
        name: "New Aged AR trend",
        filters: [{ param: "Unit", operator: "equal", value: "test" }],
        component: "test1",
        _uid: uid(),
      },
      {
        name: "Aged unbilled trend",
        filters: [{ param: "Unit", operator: "equal", value: "test" }],
        component: "test2",
        _uid: uid(),
      },
      {
        name: "Net receivables",
        filters: [{ param: "Unit", operator: "equal", value: "test" }],
        component: "test3",
        _uid: uid(),
      },
      {
        name: "Profit & loss",
        filters: [{ param: "Unit", operator: "equal", value: "test" }],
        component: "test12",
        _uid: uid(),
      },
      {
        name: "Trend Analysis",
        description: "Trend Analysis.",
        filters: [{ param: "Unit", operator: "equal", value: "test" }],
        component: "test22",
        _uid: uid(),
        fullWidth: false,
      },
      {
        name: "Pending Project Approvals",
        filters: [{ param: "Unit", operator: "equal", value: "test" }],
        component: "test4",
        _uid: uid(),
      },
      {
        name: "Commitments Detail PO Status",
        filters: [{ param: "Unit", operator: "equal", value: "test" }],
        component: "test5",
        _uid: uid(),
      },
      {
        name: "Supplier Invoices",
        filters: [{ param: "Unit", operator: "equal", value: "test" }],
        component: "test6",
        _uid: uid(),
      },
      {
        name: "Documents",
        filters: [{ param: "Unit", operator: "equal", value: "test" }],
        component: "test7",
        _uid: uid(),
      },
      {
        name: "This week cost",
        filters: [{ param: "Unit", operator: "equal", value: "test" }],
        component: "test15",
        _uid: uid(),
      },
      {
        name: "Single line data export",
        filters: [{ param: "Unit", operator: "equal", value: "test" }],
        component: "test21",
        _uid: uid(),
      },
    ],
  },
};

export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case SELECTED_VIEW:
      return {
        ...state,
        selectedView: action.payload,
      };
    default:
      return state;
  }
}
