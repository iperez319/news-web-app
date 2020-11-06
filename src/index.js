import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import createSagaMiddleware from 'redux-saga';
import {configureStore} from '@reduxjs/toolkit';
import newsReducer from './slices/newsSlice';
import rootSaga from "./sagas";
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        news: newsReducer,
    },
    middleware: [sagaMiddleware]
});

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
