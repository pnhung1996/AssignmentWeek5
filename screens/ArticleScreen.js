import React, { useState } from 'react';
import {Text, View, FlatList } from 'react-native';

import articleStyle from '../styles/ArticleStyle';

export default function ArticleScreen(){
    const [totalResult, setTotalResult] = useState(0);
    const [listArtical, setListArtical] = useState([]),
    const 
    return(
        <View style = {articleStyle.container}>
            <Text>Articles Count : {totalResult}</Text>
            <FlatList style = {articleStyle.listArticalStyle}
            data = {listArtical}/>
        </View>
    )
}