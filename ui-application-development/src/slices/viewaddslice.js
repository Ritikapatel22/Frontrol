// import { createSlice } from "@reduxjs/toolkit";
// import {  getAddView } from "../helpers/utils";

// let selected =  getAddView();

// const initialState = {
//     // addView:{
//         data: [],
//         name: "Aged AR trend",
//         addWidget: [
//           {
//            newView: "Aged AR trend",
//           description: "Accounts receivable aging is a report categorizing a company's accounts receivable according to the length of time an invoice has been outstanding.",
//             title: "Aged AR trend",
//             ID: "1",
//             filters: ["Accounts receivable aging is a report categorizing a company's accounts receivable according to the length of time an invoice has been outstanding."],
//           },
//           {
//             newView: "Aged unbilled trend",
//           description: "The Unbilled Detail and Aging report displays the transactions that have been posted but not yet been billed as of the date you specify.",
//             title: "Aged unbilled trend",
//             ID: "2",
//             filters: [
//               "The Unbilled Detail and Aging report displays the transactions that have been posted but not yet been billed as of the date you specify.",
//             ],
//           },
//           {
//             newView: "Net receivables",
//           description: "Net receivables are the total money owed to a company by its customers minus the money owed that will likely never be paid.",
//             title: "Net receivables",
//             ID: "3",
//             filters: [
//               "Net receivables are the total money owed to a company by its customers minus the money owed that will likely never be paid.",
//             ],
//           },
//         ],
//     //   },

//       selectedAddView: selected
//   ? selected
//   : {
//       title: "Aged unbilled trend",
//       ID: "2",
//       filters: [
//         "The Unbilled Detail and Aging report displays the transactions that have been posted but not yet been billed as of the date you specify.",
//       ],
//     },

     
// }

// const viewaddslice = createSlice({
//     name: "addView",
//     initialState,
//     reducers: {
     
     
//       selectedAddView: (state, action) => {
//         localStorage.setItem("view", JSON.stringify(action.payload));
//         state.addWidget = action.payload;
//       },
//       setDefaultAddView: (state) => {
//         localStorage.setItem("view", JSON.stringify(initialState.data[2]));
//         state.addWidget = initialState.data[2];
//       },
//       changeViewName: (state, action) => {
//         const { id, newView, description } = action.payload;
//         state.addView.addWidget.forEach((data, index) => {
//           if (data._uid === id) {
//             if (newView) state.addView.addWidget[index].newView = newView;
//             if (description)
//               state.addView.addWidget[index].description = description;
//           }
//         });
//       },
      
//     },
//   });
//   export const {
//     changeViewName,
//     // selectedView,
//     setDefaultView,
//     selectedAddView
//   } = viewaddslice.actions;
//   const { reducer } = viewaddslice;
//   export default reducer;
  



 
  