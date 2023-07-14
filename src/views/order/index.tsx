import React from "react";
import {View, Text} from 'react-native';
import Header from "../../common/Header";
import styles from "./style";

interface IOrderPageViewProps {

}

const OrderPageView:React.FC<IOrderPageViewProps> = ({}) => {

    return <View style={styles.container}>
        <Header label="Order Management" />
    </View>
}

export default OrderPageView;