import React from "react";
import {View, Text} from 'react-native';
import Header from "../../common/Header";
import styles from "./style";

interface IEnquiryPageViewProps {

}

const EnquiryPageView:React.FC<IEnquiryPageViewProps> = ({}) => {

    return <View style={styles.container}>
        <Header label="Enquiry Management" />
    </View>
}

export default EnquiryPageView;