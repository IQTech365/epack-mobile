import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_GRAY2 } from '../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        width: width * 0.44,
        borderWidth: 1,
        borderColor: COLOR_GRAY2,
        paddingVertical: 12,
        borderRadius: 5,
        paddingHorizontal: 8,
    },
    contentContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
});

export default styles;