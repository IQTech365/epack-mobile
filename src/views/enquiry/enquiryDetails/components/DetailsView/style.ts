import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_WHITE } from '../../../../../utils/colors';
const {width, height} = Dimensions.get('window');

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
    },
    modalStyle: {
        width: width,
        height: height
    },
    headerStyle: {
        width: width,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
});

export default styles;