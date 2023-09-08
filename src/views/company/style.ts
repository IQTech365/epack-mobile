import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_BLUE, COLOR_WHITE } from '../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR_WHITE,
        alignItems: 'center'
    },
    contentContainer: {
        flex: 0.9,
    },
    buttonContainer: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    prevButtonContainer: {
        width: '50%',
    },
    nextButtonContainer: {
        width: '50%',
    },
    buttonStyle: {
        backgroundColor: COLOR_BLUE,
        width: '80%',
        alignSelf: 'center'
    },
    buttonTextStyle: {
        color: COLOR_WHITE,
    }
});

export default styles;