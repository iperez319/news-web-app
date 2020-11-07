import React, {useState, useEffect} from "react";
import {useDispatch, useSelector, connect} from "react-redux";
import {newsUpdateRequested, getHeadlinesRequested, resetHeadlines} from "../slices/newsSlice";
import NewsArticle from '../components/NewsArticle';
import {Input, Switch, Space} from 'antd';
import _ from "lodash";
import NewsGrid from '../components/NewsGrid';

export default function HomePage(props){

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getHeadlinesRequested("technology"));
        dispatch(getHeadlinesRequested("entertainment"));
        dispatch(getHeadlinesRequested("sports"));
    }, [])

    const {Search} = Input;

    return (
        <div>
            <div style={{padding: '40px 40px 40px 40px'}}>
                <Search enterButton={"Search"} size={"large"} style={{width: '500px'}}></Search>
                <div>
                    <Space align={'center'}>
                        <Switch></Switch>
                        <p style={{marginBottom: '0px'}}>Entertainment</p>
                        <Switch></Switch>
                        <p style={{marginBottom: '0px'}}>Sports</p>
                        <Switch></Switch>
                        <p style={{marginBottom: '0px'}}>Technology</p>
                    </Space>
                </div>
                <NewsGrid/>
            </div>
        </div>
    )

}
