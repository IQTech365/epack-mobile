import React from "react";
import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import { COLOR_BLACK, COLOR_BLUE, COLOR_WHITE } from "../../utils/colors";
import UnlockIcon from '../../images/unlock_icon.svg';
const {width, height} = Dimensions.get('window');

interface IProps {
    onPress: () => void;
}

const EmptyPlanCard = ({onPress}: IProps) => {

    return <View style={styles.container}>
        <View style={styles.content}>
            <Text style={styles.title}>You don't have any Active Plan.</Text>
            <Text style={styles.title}>Click on <Text style={styles.buyNow}>Buy Now</Text> and unlock more features.</Text>
            <UnlockIcon height={height * 0.4} width={width * 0.9}/>
            <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
                <Text style={styles.buttonText}>Buy Now</Text>
            </TouchableOpacity>
        </View>
    </View>
};

export default EmptyPlanCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        alignSelf: 'center',
    },
    title: {
        fontFamily: 'WorkSans-Regular',
        fontSize: 16,
        color: '#232b2b',
        textAlign: 'center'
    },
    buyNow: {
        fontSize: 16,
        color: COLOR_BLACK,
        fontFamily: 'WorksSans-Bold',
    },
    buttonContainer: {
        paddingVertical: 8,
        alignItems: 'center',
        backgroundColor: COLOR_BLUE,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        fontFamily: 'WorkSans-Medium',
        fontSize: 16,
        color: COLOR_WHITE,
    }
});