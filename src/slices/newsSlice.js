import { createSlice, createAction } from '@reduxjs/toolkit'

const newsSlice = createSlice({
    name: 'news',
    initialState: {
        news: [],
        techHeadlines: [],
        entHeadlines: [],
        sportsHeadlines: [],
        type: 'all'
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
        resetHeadlines(state, action) {
            state.headlines = [];
        },
    }
})

export const newsUpdateRequested = createAction('news/newsUpdateRequested');
export const getHeadlinesRequested = createAction('news/getHeadlinesRequested');

export const {newsUpdateSucceeded, getHeadlinesSucceeded, resetHeadlines} = newsSlice.actions;

export default newsSlice.reducer;
