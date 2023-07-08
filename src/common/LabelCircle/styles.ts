import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_BLUE, COLOR_WHITE } from '../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        width: width * 0.55,
        height: width * 0.55,
        borderBottomRightRadius: width * 0.95,
        backgroundColor: COLOR_BLUE,
    },
    text: {
        color: COLOR_WHITE,
        fontSize: 24,
        marginTop: '30%',
        marginLeft: '25%',
    }
});

export default styles;