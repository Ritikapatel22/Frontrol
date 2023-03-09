import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [
    {
      title: "My portfolio",
      description: "Portfolio",
      org_id: "1"
    },
    {
      title: "Transportation",
      description: "Portfolio",
      org_id: "2"
    },
    {
      title: "My projects",
      description: "Portfolio",
      org_id: "3"
    },
    {
      title: "DFAT project review",
      description: "Project",
      project_id: "4"
    },
    {
      title: "OMP PPFAS review",
      description: "Project",
      project_id: "5"
    },
    {
      title: "Construction",
      description: "Portfolio",
      project_id: "6"
    },
    {
      title: "ASP4829000",
      description: "Invoice",
      project_id: "7"
    },
    {
      title: "Transportation",
      description: "Project",
      project_id: "8"
    },
    {
      title: "ASP4829000",
      description: "Invoice",
      project_id: "9"
    },
    {
      title: "ASP4829000",
      description: "Invoice",
      project_id: "10"
    },
  ],
  
  refreshTime: null,
  projects: null,
  route: "Favorites dashboard"
};

const favoritesslice = createSlice({
  name: "Favorites",
  initialState,
  reducers: {
    setRoute: (state, action) => {
      state.route = action.payload;
    },
    setRefreshTime: (state) => {
      const date = new Date();
      state.refreshTime = new Intl.DateTimeFormat("us-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(date);
    },
  },
});
export const {
  setRefreshTime,
  setRoute
} = favoritesslice.actions;
const { reducer } = favoritesslice;
export default reducer;
