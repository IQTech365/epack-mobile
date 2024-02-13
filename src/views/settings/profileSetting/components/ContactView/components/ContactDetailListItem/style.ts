import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_BLACK, COLOR_GRAY, COLOR_GRAY4, COLOR_GRAY5, COLOR_GRAY6 } from '../../../../../../../utils/colors';
const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
    cardWrapper: {
        borderRadius: 5,
        alignItems: 'center',
        alignSelf: 'center',
    },
    container: {
        width: width * 0.94,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        padding: 5,
        flexDirection: 'row',
    },
    contentContainer: {
        width: '85%',
    },
    actionContainer: {
        width: '15%',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    content: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    label: {
        fontSize: 16,
        color: COLOR_BLACK,
        fontFamily: 'WorkSans-SemiBold',
    },
    text: {
        fontSize: 15,
        color: COLOR_GRAY,
        fontFamily: 'WorkSans-Regular',
    }
});

export default styles;