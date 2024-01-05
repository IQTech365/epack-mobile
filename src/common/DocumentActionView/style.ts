import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_BLACK, COLOR_GRAY2, COLOR_GRAY5 } from '../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        // marginBottom: 10,
        justifyContent: 'space-between',
        backgroundColor: COLOR_GRAY2,
        paddingVertical: 8,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    action: {
        width: '25%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionText: {
        color: COLOR_BLACK,
        fontSize: 12,
        fontFamily: 'WorkSans-Medium'
    }
});

export default styles;