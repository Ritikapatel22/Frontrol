import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import LoginDataService from "../services/authservices";
import { uid } from "../helpers/utils";

let initialState = {
  intial: [],
  isLoading: false,
  loading: false,
  profilePicAvailable: false,
  Views: [
    {
      name: "Billing view",
      widgets: [
        {
          name: "test",
          filters: [{ param: "Unit", operator: "equal", value: "test" }],
          component: "test",
          _uid: uid(),
        },
      ],
    },
    {
      name: "Costing view",
      widgets: [
        {
          name: "test1",
          filters: [{ param: "Unit", operator: "equal", value: "test" }],
          component: "test",
          _uid: uid(),
        },
      ],
    },
  ],
  currenctCurrency: "USD",
  currencyInfo: {
    currency: "GBP", //Multiple
    currencyRate: "1.25",
    multipleCurrency: "1 USD = 1.25 CAD, 1 USD = 1.5 NZD, 1 USD = 0.76 GBP", //1 USD = 1.25 CAD, 1 USD = 1.5 NZD, 1 USD = 0.76 GBP
  },
  userProfile: null
};

export const createLogin = createAsyncThunk("/", async (data) => {
  const res = await LoginDataService.create(data);
  const timestamp = new Date().getTime();
  const addMlSeconds = 60 * 60 * 1000;
  const loginTill = new Date(timestamp + addMlSeconds).getTime();
  localStorage.setItem("timestamp", loginTill);
  localStorage.setItem("conversionrate", 1);
  localStorage.setItem("user", JSON.stringify(res.data));
  return res.data;
});

const loginSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    switchCurrency: (state, action) => {
      state.currency = action.payload;
    },

    multipleCurrency: (state, action) => {
      state.multipleCurrency = action.payload;
    },

    selectedDrag: (state, action) => {
      const { id, name } = action.payload;
      state.selectedView.widgets.forEach((data, index) => {
        if (data._uid === id) {
          if (name) state.selectedView.widgets[index].name = name;
        }
      });
    },

    selectedPortFolio: (state, action) => {
      const { id, title, value } = action.payload;
      state.portfolio.forEach((data, index) => {
        if (data._uid === id) {
          if (title) state.portfolio[index].title = title;
          if (value) state.selectedView.portfolio[index].value = value;
        }
      });
    },
    changeWidth: (state, action) => {
      state.selectedView.widgets.forEach((data, index) => {
        if (data._uid === action.payload.id) {
          state.selectedView.widgets[index].fullWidth = action.payload.value;
        }
      });
    },

    changeCurrency: (state, action) => {
      state.currenctCurrency = action.payload;
    },

    updateAuthState: (state, action) => {
      state.isLoading = action.payload;
    },

    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    setProfilePicAvailable: (state, action) => {
      state.profilePicAvailable = action.payload;
    },
    clearAuth: (state) => {
      state.token = null;
      state.data = null;
    },
    reset: (state) => {
      state = undefined
    }
  },

  extraReducers: {
    [createLogin.fulfilled]: (state, action) => {
      state.loading = true;
      state.data = action;
      state.token = action.payload.Message[0].token;
    },
  },
});
export const selectToken = (state) => state.loginAuth.authUser.token;
export const {
  selectedDrag,
  changeWidth,
  updateAuthState,
  selectedPortFolio,
  changeCurrency,
  switchCurrency,
  multipleCurrency,
  orderWidget,
  setUserProfile,
  setProfilePicAvailable,
  reset,
} = loginSlice.actions;

const { reducer } = loginSlice;
export default reducer;
