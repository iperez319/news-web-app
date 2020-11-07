import { put, call, takeEvery } from 'redux-saga/effects';
import {newsUpdateRequested, newsUpdateSucceeded, getHeadlinesRequested, getHeadlinesSucceeded} from "../slices/newsSlice";
import {get} from "../utils";

function* getHeadlines(action){
    var {category, query} = action.payload;
    try{
       var response = yield call(get, `https://newsapi.org/v2/top-headlines?category=${category}&pageSize=100&country=us&apiKey=78b9d599c4f94f8fa3afb1a5458928d6` + (query.length > 0 ? "&q=" + query : ""));
       yield put(getHeadlinesSucceeded({type: category, data: response.articles}));
    }
    catch (e){
        console.log(e);
    }
}

export function* watchGetHeadlines(){
    yield takeEvery(getHeadlinesRequested.toString(), getHeadlines);
}

function* updateNews(action){
    var query = action.payload;
    try{
        var response = yield call(get(`https://newsapi.org/v2/everything?${query.length > 0 ? "q=" : ""}${query.length > 0 ? query + "&" : query}apiKey=78b9d599c4f94f8fa3afb1a5458928d6`))
        yield put(newsUpdateSucceeded(response.data))
    }
    catch (e) {
        console.log(e);
    }
}

export function* watchUpdateNews(){
    yield takeEvery(newsUpdateRequested.toString(), updateNews);
}



