import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import _ from 'lodash';
import {Col, Row, Pagination} from "antd";
import NewsArticle from "../NewsArticle";

export default function NewsGrid(props){
    const {sportsHeadlines, entHeadlines, techHeadlines, type} = useSelector(state => state.news);
    const [currentPage, setCurrentPage] = useState(0);
    const [perPage, setPerPage] = useState(8);
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
        const newsSubset = sortedNews.slice(currentPage * perPage, Math.min((currentPage * perPage) + perPage, sortedNews.length))
        console.log(perPage)
        console.log(currentPage * perPage, Math.min((currentPage * perPage) + perPage, sortedNews.length))
        console.log(newsSubset)
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

    return (<div>
        {generateRows().map(item => <Row style={{marginTop: '20px'}}>{item}</Row>)}
        <Pagination total={sortedNews.length} pageSizeOptions={[8, 20, 60, 100]} defaultPageSize={8} onShowSizeChange={(current, size) => setPerPage(size)} onChange={(page) => setCurrentPage(page - 1)} style={{marginTop: '20px'}}/>
    </div>)
}
