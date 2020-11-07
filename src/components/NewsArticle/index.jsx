import React, {useState, useEffect} from 'react';
import {Avatar, Space, Tag, Button, Typography} from 'antd';
import {useSelector} from 'react-redux';
import moment from 'moment';
import psl from 'psl';
import {
    SyncOutlined,
} from '@ant-design/icons';

export default function NewsArticle(props){

    const {article} = props;
    const { Title, Paragraph } = Typography;
    let typeTag = null;

    switch(article.type){
        case "technology":
            typeTag = <Tag color={'red'}>Tech</Tag>
            break;
        case "sports":
            typeTag = <Tag color={'blue'}>Sports</Tag>
            break;
        case "entertainment":
            typeTag = <Tag color={'orange'}>Entertainment</Tag>
            break;
        default:
            typeTag = <Tag color={'magenta'}>Unknown</Tag>
            break;
    }

    const extractHostname = (url) => {
        var hostname;
        //find & remove protocol (http, ftp, etc.) and get hostname

        if (url.indexOf("//") > -1) {
            hostname = url.split('/')[2];
        }
        else {
            hostname = url.split('/')[0];
        }

        //find & remove port number
        hostname = hostname.split(':')[0];
        //find & remove "?"
        hostname = hostname.split('?')[0];
        return psl.parse(hostname).domain;
    }

    const generateCardNoImage = () => {
        return (
            <div style={{width: '275px', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', padding: '5px'}}>
                <div style={{display: 'flex', flexDirection: 'column', padding: '5px 10px 5px 10px'}}>
                    <div style={{marginBottom: '10px'}}>
                        {typeTag}
                        {/*<Tag icon={<SyncOutlined spin />} color="processing">*/}
                        {/*    Checking Paywall*/}
                        {/*</Tag>*/}
                    </div>
                    <h5 style={{color: '#656565', fontWeight: '600'}}>{moment.utc(article.publishedAt).from(moment())} {article.author == null || article.author == "" ? "" : "/ By " + article.author.replace('By ', '')}</h5>
                    <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                        <Space>
                            <Avatar style={{backgroundColor: '#80808040'}} src={`https://${extractHostname(article.url)}/favicon.ico`}/>
                            <span>{article.source.name}</span>
                        </Space>
                    </div>
                    <Title level={3} ellipsis={{rows: 2}} style={{lineHeight: 'normal', fontSize: '20px', marginBottom: '10px'}}>{article.title}</Title>
                    {
                        article.description ? <p style={{lineHeight: 'normal', marginBottom: '10px'}}>{article.description}</p> : null
                    }
                    <Button type={'link'} style={{color: '#1890FF'}} onClick={() => window.open(article.url)}>Go to Article</Button>
                </div>
            </div>
        )
    }
    const generateCardWithImage = () => {
        return (
            <div style={{width: '275px', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)'}}>
                <div style={{position: 'relative'}}>
                    {/*<img style={{width: '100%', borderRadius: '10px 10px 0px 0px'}} src={article.urlToImage}/>*/}
                    <div style={{width: '100%', background:`url(${article.urlToImage}) no-repeat scroll center center`, backgroundSize: 'cover', objectFit: 'cover', height: '200px'}}></div>
                    <div style={{position: 'absolute', top: '15px', left: '15px'}}>
                        {typeTag}
                        {/*<Tag icon={<SyncOutlined spin />} color="processing">*/}
                        {/*    Checking Paywall*/}
                        {/*</Tag>*/}
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', padding: '5px 10px 5px 10px'}}>
                    <h5 style={{color: '#656565', fontWeight: '600'}}>{moment.utc(article.publishedAt).from(moment())} {article.author == null || article.author == "" ? "" : "/ By " + article.author.replace('By ', '')}</h5>
                    <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                        <Space>
                            <Avatar style={{backgroundColor: '#80808040'}} src={`https://${extractHostname(article.url)}/favicon.ico`}/>
                            <span>{article.source.name}</span>
                        </Space>
                    </div>
                    <Title level={3} ellipsis={{rows: 2}} style={{lineHeight: 'normal', fontSize: '20px', marginBottom: '10px'}}>{article.title}</Title>
                    {
                        article.description ? <Paragraph ellipsis={{rows: 2, expandable: true}} style={{marginBottom: '10px'}}>{article.description}</Paragraph> : null
                    }
                    <Button type={'link'} style={{color: '#1890FF'}} onClick={() => window.open(article.url)}>Go to Article</Button>
                </div>
            </div>
        )
    }

    return article.urlToImage == null ? generateCardNoImage() : generateCardWithImage();
}
