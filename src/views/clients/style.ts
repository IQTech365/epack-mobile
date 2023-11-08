import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_WHITE } from '../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: COLOR_WHITE
    },
    listContent: {
        alignItems: 'center', 
        paddingVertical: 10, 
        paddingHorizontal: 5,
    }
});

export default styles;