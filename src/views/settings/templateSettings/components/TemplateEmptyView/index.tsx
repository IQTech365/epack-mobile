import React, { FC } from "react";
import {Text, View} from 'react-native';
import styles from './style';

const TemplateEmptyView:FC<{}> = ({}) => {

    return <View style={styles.container}>
        <Text style={styles.text}>No Templates Found!</Text>
    </View>
}

export default TemplateEmptyView;