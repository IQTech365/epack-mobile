import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_BLUE, COLOR_GRAY, COLOR_GRAY2, COLOR_GRAY5, COLOR_WHITE } from '../../../../../utils/colors';
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        width: width * 0.95,
        paddingVertical: 5,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'flex-end',
        marginBottom: 8,
        backgroundColor: COLOR_GRAY2,
    },
    button: {
        borderWidth: 1,
        borderRadius: 25,
        borderColor: COLOR_BLUE,
        paddingHorizontal: 20,
        paddingVertical: 6,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: COLOR_GRAY,
        fontSize: 14,
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
    },
    downloadButton: {
        alignSelf: 'center',
        paddingHorizontal: 15,
        paddingVertical: 6,
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: COLOR_BLUE
    },
    checkboxContainer: {
        width: width * 0.9,
        justifyContent: 'center',
        alignItems: 'flex-start',
        alignSelf: 'center', 
    },
});

export default styles;