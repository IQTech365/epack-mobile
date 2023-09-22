import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_GRAY2 } from '../../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    wrapper: {
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: COLOR_GRAY2,
        borderRadius: 5,
        borderWidth: 1,
        paddingHorizontal: 40,
        paddingVertical: 10,
        marginTop: 10,

    }
});

export default styles;