import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import _ from 'lodash';
import {Col, Row, Pagination} from "antd";
import NewsArticle from "../NewsArticle";

export default function NewsGrid(props){
    const {sportsHeadlines, entHeadlines, techHeadlines, type, showEnt, showSports, showTech} = useSelector(state => state.news);
    const [currentPage, setCurrentPage] = useState(0);
    const [perPage, setPerPage] = useState(8);
    var news = []

    if(showTech){
        news = _.concat(news, techHeadlines);
    }
    if(showEnt){
        news = _.concat(news, entHeadlines);
    }
    if(showSports){
        news = _.concat(news, sportsHeadlines);
    }

    var sortedNews = _.sortBy(news, (item) => {
        return item.publishedAt;
    }).reverse();

    const generateRows = () => {
        const newsSubset = sortedNews.slice(currentPage * perPage, Math.min((currentPage * perPage) + perPage, sortedNews.length))
        var rows = Math.floor(newsSubset.length/4)
        var results = [];
        for(let i = 0; i < rows; i++){
            var start = i * 4;
            var end = Math.min(i * 4 + 4,  newsSubset.length);
            results.push(newsSubset.slice(start, end).map(item => {
                return <Col span={6}><NewsArticle article={item}/></Col>
            }))
        }
        return results;
    }

    console.log(sortedNews.length)

    return (<div style={{display: 'flex', flexDirection: 'column'}}>
        {generateRows().map(item => <Row style={{marginTop: '20px'}}>{item}</Row>)}
        <Pagination total={sortedNews.length} pageSizeOptions={[8, 20, 60, 100]} defaultPageSize={8} onShowSizeChange={(current, size) => setPerPage(size)} onChange={(page) => setCurrentPage(page - 1)} style={{marginTop: '20px', alignSelf: 'center'}}/>
    </div>)
}
