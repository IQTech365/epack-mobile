import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_BLACK, COLOR_BLUE, COLOR_GRAY, COLOR_GRAY2 } from '../../../../../utils/colors';
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        width: width * 0.95,
        paddingVertical: 5,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'flex-end',
        marginBottom: 8,
        backgroundColor: COLOR_GRAY2,
    },
    button: {
        borderWidth: 1,
        borderRadius: 25,
        borderColor: COLOR_BLUE,
        paddingHorizontal: 20,
        paddingVertical: 6,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: COLOR_BLACK,
        fontSize: 14,
        fontFamily: 'WorkSans-Regular'
    },
    itemMainWrapper: {
        width: width * 0.9,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    itemContentContainer: {
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    labelContainer: {
        width: '45%',
        alignItems:'center',
        justifyContent: 'flex-start',
    },
    valueContainer: {
        width: '55%',
        alignItems:'center',
        justifyContent: 'flex-start',
    },
    label: {
        color: COLOR_BLACK,
        fontFamily: 'WorkSans-Medium',
        fontSize: 14,
    },
    value: {
        color: COLOR_BLACK,
        fontFamily: 'WorkSans-Regular',
        fontSize: 14,
    }
});

export default styles;