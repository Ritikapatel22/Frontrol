import { createSlice, current } from "@reduxjs/toolkit";
import { uid } from "../helpers/utils";

const initialState = {
  data: [],
  selectedPortfolio: null,
  newPortfolio: null,
  refreshTime: null,
  projects: null,
  searchResult : null,
  filter : null,
  error : null,
  isLoading : false,
  route: "Portfolio dashboard",
};

const porfolioslice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {

    updatePortfolio: (state, action) => {
      const { data, newPortfolios } = action.payload;
      const ID = uid()
      const newData = {
        default_portfolio: "N",
        description: data.description,
        portfolio_id: ID,
        portfolio_name: data.portfolio_name,
        public: "N",
        published: "Y"
      }
      if (newPortfolios) {
        state.data = [...state.data, newData];
      } else {
        const portfolio = [...state.data];
        state.data = portfolio.map((portfolio) => {
          if (portfolio?.portfolio_id === data?.portfolio_id) {
            return data;
          }
          return portfolio;
        });
      }
    },

    handlePortfolioOperation: (state, action) => {
      const { op, data, syncToDataBase, PortfolioDetails } = action.payload;
      const ID = uid()
      const portfolio = [...current(state.data)];
      const index = portfolio.findIndex((portfolio) => portfolio?.portfolio_id === data?.portfolio_id);
      switch (op) {
        case "duplicate":
          if (index >= 0) {
            const name = data.portfolio_name.length > 50 ?  data.portfolio_name.substr(0, 20) + data.portfolio_name.substr(30, data.portfolio_name.length) : portfolio[index].portfolio_name
            const checkDuplicate = portfolio.filter((val) => {
              return val.portfolio_name === name + " - Copy" || (val.portfolio_name).replace(/[(0-9)]/g, "") === (name + " - Copy").replace(/[(0-9)]/g, "")
            })
            const copy = checkDuplicate?.length > 0 ? ` - Copy(${checkDuplicate?.length})` : " - Copy"
            const added = {
              ...portfolio[index],
              source_portfolio_id :data.portfolio_id,
              portfolio_id: ID,
              portfolio_name: name + copy,
              default_portfolio: "N",
              public: "N",
              published: "Y",
              PortfolioDetails: PortfolioDetails
            };
            delete added.portfolio_id
            delete added.seed_order
            delete added.favorite_flag
            data.public === "N" && delete added.source_portfolio_id
            // state.data = [...portfolio];
            syncToDataBase(added, 'C')
          }
          break;
        case "delete":
          if (index >= 0) {
            const deletedData = portfolio[index];
            syncToDataBase(deletedData, "D")
          };
          break;
        case "default":
          if (index >= 0) {
            const v = { ...portfolio[index] };
            v.default_portfolio = "Y";
            delete v.seed_order
            delete v.favorite_flag
            syncToDataBase(v, 'U')
          }
          break;
        case "favorite":
          if (index >= 0) {
            const portfolioData = JSON.parse(JSON.stringify(portfolio));
            const p = { ...portfolioData[index] };
            if (data.favorite_flag !== "Y") {
              p.favorite_flag = "Y";
            } else {
              p.favorite_flag = "N";
            }
            const modifiedPortfolio = portfolioData.map((newPortfolio) => {
              if (newPortfolio.portfolio_id === data.portfolio_id) {
                return p;
              }
              return { ...newPortfolio };
            });
            state.data = modifiedPortfolio;
          }
          break;
        default:
          break;
      }
    },

    advanceFavourite : (state,action) => {
      const { data } = action.payload;
      const result = [...current(state.searchResult)];
      const index = result.findIndex((val) => val?.project_id === data?.project_id);
      const allData = JSON.parse(JSON.stringify(result));
      const p = { ...allData[index] };
      if (data?.favourite_flag !== "Y") {
        p.favourite_flag = "Y";
      } else {
        p.favourite_flag = "N";
      }
      const modifiedData = allData.map((newData) => {
        if (newData?.project_id === data?.project_id) {
          return p;
        }
        return { ...newData };
      });
     state.searchResult = modifiedData
    },

    setNewCreatedPortfolio: (state, action) => {
      state.newPortfolio = action.payload
    },

    setPortfolios: (state, action) => {
      state.data = action.payload;
    },

    setDefaultPortfolio: (state) => {
      // state.selectedPortfolio = initialState.data[2];
      // console.log("sefautlportfolio");
    },

    selectedPortFolio: (state, action) => {
      state.selectedPortfolio = action.payload
    },

    clearPortfolio: (state) => {
      localStorage.removeItem("portfolio");
      state = initialState;
    },

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

    setProjects: (state, action) => {
      state.projects = action.payload;
    },

    setStatus : (state,action) => {
      state.isLoading = action.payload
    },

    setSearchResult : (state,action) => {
      state.searchResult = action.payload
    },

    setErrorValue : (state,action) =>{
      state.error = action.payload
    },
    
    setFilterValue : (state,action) => {
      state.filter = action.payload
    },

    setTimeAndProject: (state) => {
      state.refreshTime = null;
      state.projects = null;
    },
    changedPortfolio: (state, action) => {
      const portfolios = JSON.parse(JSON.stringify(action.payload))
      state.data = portfolios
    }
  },
})
export const {
  setNewCreatedPortfolio,
  initialedState,
  selectedPortFolio,
  clearPortfolio,
  setRefreshTime,
  setProjects,
  setDefaultPortfolio,
  setTimeAndProject,
  setRoute,
  updatePortfolio,
  setPortfolios,
  handlePortfolioOperation,
  changedPortfolio,
  setSearchResult,
  setFilterValue,
  setErrorValue,
  setStatus,
  advanceFavourite
} = porfolioslice.actions;
const { reducer } = porfolioslice;
export default reducer;
