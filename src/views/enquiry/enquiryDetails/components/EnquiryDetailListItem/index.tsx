import React from "react";
import {View, Text} from 'react-native';
import styles from './style';

interface IEnquiryDetailListItemProps {
    //
}

const EnquiryDetailListItem:React.FC<IEnquiryDetailListItemProps> = ({}) => {

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

export default EnquiryDetailListItem;