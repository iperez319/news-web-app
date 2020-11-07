import { createSlice, createAction } from '@reduxjs/toolkit'

const newsSlice = createSlice({
    name: 'news',
    initialState: {
        news: [],
        techHeadlines: [],
        entHeadlines: [],
        sportsHeadlines: [],
        showTech: true,
        showEnt: true,
        showSports: true,
    },
    reducers: {
        newsUpdateSucceeded(state, action) {
            state.news = action.payload;
        },
        getHeadlinesSucceeded(state, action) {
            const {type, data} = action.payload;
            const newData = data.map(item => {
                item.type = type
                return item
            })
            switch(type){
                case "technology":
                    state.techHeadlines = newData;
                    break;
                case "sports":
                    state.sportsHeadlines = newData;
                    break;
                case "entertainment":
                    state.entHeadlines = newData;
                    break;
            }
        },
        updateTypeFilter(state, action){
            const {type, val} = action.payload;
            if (type == "technology"){
                state.showTech = val
            }
            else if (type == "sports"){
                state.showSports = val
            }
            else if (type == "entertainment") {
                state.showEnt = val
            }
        },
        resetHeadlines(state, action) {
            state.headlines = [];
        },
    }
})

export const newsUpdateRequested = createAction('news/newsUpdateRequested');
export const getHeadlinesRequested = createAction('news/getHeadlinesRequested');

export const {newsUpdateSucceeded, getHeadlinesSucceeded, updateTypeFilter} = newsSlice.actions;

export default newsSlice.reducer;
