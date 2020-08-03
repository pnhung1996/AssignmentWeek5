import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
    Text,
    View,
    FlatList,
    Alert,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    Linking,
    RefreshControl
} from 'react-native';

import articleStyle from '../styles/ArticleStyle';

function listEmpty() {
    return (
        <View style={articleStyle.container}>
            <Image source={{ uri: 'https://i.pinimg.com/originals/ae/8a/c2/ae8ac2fa217d23aadcc913989fcc34a2.png' }} style={{ width: '100%', height: 300 }} />
        </View>
    )
}

function itemArticle({ item }) {
    return (
        <View style={{ width: '100%', flexDirection: 'column', marginTop: 10, borderWidth: 1, borderColor: "#d7d7d7", padding: 5 }}>
            <Text style={{ textAlign: 'center', marginBottom: 5 }}>{item.title}</Text>
            <Image source={{ uri: item.urlToImage === null ? 'https://img.lovepik.com/element_origin_pic/17/10/14/ed1abd6a19e6d685f18d9b0f65209f6e.png_wh860.png' : item.urlToImage }} style={{ width: '100%', height: 200 }} />
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', marginRight: 10 }}>Source</Text>
                <Text style={{ color: "#AAAAAA" }}>{item.source?.name}</Text>
            </View>
            <Text>
                {item.content}
            </Text>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', marginRight: 10 }}>Published</Text>
                <Text style={{ color: "#AAAAAA" }}>{item.publishedAt}</Text>
            </View>
            <TouchableOpacity
                style={{
                    width: '100%',
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: "#3366CC",
                    borderRadius: 5
                }}
                onPress={() => { Linking.openURL(item.url) }}>
                <Text style={{ color: "#ffffff" }}>Read more</Text>
            </TouchableOpacity>
        </View>
    )
}

export default function ArticleScreen() {
    const [listArtical, setListArtical] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [page, setPage] = useState(1);
    function footer() {
        return (
            <View style={{ width: '100%', height: 20, }} />
        )
    };

    async function onRefresh() {
        try {
            setRefreshing(true);
            console.log(page + ":" + listArtical.length);
            const API_KEY = '5bb89d150854476da57590f2d8fcfca3';
            const api = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}&pageSize=5&page=${page}`;
            const data = await fetch(api);
            const listData = await data.json();

            const response = [...listData.articles];
            setLoading(false);
            setRefreshing(false);
            console.log(response.length);
            if (response.length == 0) {
                return;
            }
            setListArtical(response.concat(listArtical));
            setPage(page + 1);
        } catch (error) {

        }
    }

    async function getAritcle() {
        try {
            const API_KEY = '5bb89d150854476da57590f2d8fcfca3';
            const api = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}&pageSize=5&page=${page}`;
            const data = await fetch(api);
            const listData = await data.json();

            const response = [...listData.articles];
            setLoading(false);
            if (response.length == 0) {
                return;
            }
            setListArtical(listArtical.concat(response));
            setPage(page + 1);
        } catch (error) {

        }
    }

    const list = useMemo(() => <FlatList style={articleStyle.listArticalStyle}
        data={listArtical}
        onEndReached={() => { getAritcle() }}
        renderItem={({ item }) => itemArticle({ item })}
        keyExtractor={(item, index) => (item.source.id + item.source.name + index)}
        ListFooterComponent={() => footer()}
        ListEmptyComponent={() => listEmpty()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
    />, [listArtical])

    useEffect(() => { getAritcle() }, []);
    const refresh = useCallback(() => { onRefresh() }, [refreshing]);
    if (loading) {
        return (
            <View style={articleStyle.container}>
                <ActivityIndicator size="large" loading={loading} />
            </View>
        )
    }

    return (
        <View style={articleStyle.displayContainer}>

            <Text>Articles Count : {listArtical.length}</Text>
            {list}
        </View>
    )
}