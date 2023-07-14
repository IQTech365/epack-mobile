import React from "react";
import {View, Text} from 'react-native';
import Header from "../../common/Header";
import styles from "./style";

interface IQuotationPageViewProps {

}

const QuotationPageView:React.FC<IQuotationPageViewProps> = ({}) => {

    return <View style={styles.container}>
        <Header label="Quotation Management" />
    </View>
}

export default QuotationPageView;