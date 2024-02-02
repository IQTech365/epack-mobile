import React, { FC } from "react";
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './style';
import { IOtherCharge } from "../../../../InvoiceReducer2";
import DeleteIcon from '../../../../../../../../../images/icons/delete.svg';

interface IProps {
    item:IOtherCharge;
    index:number;
    onDelete: (index: number) => void;
}

const OtherChargeItem:FC<IProps> = ({item, index, onDelete}) => {

    return <View style={styles.itemWrapper}>
        <View style={styles.contentContainer}>
            <View style={styles.content}>
                <Text style={styles.label2}>Particular Name: </Text>
                <Text style={styles.label}>{item.particular_name}</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.label2}>Quantity: </Text>
                <Text style={styles.label}>{item.quantity}</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.label2}>Rate Per Item: </Text>
                <Text style={styles.label}>{item.rate_per_item}</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.label2}>HSN Code: </Text>
                <Text style={styles.label}>{item.hsn_code}</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.label2}>Amount: </Text>
                <Text style={styles.label}>{item.amount}</Text>
            </View>
        </View>
        <View style={styles.actionContainer}>
            <TouchableOpacity onPress={() => onDelete(index)}>
                <DeleteIcon width={30} height={30} />
            </TouchableOpacity>
        </View>
    </View>
}

export default OtherChargeItem;