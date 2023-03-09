import styles from "./Dashboard.module.css";
import { useGetDataQuery } from "../../app/appApi";
import { appApi } from "../../app/appApi";
import { PortfolioWidget } from "../PortfolioWidget/PortfolioWidget";


export function Dashboard(props) {
  const configFromBackEnd = {
    approvedProjects: { status: "Approved" },
    projectsFromShell: { customer: "Shell" },
  };

  const approvedProjectSelector = appApi.endpoints.getData.select(
    configFromBackEnd.approvedProjects
  );

  const gridConfigs = {
    approvedProjects: {
      reduxConfig: {
        query: useGetDataQuery,
        params: configFromBackEnd.approvedProjects,
        baseSelector: approvedProjectSelector,
      },
      uiConfig: {
        columns: [
          {
            field: "projectId",
            text: "ID",
          },
          {
            field: "projectnumber",
            text: "project number",
          },
          {
            field: "projectName",
            text: "Project name",
          },
          {
            field: "projectStatus",
            text: "Project status",
          },
        ],
      },
    },
    shellProjects: {
      reduxConfig: {
        query: useGetDataQuery,
        params: configFromBackEnd.approvedProjects,
        resultSelector: ({ data, ...otherParams }) => {
          return {
            data: data?.filter((r) => r.customer === "Shell"),
            ...otherParams,
          };
        },
      },
      uiConfig: {
        columns: [
          {
            field: "id",
            text: "ID",
          },
          {
            field: "name",
            text: "Name",
          },
          {
            field: "customer",
            text: "Customer",
          },
        ],
      },
    },
  };

  return (
    
    <div className={styles.container}>
      <PortfolioWidget gridConfig={gridConfigs.approvedProjects} />
    </div>
  );
}
