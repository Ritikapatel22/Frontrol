import { SELECTED_VIEW } from "./types";

export const loadSelectedView = (item) => ({
  type: SELECTED_VIEW,
  payload: item,
});
