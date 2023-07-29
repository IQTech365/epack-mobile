import React from "react";
import {View, Text} from 'react-native';
import Header from "../../common/Header";
const spinner = require('../../images/loader.json');

const NewsRoomView = (props) => {

    return (
        <View>
            <Header canGoBack={true} label="News Room" />
            <Text>News Room</Text>
        </View>
    );
}

export default NewsRoomView;