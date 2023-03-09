import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getComputedData } from "@frontrolinc/pace-ui-framework";
import { setupBaseApi } from "@frontrolinc/pace-ui-framework";
import { projectColumns } from "./columnConfiguration";
import { getToken } from "../helpers/utils";
import { date } from "yup/lib/locale";
import { setRefreshTime, setProjects } from "../slices/portfolioslice";

export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:86/server/" }),
  // baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  // baseQuery: fetchBaseQuery({ baseUrl: './server' }),  //bring this back when creating server build
  endpoints: (builder) => ({
    getData: builder.query({
      query: (params) => {
        //  return `projects?${(new URLSearchParams(params).toString())}`
        return "invoice.json";
      },
      transformResponse: (response) => {
        return response.invoices;
      },
    }),
  }),
});

const convertAllColsStringToDate = (data, cols) => {
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < cols.length; j++) {
      data[i][cols[j]] = stringToDate(data[i][cols[j]]);
    }
  }
};

const stringToDate = (s) => {
  try {
    return new Date(s.substr(0, 4), s.substr(5, 2), s.substr(8, 2));
  } catch (e) {}
};

// export const baseApi = setupBaseApi(appApi, projectColumns);
// export const {useGetDataQuery,useGetLocalDataQuery} = { appApi, appApi2};

export const { useGetDataQuery, useGetFakeDataQuery } = appApi;
