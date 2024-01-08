import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_BLACK, COLOR_BLUE, COLOR_GRAY, COLOR_GRAY2, COLOR_GRAY3, COLOR_WHITE } from '../../../../../utils/colors';
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
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: COLOR_GRAY2,
    },
    itemContentContainer: {
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    labelContainer: {
        width: '45%',
        alignItems:'flex-start',
        justifyContent: 'center',
        backgroundColor: COLOR_GRAY3,
        paddingVertical: 8,
        paddingLeft: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: COLOR_GRAY2,
    },
    valueContainer: {
        width: '55%',
        alignItems:'flex-start',
        justifyContent: 'center',
        backgroundColor: COLOR_WHITE,
        paddingVertical: 8,
        paddingLeft: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: COLOR_GRAY2,
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
    },
    viewDetailsContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderTopWidth: 0.5,
        borderTopColor: COLOR_GRAY3,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
      },
      viewDetailsText: {
        color: COLOR_BLACK,
        fontSize: 13,
        fontFamily: 'WorkSans-Medium'
      },
});

export default styles;