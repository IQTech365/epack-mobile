import React from "react";
import {View, Text} from 'react-native';
import Header from "../../common/Header";
import HomeIcon from '../../images/icons/home.svg';
import Lottie from 'lottie-react-native';
const spinner = require('../../images/loader.json');

const HomePageView = (props) => {

    return (
        <View>
            <Header />
            <Text>Home</Text>
            <HomeIcon width={200} height={200} />
            <Lottie source={spinner} autoPlay loop style={{width: 50, height: 50}}/>
        </View>
    );
}

export default HomePageView;