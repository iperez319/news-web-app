import React, {useState, useEffect} from "react";
import {useDispatch, useSelector, connect} from "react-redux";
import {getHeadlinesRequested, updateTypeFilter} from "../slices/newsSlice";
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

    const {showEnt, showSports, showTech} = useSelector(state => state.news);

    const handleToggle = (type) => {
        switch(type){
            case "technology":
                dispatch(updateTypeFilter({type, val: !showTech}));
                break;
            case "entertainment":
                dispatch(updateTypeFilter({type,val: !showEnt}));
                break;
            case "sports":
                dispatch(updateTypeFilter({type, val: !showSports}));
                break;
        }
    }

    return (
        <div>
            <div style={{padding: '40px 40px 40px 40px', display: 'flex', flexDirection: 'column'}}>
                <Search enterButton={"Search"} size={"large"} style={{width: '500px', alignSelf: 'center'}}></Search>
                <div style={{alignSelf: 'center', marginTop: '10px'}}>
                    <Space align={'center'}>
                        <Switch checked={showEnt} onClick={() => handleToggle("entertainment")}></Switch>
                        <p style={{marginBottom: '0px'}}>Entertainment</p>
                        <Switch checked={showSports} onClick={() => handleToggle("sports")}></Switch>
                        <p style={{marginBottom: '0px'}}>Sports</p>
                        <Switch checked={showTech} onClick={() => handleToggle("technology")}></Switch>
                        <p style={{marginBottom: '0px'}}>Technology</p>
                    </Space>
                </div>
                <NewsGrid/>
            </div>
        </div>
    )

}
