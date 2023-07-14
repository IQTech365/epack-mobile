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
        </View>
    );
}

export default HomePageView;