import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_BLUE, COLOR_GRAY, COLOR_WHITE, DISABLED_COLOR } from '../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    fillContainer: {
        width: width * 0.9,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        backgroundColor: COLOR_WHITE,
        borderRadius: 40,
    },
    borderContainer: {
        width: width * 0.9,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: COLOR_WHITE,
        borderRadius: 4,
    },
    text: {
        fontSize: 18,
        color: COLOR_GRAY,
        fontFamily: 'WorkSans-SemiBold'
    },
    disabled: {
        opacity: 0.7,
    }
});

export default styles;