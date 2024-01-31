import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_BLACK, COLOR_BLUE, COLOR_GRAY, COLOR_GRAY2 } from '../../../../../utils/colors';
const {width, height} = Dimensions.get('window');
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
        color: COLOR_BLACK,
        fontSize: 14,
        fontFamily: 'WorkSans-Regular'
    },
    modalStyle: {
        width: width,
        height: height
    },
    headerStyle: {
        width: width,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
});

export default styles;