import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_GRAY } from '../../../../../utils/colors';
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyContainer: {
        width: width * 0.8,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: COLOR_GRAY,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default styles;