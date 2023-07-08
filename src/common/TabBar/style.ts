import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_BLUE, COLOR_WHITE } from '../../utils/colors';

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    tabContainer: {
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 10,
        backgroundColor: COLOR_BLUE
    },
    tab: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 2,
    },
    text: {
        color: COLOR_WHITE,
        fontSize: 8,
    }
});

export default styles;