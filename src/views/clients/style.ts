import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_BLACK, COLOR_WHITE } from '../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: COLOR_WHITE
    },
    listContent: {
        alignItems: 'center', 
        paddingVertical: 10, 
        paddingHorizontal: 5,
    },
    text: {
        color: COLOR_BLACK,
        fontFamily: 'WorkSans-Regular',
        fontSize: 14,
    },
    clientCount: {
        color: COLOR_BLACK,
        fontFamily: 'WorkSans-Medium',
        fontSize: 16,
    }
});

export default styles;