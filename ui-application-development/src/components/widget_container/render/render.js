import React from "react";

// import AgedARWidget from "../../AgedARWidget";
// import BilledARWidget from "../../BilledARWidget";
// import ProjectListWidget from "../../ProjectListWidget";
// import SingleProjectListWidget from "../../SingleProjectListWidget";
// import UnbilledARWidget from "../../UnbilledARWidget";
// import NetReceivableWidget from "../../NetReceivableWidget";
// import PendingProjectApproval from "../../PendingProjectApproval";
// import CommitmentsDetailPoStatus from "../../CommitmentsDetailPoStatus";
// import VendorInvoices from "../../VendorInvoices";
// import Documents from "../../Documents";
import {ErrorBoundary} from "@frontrolinc/pace-ui-framework"


export function WidgetRender(block) {
  if (block.component) {
    return React.createElement(block.component, {
      key: block.instanceId,
      block: block,
    });
  }

  return React.createElement(
    () => (
      <ErrorBoundary hasError={true}  />
      // <div>The component {block.component.name} has not been created yet.</div>
    ),
    { key: block.instanceId }
  );
}
