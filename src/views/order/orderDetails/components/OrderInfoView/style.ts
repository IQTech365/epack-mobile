import {StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
import { COLOR_BLUE2, COLOR_WHITE } from '../../../../../utils/colors';

const styles = StyleSheet.create({
    container: {
        width: width,
        height: 120,
        resizeMode: 'stretch',
    },
    backgroundContainer: {
        width: width,
        height: 120,
        backgroundColor: COLOR_BLUE2
    },
    innerContainer: {
        width: width,
        height: '100%',
        alignItems: 'center',
        flexDirection: 'row',
    },
    leftContainer: {
        width: '90%',
    },
    infoContainer: {
        width: '100%',
        flexDirection: 'row',
        paddingVertical: 2,
    },
    iconItemContainer: {
        width: '10%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    itemContainer: {
        width: '50%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingLeft: 8,
    },
    nameText: {
        color: COLOR_WHITE,
        fontSize: 18,
        fontFamily: 'WorkSans-SemiBold'
        // fontWeight: '600',
    },
    labelText: {
        color: COLOR_WHITE,
        fontSize: 14,
        fontFamily: 'WorkSans-Medium'
    },
    valueText: {
        color: COLOR_WHITE,
        fontSize: 14,
        fontFamily: 'WorkSans-Medium'
    },
    normalText: {
        color: COLOR_WHITE,
        fontSize: 14,
        fontFamily: 'WorkSans-Medium'
    },
    hyphenText: {
        color: COLOR_WHITE,
        fontSize: 16,
    },
    labelContainer: {
        width: '30%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    hyphenContainer: {
        width: '10%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    valueContainer: {
        width: '60%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    }
});

export default styles;