import React from "react";
import {View, Text} from 'react-native';
import Header from "../../common/Header";
const spinner = require('../../images/loader.json');

const NotificationView = (props) => {

    return (
        <View>
            <Header canGoBack={true} showDrawerIcon={true} label="Home" />
            <Text>Notification</Text>
        </View>
    );
}

export default NotificationView;