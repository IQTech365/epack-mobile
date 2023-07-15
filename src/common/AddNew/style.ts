import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_BLUE, COLOR_GRAY, COLOR_GRAY2, COLOR_WHITE } from '../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 8,
    },
    rowItemLeftContainer: {
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    rowItemRightContainer: {
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    countLabel: {
        color: COLOR_GRAY,
        fontSize: 14,
        fontWeight: '500',
    },
    countValue: {
        color: COLOR_GRAY,
        fontSize: 12,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: COLOR_BLUE,
        borderRadius: 5,
        backgroundColor: COLOR_BLUE
    },
    buttonText: {
        color: COLOR_WHITE,
        fontSize: 12,
        marginLeft: 6,
        fontWeight: '500'
    },
});

export default styles;