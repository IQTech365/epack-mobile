import React, { FunctionComponent } from "react";
import {View, StyleSheet, Text} from 'react-native';
import Icon from '../../../../../images/icons/order-black.svg';
import Spacer from "../../../../../common/Spacer";
import { COLOR_BLACK, COLOR_GRAY2 } from "../../../../../utils/colors";

interface Props {
    label:string
}

const OrderDocument:FunctionComponent<Props> = ({label}) => {
    return <View style={styles.container}>
        <Icon width={20} height={20} />
        <Spacer width={5} />
        <Text style={styles.label}>{label}</Text>
    </View>
}

export default OrderDocument

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 16,
        backgroundColor: COLOR_GRAY2,
        borderRadius: 25,
        marginRight: 10,
        marginTop: 5,
    },
    label: {
        color: COLOR_BLACK,
        fontFamily: 'WorkSans-SemiBold',
        fontSize: 14,
    }

});
