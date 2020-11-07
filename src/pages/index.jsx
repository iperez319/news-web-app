import React, {useState, useEffect} from "react";
import {useDispatch, useSelector, connect} from "react-redux";
import {newsUpdateRequested, getHeadlinesRequested, resetHeadlines} from "../slices/newsSlice";
import NewsArticle from '../components/NewsArticle';
import {Input, Switch, Space} from 'antd';
import _ from "lodash";
import NewsGrid from '../components/NewsGrid';
import {useSelector} from 'react-redux';yar

export default function HomePage(props){

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getHeadlinesRequested("technology"));
        dispatch(getHeadlinesRequested("entertainment"));
        dispatch(getHeadlinesRequested("sports"));
    }, [])

    const {Search} = Input;
    const

    const handleToggle = () => {

    }

    return (
        <div>
            <div style={{padding: '40px 40px 40px 40px', display: 'flex', flexDirection: 'column'}}>
                <Search enterButton={"Search"} size={"large"} style={{width: '500px', alignSelf: 'center'}}></Search>
                <div style={{alignSelf: 'center', marginTop: '10px'}}>
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
