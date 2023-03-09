import { getQueryStringValue } from '@frontrolinc/pace-ui-framework'
import { LOGIN_MODE, LOGIN_MODE_KEY } from '../hooks/useLoginMode'
import { SSO_PROXY_LOGIN_URL, TOKEN_RENEWAL_TIME_KEY } from './constants'
import { t } from 'i18next';

export function uid() {
  return (
    String.fromCharCode(Math.floor(Math.random() * 26) + 97) +
    Math.random().toString(16).slice(2) +
    Date.now().toString(16).slice(4)
  )
}

export function chunkArray(arr, chunkSize = 1) {
  const result = []
  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize))
  }
  return result
}

export function getSelectedPortfolio() {
  try {
    return JSON.parse(localStorage.getItem('portfolio'))
  } catch (error) {
    return null
  }
}

export function getPortfolioID() {
  let portfolioID
  try {
    portfolioID = Number(getQueryStringValue('portfolio'))
  } catch (e) {
    portfolioID = 1
  }
  return portfolioID
}

export function getSelectedView() {
  try {
    // return JSON.parse(localStorage.getItem("defaultView"));
  } catch (error) {
    return null
  }
}

export function getViewID() {
  let viewID
  try {
    // viewID = parseInt(JSON.parse(localStorage.getItem("view")).ID);
  } catch (e) {
    viewID = 1
  }

  return viewID
}

export function getAddView() {
  try {
    return JSON.parse(localStorage.getItem('AddView'))
  } catch (error) {
    return null
  }
}

export function getAddViewID() {
  let AddViewID
  try {
    AddViewID = parseInt(JSON.parse(localStorage.getItem('AddView')).ID)
  } catch (e) {
    AddViewID = 1
  }

  return AddViewID
}

export function getTableHeight() {
  const height = window.innerHeight
  return height - 200
}

export function isDevelopmentMode() {
  return process.env.REACT_APP_DEVELOPMENT_MODE === 'Y'
}

export const isSSOMode = () => Boolean(localStorage.getItem(TOKEN_RENEWAL_TIME_KEY)) || localStorage.getItem(LOGIN_MODE_KEY) === LOGIN_MODE.SSO

export const isLoginMode = () => localStorage.getItem(LOGIN_MODE_KEY) === LOGIN_MODE.LOGIN

export const isDefaultLoginSSO =  process.env.REACT_APP_DEFAULT_LOGIN_MODE === 'SSO'

export function getLoginUrl() {
  if (isSSOMode()) {
    return '/ssologin'
  }
  return '/login'
}

export const openSSO = () => window.location.href = SSO_PROXY_LOGIN_URL

export const timeSince = (date) => {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + ` ${t("years")} ${t("ago")}`;
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + ` ${t("month")} ${t("ago")}`;
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + ` ${t("days")} ${t("ago")}`;
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + ` ${t("hours")} ${t("ago")}`;
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + ` ${t("minutes")} ${t("ago")}`;
  }
  return Math.floor(seconds) + ` ${t("seconds")} ${t("ago")}`;
}

export const starCase = (string) => {
  return `${string.charAt(0).toUpperCase()}${string.toLowerCase().slice(1)}`;
}