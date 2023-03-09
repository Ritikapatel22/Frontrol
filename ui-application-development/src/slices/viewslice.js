import { createSlice, current } from "@reduxjs/toolkit";
import { getSelectedView, uid } from "../helpers/utils";
// import {projectViews,portfolioViews} from "./constant"
import {widgetslices} from "./widgetslice"
import { t } from 'i18next';


let selected = getSelectedView();
// let selectedViewData = selected.json_data.widgets.map((val) =>{return val})

const initialState = {
  widgets: widgetslices,
  views: [],
  selectedView: null, //selected ? selected.view_id : "",
  newView: null,
  restoreIDs : [],
  widgetdeteleIDs : [],
  dublicateWidgetIDs : [],
  selectedPortfolioID : null,
  selectedProjectID : null,
  duplicateViewID : [],
  globalViewID : [],
  isFullScreen : null
};

// const defaultView = initialState.views.find((val) => {
//   return val.default === "Y" && val;
// });

const viewslice = createSlice({
  name: "view",
  initialState,
  reducers: {
    initialedState : (state,action)=>{
      const projectID = window.location.href.split("/project/")[1]
      //state.views = projectID ? projectViews : portfolioViews
    },
    updateWidget: (state, action) => {
      const { id,syncToDataBase, ...rest } = action.payload;
      const views = [...current(state).views];
      const viewIndex = views.findIndex(
        (view) => view.view_id === current(state).selectedView.view_id
      );
      const widgets = views[viewIndex]?.json_data?.widgets.map((widget) => {
        if (widget?.instanceId === id) {
          return { ...widget, ...rest };
        }
        return widget;
      });
      views[viewIndex] = { ...views[viewIndex], json_data: { widgets } };
      //state.views = [...views];
      syncToDataBase(views[viewIndex], "U")
    },
    deleteWidget: (state, action) => {
      const { id , syncToDataBase } = action.payload;
      const views = [...current(state).views];
      const viewIndex = views.findIndex(
        (view) => view.view_id === current(state).selectedView.view_id
      );
      const widgets = views[viewIndex]?.json_data?.widgets.filter((widget) => {
        if (widget?.instanceId === id) {
          return widget.instanceId !== id;
        }
        return widget;
      });
      views[viewIndex] = { ...views[viewIndex], json_data: { widgets } };
      state.widgetdeteleIDs.push({
        view_id : views[viewIndex].view_id,
        widget_id : id
      })
      syncToDataBase(views[viewIndex], "U")
     // state.views = [...views];
    },
    duplicateWidget: (state, action) => {
      let { id , syncToDataBase, ...rest } = action.payload;
      const views = [...current(state).views];
      const viewIndex = views.findIndex(
        (view) => view.view_id === current(state).selectedView.view_id
        );
        const widgets = [...views[viewIndex]?.json_data.widgets];
        const widgetIndex = widgets.findIndex(
          (widget) => widget.instanceId === id
          );
      const uniqId = uid();
      if (widgetIndex >= 0) {
        widgets.splice(widgetIndex + 1, 0, {
          ...widgets[widgetIndex],
          instanceId: uniqId,
          name: widgets[widgetIndex].name? widgets[widgetIndex].name + "-Copy" : t(`${widgets[widgetIndex]?.component}_title`, {ns: 'message'}) + "-Copy",
          description: widgets[widgetIndex].name ? widgets[widgetIndex].description : t(`${widgets[widgetIndex]?.component}_desc`, { ns : 'message'}),
          isModified : true
        });
        state.dublicateWidgetIDs.push({
          view_id : views[viewIndex].view_id,
          widget_id : widgets[widgetIndex].instanceId
        }) 
      }
      views[viewIndex] = { ...views[viewIndex], json_data: { widgets } };
      //state.views = [...views];
      syncToDataBase(views[viewIndex], "U")
    },
    toggleFullScreen: (state, action) => {    

      const views = [...current(state).views];
      
      const viewIndex = views.findIndex(
        (view) => view.view_id === current(state).selectedView
      );

      const widgets = views[viewIndex]?.json_data?.widgets?.map((widget) => {
        if (widget?.instanceId === action.payload.id) {
          return { ...widget, isFullScreen: action.payload.isFullScreen };
        }
        return widget;
      });
      views[viewIndex] = { ...views[viewIndex], json_data: { widgets } };
      state.views = [...views];
    },
    handleAddView: (state, action) => {
      const { data, newView} = action.payload;
      if (newView) {
        state.views = [...state.views, data];
      } else {
        const views = [...current(state.views)];
        state.views = views.map((view) => {
          if (view?.view_id === data?.view_id) {
            return data;
          }
          return view;
        });
      }
    },
    handleViewOperation: (state, action) => {
      const { op, data, syncToDataBase, viewType  } = action.payload;
      const views = [...current(state.views)];
      let index = -1;

      if (op !== 'restoreView') {
        index = views.findIndex((view) => view.view_id === data.view_id);
      } else {
        index = views.findIndex((view) => view.view_id === data.created_from_view_id);
      }

      const widgets = Array.isArray(views[index]?.json_data?.widgets) ? [
        ...views[index]?.json_data?.widgets?.map((val) => {
          return val;
        }),
      ] : [];
      const widgetsArr = widgets?.map((data) => {
        const uniqId = uid();   
        return {
          ...data,
          component : data.component ? data.component :  widgets.find((e) => e.name === data.name).component,
          instanceId: data.instanceId ? data.instanceId : uniqId,
        };
      });
      switch (op) {
        case "duplicate":
          const name = data.view_name.length > 50 ?  data.view_name.substr(0, 20) + data.view_name.substr(30, data.view_name.length) : views[index].view_name
            const checkDuplicate = views.filter((val) => {
              return val.view_name === name + " - Copy" || (val.view_name).replace(/[(0-9)]/g, "") === (name + " - Copy").replace(/[(0-9)]/g, "")
            })
            const copy = checkDuplicate?.length > 0 ? ` - Copy(${checkDuplicate?.length})` : " - Copy"
          if (index >= 0) {
            const addedData = {
              ...views[index],
              view_name: name + copy,
              json_data: {
                widgets: widgetsArr
              },
              global: "N",
              default_flag: "N",
            };
            delete addedData.view_id;
            delete addedData.created_from_view_id;
            //state.views = [...views];
            state.duplicateViewID.push(views[index].view_id)
            syncToDataBase(addedData , "C") 
          }
          break;
        case "seededView":
          if (index >= 0) {
            const addedData =  {
              ...views[index],
              //view_id: uid(),
              created_from_view_id: data.view_id,
              view_name: views[index].view_name + ' ',
              json_data: {
                widgets: widgetsArr
              },
              global: "N",
              default_flag: "N",
            };
            state.globalViewID.push(data.view_id)
            delete addedData.view_id;
            //views.splice(index + 1, 0,addedData);
            //state.views = [...views];
            syncToDataBase(addedData , "C") 
          }
          break;
        case "restoreView":
          if (index >= 0) {
            const restoredData =  views.find((view) => view.view_id === data.view_id);
            state.restoreIDs.push( views[index].view_id)
            syncToDataBase(restoredData , "D") 
            const addedData =  {
              ...views[index],
              //view_id: uid(),
              created_from_view_id: views[index].view_id,
              view_name: views[index].view_name + ' ',
              json_data: {
                widgets: widgetsArr
              },
              global: "N",
              default_flag: "N",
            };
            delete addedData.view_id;
            //views.splice(index + 1, 0,addedData);
            //state.views = [...views];
            syncToDataBase(addedData , "C") 
          }
          break;
        case "delete":
          if (index >= 0) {
            const deletedData = views[index];
           // state.views = [...views];
            syncToDataBase(deletedData , "D") 
          }
          break;
        case "default":
          if (index >= 0) {
            //const viewData = JSON.parse(JSON.stringify(views));
            const v = { ...views[index] };
            v.default_flag = "Y";
            // const modifiedViews = viewData.map((newView) => {
            //   if (newView.view_id === data.view_id) {
            //     return v;
            //   }
            //   const otherView = { ...newView };
            //   otherView.default_flag = "N";
            //   return otherView;
            // });
            // state.views = modifiedViews;
            syncToDataBase(v, 'U')
          }
          break;
        default:
          break;
      }
    },
    setDefaultView: (state) => {
      // localStorage.setItem("defaultView", JSON.stringify(defaultView));
      // state.selectedView = defaultView?.view_id;
    },
    selectedView: (state, action) => {
      state.selectedView = action.payload;
    },
   
    changeView: (state, action) => {
      const views = JSON.parse(JSON.stringify(action.payload))
      views.sort(function (a , b) {
        if(a.created_from_view_id && b.created_from_view_id) {
          if(a.view_name < b.view_name) return -1
          if(a.view_name > b.view_name) return 1
          return 0
        }
        if (a.created_from_view_id && !b.created_from_view_id) return -1
        if (!a.created_from_view_id && b.created_from_view_id) return 1
        if(!a.created_from_view_id && !b.created_from_view_id) {
          if(a.view_name < b.view_name) return -1
          if(a.view_name > b.view_name) return 1
          return 0
        } 
      })
      state.views = views
    },
    changeScreen : (state,action) => {
      state.isFullScreen = action.payload
    },
    changeRestoreIDs : (state, action) => {
      state.restoreIDs = action.payload
    },
    changeWidgetdeteleIDs : (state, action) => {
      state.widgetdeteleIDs = action.payload
    },
    changeDuplicateWidgetIDs : (state, action) => {
      state.dublicateWidgetIDs = action.payload
    },
    changeSelectedPortfolioID : (state , action) => {
      state.selectedPortfolioID = action.payload
    },
    changeSelectedPorjectID : (state , action) => {
      state.selectedProjectID = action.payload
    },
    changeDuplicateViewID : (state , action) => {
      state.duplicateViewID = action.payload
    }
  },
});
export const {
  initialedState,
  updateWidget,
  deleteWidget,
  duplicateWidget,
  toggleFullScreen,
  addView,
  selectedView,
  selectedView2,
  setDefaultView,
  selectedAddView,
  handleAddView,
  handleViewOperation,
  changeView ,
  changeSelectedView,
  changeRestoreIDs,
  changeWidgetdeteleIDs,
  changeDuplicateWidgetIDs,
  changeSelectedPortfolioID,
  changeSelectedPorjectID,
  changeDuplicateViewID,
  changeScreen
} = viewslice.actions;
const { reducer } = viewslice;
export default reducer;
