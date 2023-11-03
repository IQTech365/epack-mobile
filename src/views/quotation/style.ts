import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_BLUE, COLOR_GRAY5, COLOR_WHITE } from '../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR_WHITE,
        alignItems: 'center'
    },
    listContent: {
        alignItems: 'center', 
        paddingVertical: 10, 
        paddingHorizontal: 5
    },
    checkboxContainer: {
        width: width * 0.9,
        justifyContent: 'center',
        alignItems: 'flex-start',
        alignSelf: 'center', 
    },
    downloadButton: {
        alignSelf: 'center',
        paddingHorizontal: 15,
        paddingVertical: 6,
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: COLOR_BLUE
    },
    downloadDisabledButton: {
        alignSelf: 'center',
        paddingHorizontal: 15,
        paddingVertical: 6,
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: COLOR_GRAY5,
    },
    downloadText: {
        color: COLOR_WHITE,
        fontSize: 14,
    }
});

export default styles;