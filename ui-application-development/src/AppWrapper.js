import React ,{useState, useEffect} from 'react'
// import ReactDOM from "react-dom/client";
import { createRoot } from 'react-dom/client'
import { Provider , useSelector} from 'react-redux'
// import { createStore, applyMiddleware, combineReducers } from "redux";
// import thunk from "redux-thunk";
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import ScrollToTop from './components/scrolltotop'
import { rootPath } from './config'
import { PersonalizationProvider, selectToken, userSettingsFactory } from "@frontrolinc/pace-ui-framework";

export const AppWrapper = () => {
    const authentication = useSelector(selectToken)

    const forceUpdate = useForceUpdate()
    useEffect(() => {
      userSettingsFactory.subscribe("changeUserSettings", (ev) => {
        // forceUpdate()
        // window.location.reload()
        // console.log("ev-------------->", ev);
      })
      return () => {
        userSettingsFactory.unsubscribe('changeUserSettings')
      }
    }, [])
    

  return (
    <>
    {authentication ? ( 
        <PersonalizationProvider>
           <BrowserRouter basename={rootPath}>
             <ScrollToTop />
             <App />
          </BrowserRouter>
          </PersonalizationProvider>) : (
          <BrowserRouter basename={rootPath}>
            <ScrollToTop />
            <App />
        </BrowserRouter>)}
    </>
  )
}

export function useForceUpdate(){
  const [value, setValue] = useState(0); 
  return () => setValue(value => value + 1); 
}