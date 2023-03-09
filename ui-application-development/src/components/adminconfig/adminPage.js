

import React, { useEffect } from "react";
import AdminConfigTab from "./adminConfigtab";
import { withErrorHandler, BackendError } from '@frontrolinc/pace-ui-framework'


const AdminPage = ({isAllowed}) => {
  useEffect(() => {
    if(isAllowed === false) {
      throw new BackendError("You do not have access to this page.")
    }
  }, [isAllowed])

  return (
    <div>
      <AdminConfigTab />
    </div>
  );
};

export default withErrorHandler(AdminPage, null)

// export default AdminConfig;