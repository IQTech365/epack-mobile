import React, { FC } from "react";
import { Dimensions, StyleSheet, View } from 'react-native';
import Header from "../../common/Header";

interface IProps {}

const TodayFollowup:FC<IProps> = ({}) => {

    return <View>
        <Header label="Today's Followup" canGoBack={true} />
    </View>
}

export default TodayFollowup;

const {width} = Dimensions.get('screen');
const styles = StyleSheet.create({});