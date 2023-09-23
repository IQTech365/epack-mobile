import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_BLUE, COLOR_GRAY2 } from '../../../../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        width: width * 0.45,
        marginLeft: 12,
        marginTop: 8,
        borderWidth: 1,
        borderColor: COLOR_GRAY2,
    },
    template: {
        width: width * 0.45,
        height: width * 0.45,
        resizeMode: 'stretch'
    },
    activeContainer: {
        width: width * 0.45,
        marginLeft: 12,
        marginTop: 8,
        borderWidth: 1,
        borderColor: COLOR_BLUE,
    },
});

export default styles;