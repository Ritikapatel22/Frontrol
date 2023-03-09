import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    myProjects : null,
    recents : null,
    favourites : null
}

export const projectListSlice = createSlice({
    name: 'ProjectView',
    initialState,
    reducers: {
        changeProjectsView: (state, action) => {
            state.myProjects = action.payload
        },
        changeRecentsView: (state, action) => {
            state.recents = action.payload
        },
        changeFavouritesView: (state, action) => {
            const favourites = action.payload.map((e)=> ({...e , favourite_flag : "Y"}))
            state.favourites = favourites
        },
        changeFavoutiteFlag: (state, action) => {
            const {flag, projectId} = action.payload
            const allProjectList = JSON.parse(JSON.stringify(state.myProjects));
            const allRecents = JSON.parse(JSON.stringify(state.recents));
            const allFavourite = JSON.parse(JSON.stringify(state.favourites));
            if (Array.isArray(allRecents)) {
            const recentProject = allRecents.find(
              (ele) => projectId === ele.project_id
            );
            if (recentProject) recentProject.favourite_flag = flag;
            state.recents = allRecents;
            }
            if (Array.isArray(allProjectList)) {
            const newProject = allProjectList.find(
              (ele) => projectId === ele.project_id
            );

            if (newProject) newProject.favourite_flag = flag;
            state.myProjects = allProjectList;
            }

            if (Array.isArray(allFavourite)){
            if (flag === 'Y'){
              if (Array.isArray(allRecents) && Array.isArray(allProjectList)) {
              const newFavourite = allRecents.find(
                (ele) => projectId === ele.project_id
              );
              if (newFavourite) allFavourite.push(newFavourite);
              if (!newFavourite) {
                const newFavouriteFromProjectList = allProjectList.find(
                  (ele) => projectId === ele.project_id
                );
                if (newFavouriteFromProjectList) {
                allFavourite.push(newFavouriteFromProjectList);
                }
              }
              state.favourites = allFavourite;
            }
            } else {
              const newFavourite = allFavourite.filter(
                (ele) => projectId !== ele.project_id
              );
              state.favourites = newFavourite;
            }
        }
        },
    }
});

export const {changeProjectsView , changeRecentsView, changeFavouritesView, changeFavoutiteFlag} = projectListSlice.actions;

export const projectsView = (state) => state.myProjects;
export const recentsView = (state) => state.recents;
export const favouritesView = (state) => state.favourites;

export default projectListSlice.reducer;
