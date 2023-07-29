import React from "react";
import {View, Text} from 'react-native';
import Header from "../../common/Header";
const spinner = require('../../images/loader.json');

const SettingsView = (props) => {

    return (
        <View>
            <Header canGoBack={true} label="Settings" />
            <Text>Settings</Text>
        </View>
    );
}

export default SettingsView;