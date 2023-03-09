import React from "react";
// import ReactDOM from "react-dom/client";
import { createRoot } from "react-dom/client";
import { Provider, useSelector } from "react-redux";
// import { createStore, applyMiddleware, combineReducers } from "redux";
// import thunk from "redux-thunk";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import store from "./app/store";
import ScrollToTop from "./components/scrolltotop";
import { rootPath } from "./config";
import { useUpdateDataMutation, useFetchDataQuery } from "./app/appApi";
import { AppWrapper } from "./AppWrapper";
import './i18n';
const container = document.getElementById("root");
const root = createRoot(container);
import generateColumns from './columnDefination'
import {extractTranslation, extractDeltaLang} from './extractTranslation'
import { getLoginUrl } from './helpers/utils'

window.addEventListener('storage', (event) => {
  if (event.key === 'isLoggedIn' && event.newValue === 'false') {
    const redirectUrl = getLoginUrl()
    window.location.replace(`${redirectUrl}?logout=true`);
  }
})

root.render(
  <Provider store={store}>
    <AppWrapper />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
//  generateColumns();
//extractTranslation('grid', 'fn')
//extractDeltaLang('message')

