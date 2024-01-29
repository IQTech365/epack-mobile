import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_BLACK, COLOR_GRAY, COLOR_GRAY2 } from '../../../../../../../utils/colors';
const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        width: width * 0.95,
        alignSelf: 'center',
        borderWidth: 0.5,
        borderColor: COLOR_BLACK,
        borderRadius: 5,
        padding: 5,
        marginBottom: 8,
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
        fontFamily: 'WorkSans-Medium',
    },
    text: {
        fontSize: 15,
        color: COLOR_BLACK,
        fontFamily: 'WorkSans-Regular',
    }
});

export default styles;