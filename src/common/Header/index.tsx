import React from "react";
import {View, TouchableOpacity, Text} from 'react-native';
import ArrowLeftIcon from '../../images/icons/arrow-left.svg';
import MoreIcon from '../../images/icons/more-vertical.svg';
import styles from "./styles";

const Header = (props:any) => {
    const {onSearchPress, onNotificationPress, label} = props || {};

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
            <TouchableOpacity style={styles.logo}>
                <ArrowLeftIcon width={24} height={24} />
            </TouchableOpacity>
            <Text style={styles.text}>{label}</Text>
            </View>
            <View style={styles.actionContainer}>
                <TouchableOpacity style={styles.icon} onPress={onNotificationPress}>
                    <MoreIcon />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Header;