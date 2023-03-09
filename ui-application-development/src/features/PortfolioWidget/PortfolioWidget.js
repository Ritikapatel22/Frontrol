import React from "react";
import styles from "../dashboard/Dashboard.module.css";
import { Grid } from "@frontrolinc/pace-ui-framework";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { Chart } from "./Chart/Chart";
import { Summary } from "./Summary/Summary";

export function PortfolioWidget({ gridConfig: { reduxConfig, uiConfig } }) {
  const baseSelector = reduxConfig.baseSelector;

  return (
    <>
      <div className={styles.column}>
        <Grid
          reduxConfig={reduxConfig}
          uiConfig={uiConfig}
          style={
            tabs
              ? "width: 100%; display: block; overflow: hidden;"
              : "display:none"
          }
        />
      </div>
    </>
  );
}
