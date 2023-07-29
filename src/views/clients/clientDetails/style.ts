import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_WHITE } from '../../../utils/colors';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR_WHITE,
    },
    tabsContainer: {
        width: width,
        height: 40,
        alignItems: 'center'
    }
});

export default styles;