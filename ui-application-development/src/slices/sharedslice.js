import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currencyInfo : null
};

export const sharedSlice = createSlice({
    name: "shared",
    initialState,
    reducers: {
        changeCurrencyInfo: (state, action) => {
            state.currencyInfo = action.payload
        },
    },
});
export const {
    changeCurrencyInfo
  } = sharedSlice.actions;
  const { reducer } = sharedSlice;
  export default reducer;