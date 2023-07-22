import React from "react";
import {View, Text} from 'react-native';
import styles from './style';

interface IOrderDetailListItemProps {
    //
}

const OrderDetailListItem:React.FC<IOrderDetailListItemProps> = ({}) => {

    return (
        <View style={styles.container}>
            <View style={styles.labelContainer}>
                <Text>Enquiry Source</Text>
            </View>
            <View style={styles.valueContainer}>
                <Text>Website</Text>
            </View>
        </View>
    );
}

export default OrderDetailListItem;