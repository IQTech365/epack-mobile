import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_BLUE, COLOR_WHITE } from '../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        width: width,
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 8,
        backgroundColor: COLOR_BLUE,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
    },
    icon: {
        width: 24,
        height: 24,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    spacer: {
        width: 12,
        height: 12,
    },
    text: {
        color: COLOR_WHITE,
        fontSize: 16,
    }
});

export default styles;