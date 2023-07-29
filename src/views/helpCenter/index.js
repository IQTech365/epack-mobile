import React from "react";
import {View, Text} from 'react-native';
import Header from "../../common/Header";
const spinner = require('../../images/loader.json');

const HelpCenterView = (props) => {

    return (
        <View>
            <Header canGoBack={true} label="Help Center" />
            <Text>Help Center</Text>
        </View>
    );
}

export default HelpCenterView;