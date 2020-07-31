import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Text, View, FlatList, Alert, ActivityIndicator, Image, TouchableOpacity } from 'react-native';

import articleStyle from '../styles/ArticleStyle';

function itemArticle({ item }) {
    return (
        <View style={{ width: '100%', flexDirection : 'column', marginTop : 10, borderWidth : 1, borderColor : "#d7d7d7", padding : 5}}>
            <Text style = {{textAlign : 'center', marginBottom : 5}}>{item.title}</Text>
            <Image source = {{uri:item.urlToImage===null?'https://img.lovepik.com/element_origin_pic/17/10/14/ed1abd6a19e6d685f18d9b0f65209f6e.png_wh860.png':item.urlToImage}} style = {{width : '100%', height : 200}}/>
            <View style = {{flexDirection : 'row'}}>
                <Text style = {{fontWeight : 'bold', marginRight : 10}}>Source</Text>
                <Text style = {{color : "#AAAAAA"}}>{item.source?.name}</Text>
            </View>
            <Text>
                {item.content}
            </Text>
            <View style = {{flexDirection : 'row'}}>
                <Text style = {{fontWeight : 'bold', marginRight : 10}}>Published</Text>
                <Text style = {{color : "#AAAAAA"}}>{item.publishedAt}</Text>
            </View>
            <TouchableOpacity style = {{width : '100%', height : 40, alignItems : 'center', justifyContent : 'center', backgroundColor : "#3366CC", borderRadius : 5}}>
                <Text style = {{color : "#ffffff"}}>Read more</Text>
            </TouchableOpacity>
        </View>
    )
}


export default function ArticleScreen() {
    const [totalResult, setTotalResult] = useState(0);
    const [listArtical, setListArtical] = useState([]);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const footer = useMemo(()=> <View style = {{width : '100%', height : 20, }}/>)

    async function getAritcle() {
        try {
            const API_KEY = '5bb89d150854476da57590f2d8fcfca3';
            const api = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}&pageSize=20&page=${page}`;
            const data = await fetch(api);
            const listData = await data.json();

            const response = [...listData.articles];
            if (response.length == 0) {
                return;
            }
            setListArtical(listArtical.concat(response));
            setPage(page + 1);
            setLoading(false);
        } catch (error) {

        }
    }

    useEffect(() => { getAritcle() }, []);
    if (loading) {
        return (
            <View style = {articleStyle.container}>
                <ActivityIndicator size="large" loading={loading} />
            </View>
        )
    }
    return (
        <View style={articleStyle.container}>

            <Text>Articles Count : {listArtical.length}</Text>
            <FlatList style={articleStyle.listArticalStyle}
                data={listArtical}
                onEndReached={()=>{getAritcle()}}
                renderItem={({ item }) => itemArticle({ item })}
                keyExtractor={(item, index) => (item.source.id + item.source.name + index)} 
                ListFooterComponent = {()=>footer}/>
        </View>
    )
}