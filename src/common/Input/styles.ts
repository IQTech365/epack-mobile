import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_ERROR, COLOR_GRAY3, COLOR_WHITE } from '../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        width: width * 0.9,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLOR_WHITE,
        borderRadius: 5,
        paddingLeft: 8,
    },
    iconContainer: {
        width: '10%',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    searchIconContainer: {
        width: '10%',
        backgroundColor: COLOR_GRAY3,
        alignItems: 'center',
        borderTopRightRadius:5,
        borderBottomRightRadius:5,
        justifyContent: 'center',
    },
    inputContainer: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: '100%',
        height: 44,
        color: COLOR_WHITE,
        fontSize: 16,
    },
    error: {
        color: COLOR_ERROR,
        fontSize: 12,
        marginLeft: 2,
        marginTop: 4,
    },
    errorContainer: {
        borderColor: COLOR_ERROR
    }
});

export default styles;