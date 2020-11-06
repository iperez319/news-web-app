import {all, fork} from 'redux-saga/effects';
import {watchUpdateNews, watchGetHeadlines} from "./newsSaga";

export default function* rootSaga() {
    yield all([
        fork(watchUpdateNews),
        fork(watchGetHeadlines),
    ])
};
