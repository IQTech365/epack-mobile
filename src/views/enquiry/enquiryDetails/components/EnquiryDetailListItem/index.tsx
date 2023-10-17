import React from "react";
import {View, Text} from 'react-native';
import styles from './style';

interface IEnquiryDetailListItemProps {
    label?: string;
    value?: string;
    isLast?: boolean;
}

const EnquiryDetailListItem:React.FC<IEnquiryDetailListItemProps> = ({label, value, isLast = false}) => {

    const lastItemStyle = isLast ? styles.lastItemBorderStyle : {};

    return (
        <View style={styles.container}>
            <View style={[styles.labelContainer, lastItemStyle]}>
                <Text>{label}</Text>
            </View>
            <View style={[styles.valueContainer, lastItemStyle]}>
                <Text>{value}</Text>
            </View>
        </View>
    );
}

export default EnquiryDetailListItem;