import React from "react";
import {View, Text} from 'react-native';
import Header from "../../common/Header";
const spinner = require('../../images/loader.json');

const ClientsPageView = (props:any) => {

    return (
        <View>
            <Header canGoBack={true} showDrawerIcon={true} label="Clients" />
            <Text>Clients</Text>
        </View>
    );
}

export default ClientsPageView;