import React, {useState, useEffect} from "react";
import {useDispatch, useSelector, connect} from "react-redux";
import {newsUpdateRequested, getHeadlinesRequested, resetHeadlines} from "../slices/newsSlice";
import NewsArticle from '../components/NewsArticle';
import {Row, Col} from 'antd';
import _ from "lodash";
import NewsGrid from '../components/NewsGrid';

export default function HomePage(props){

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getHeadlinesRequested("technology"));
        dispatch(getHeadlinesRequested("entertainment"));
        dispatch(getHeadlinesRequested("sports"));
    }, [])

    return (
        <div>
            <div style={{padding: '40px 0px 40px 40px'}}>
                <NewsGrid/>
            </div>
        </div>
    )

}
