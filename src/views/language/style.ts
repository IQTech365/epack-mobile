import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_GRAY2, COLOR_WHITE } from '../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR_WHITE,
    },
    item: {
        width: width * 0.9,
        alignSelf: 'center',
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: COLOR_GRAY2,
        borderRadius: 5,
        marginBottom: 8,
    },
    itemDisable: {
        width: width * 0.9,
        alignSelf: 'center',
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: COLOR_GRAY2,
        borderRadius: 5,
        marginBottom: 8,
    }
});

export default styles;