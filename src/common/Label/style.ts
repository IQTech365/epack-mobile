import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_WHITE } from '../../utils/colors';
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        // width: width,
        paddingVertical: 8,
    },
    text: {
        color: COLOR_WHITE,
        fontSize: 14,
    }
});

export default styles;