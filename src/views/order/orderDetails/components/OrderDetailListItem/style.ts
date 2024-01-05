import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_BLACK, COLOR_GRAY, COLOR_GRAY2, COLOR_GRAY3 } from '../../../../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        // width: width,
        flexDirection: 'row',
        // backgroundColor: 'red',
        // paddingVertical: 10
    },
    labelContainer: {
        width: '40%',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLOR_GRAY2,
        justifyContent: 'center',
    },
    valueContainer: {
        width: '60%',
        alignSelf: 'flex-start',
        borderBottomWidth: 1,
        borderBottomColor: COLOR_GRAY2,
        backgroundColor: COLOR_GRAY3,
        justifyContent: 'center',
        paddingLeft: 12,
        paddingVertical: 10,
    },
    lastItemBorderStyle: {
        borderBottomWidth: 0,
    },
    labelText: {
        fontSize: 15,
        color: COLOR_BLACK,
        fontFamily: 'WorkSans-Medium'
    },
    valueText: {
        fontSize: 15,
        color: COLOR_GRAY,
        fontFamily: 'WorkSans-Regular'
    }
});

export default styles;