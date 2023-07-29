import React from "react";
import {View, Text} from 'react-native';
import Header from "../../common/Header";
const spinner = require('../../images/loader.json');

const HomePageView = (props) => {

    return (
        <View>
            <Header canGoBack={true} showDrawerIcon={true} label="Home" />
            <Text>Home</Text>
        </View>
    );
}

export default HomePageView;