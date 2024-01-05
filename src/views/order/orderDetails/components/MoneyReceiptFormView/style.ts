import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_BLACK, COLOR_BLUE, COLOR_GRAY2, COLOR_WHITE } from '../../../../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR_WHITE,
        alignItems: 'center',
    },
    elementContainer: {
        width: width * 0.9,
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    elementContainer2: {
        width: width * 0.9,
        alignSelf: 'center',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    itemContainer: {
        width: width * 0.44,
        justifyContent: 'space-between',
        alignSelf: 'center',
    },
    label: {
        color: COLOR_BLACK,
        fontSize: 14,
        fontFamily: 'WorkSans-Medium'
    },
    inputContainer: {
        width: '100%',
        borderColor: COLOR_GRAY2,
        paddingLeft: 4,
    },
    input: {
        color: COLOR_BLACK,
        fontSize: 14,
    },
    textStyle: {
        color: COLOR_WHITE,
      },
      previewButtonStyle: {
        backgroundColor: COLOR_BLUE,
        borderRadius: 5,
      },
});

export default styles;