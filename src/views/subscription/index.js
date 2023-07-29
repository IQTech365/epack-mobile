import React from "react";
import {View, Text} from 'react-native';
import Header from "../../common/Header";
const spinner = require('../../images/loader.json');

const SubscriptionView = (props) => {

    return (
        <View>
            <Header canGoBack={true} label="Subscription" />
            <Text>Subscription</Text>
        </View>
    );
}

export default SubscriptionView;