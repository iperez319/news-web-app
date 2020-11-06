import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import _ from 'lodash';
import {Col, Row} from "antd";
import NewsArticle from "../NewsArticle";

export default function NewsGrid(props){
    const {sportsHeadlines, entHeadlines, techHeadlines, type} = useSelector(state => state.news);
    var news = []
    switch(type){
        case "all":
            news = _.concat(techHeadlines, sportsHeadlines, entHeadlines);
            break;
        case "technology":
            news = techHeadlines;
            break;
        case "entertainment":
            news = entHeadlines;
            break;
        case "sports":
            news = sportsHeadlines;
            break;
        default:
            break;
    }
    var sortedNews = _.sortBy(news, (item) => {
        return item.publishedAt;
    }).reverse();

    const generateRows = () => {
        var rows = Math.floor(sortedNews.length/4)
        console.log(rows);
        var results = [];
        for(let i = 0; i < rows; i++){
            var start = i * 4;
            var end = Math.min(i * 4 + 4, sortedNews.length);
            console.log(sortedNews.slice(start, end))
            results.push(sortedNews.slice(start, end).map(item => {
                return <Col span={6}><NewsArticle article={item}/></Col>
            }))
        }
        return results;
    }

    return generateRows().map(item => <Row style={{marginTop: '20px'}}>{item}</Row>)
}
