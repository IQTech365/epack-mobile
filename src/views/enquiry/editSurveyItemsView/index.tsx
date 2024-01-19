import React, { FC } from "react";
import {View, Text} from 'react-native';
import styles from './style';
import Header from "../../../common/Header";

interface IProps {}

const EditSurveyItemsView:FC<IProps> = ({}) => {

    return <View style={styles.container}>
        <Header canGoBack={true} label="Edit Survey Items" />
    </View>
}

export default EditSurveyItemsView;