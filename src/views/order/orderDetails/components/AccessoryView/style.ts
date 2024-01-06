import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_BLACK, COLOR_GRAY, COLOR_GRAY2 } from '../../../../../utils/colors';
const {width} =Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        width: width * 0.9,
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: COLOR_GRAY2,
        borderRadius: 5,
        paddingVertical: 8,
    },
    labelContainer: {
        width: '50%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderRightColor: COLOR_GRAY,
        borderRightWidth: 1,
        paddingLeft: 8,
    },
    optionContainer: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    } ,
    labelText: {
        color: COLOR_BLACK,
        fontFamily: 'WorkSans-Medium',
        fontSize: 14,
    }
});

export default styles;