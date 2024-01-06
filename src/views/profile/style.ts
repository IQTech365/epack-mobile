import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_BLACK, COLOR_GRAY, COLOR_GRAY2, COLOR_WHITE } from '../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR_WHITE,
        alignItems: 'center'
    },
    tabsContainer: {
        width: width,
    },
    listItemContainer: {
        width: width * 0.9,
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: COLOR_GRAY2,
        marginVertical: 5,
        paddingHorizontal: 5,
        paddingVertical: 10,
    },
    text: {
        color: COLOR_BLACK,
        fontSize: 16,
        fontFamily: 'WorkSans-SemiBold'
    }
});

export default styles;