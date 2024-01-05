import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_BLACK, COLOR_BLUE, COLOR_GRAY, COLOR_GRAY2, COLOR_WHITE } from '../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: COLOR_GRAY,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },
    containerActive: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR_BLUE,
        borderWidth: 1,
        borderColor: COLOR_BLUE,
        marginRight: 8,
    },
    activeText: {
        color: COLOR_WHITE,
        fontSize: 12,
        fontFamily: 'WorkSans-Medium',
    },
    inactiveText: {
        color: COLOR_BLACK,
        fontSize: 12,
        fontFamily: 'WorkSans-SemiBold'
    }
});

export default styles;
