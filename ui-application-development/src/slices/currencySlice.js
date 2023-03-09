import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currency: "USD",
  currencyRate: null,
  shouldConvert: true,
};
export const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    changeCurrency: (state, action) => {
      state.currency = action.payload;
    },
    changeCurrencyRate: (state, action) => {
      state.currencyRate = action.payload;
    },
    changeShouldConvert: (state, action) => {
      state.shouldConvert = action.payload;
    },
  },
});
export const { changeCurrency } = currencySlice.actions;
export const { changeCurrencyRate } = currencySlice.actions;
export const { changeShouldConvert } = currencySlice.actions;
export const allCurrency = (state) => state.currency;
export const allCurrencyRate = (state) => state.currencyRate;
export const shouldConvertBool = (state) => state.shouldConvert;
export default currencySlice.reducer;
