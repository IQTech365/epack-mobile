import { StyleSheet, Dimensions } from 'react-native';
import { COLOR_BLACK, COLOR_BLUE, COLOR_GRAY, COLOR_WHITE } from '../../../utils/colors';
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 50,
    },
    emptyContainer: {
        width: width * 0.8,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: COLOR_GRAY,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabsContainer: {
        width: width,
        height: 40,
    },
    textContainer2: {
        width: width * 0.9,
        justifyContent: 'center',
        alignItems: 'flex-start',
        alignSelf: 'center',
    },
    label: {
        color: COLOR_BLACK,
        fontSize: 14,
    },
    mainWrapper: {
        width: width * 0.9,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-around'
    },
    textContainer: {
        width: width * 0.44,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        alignSelf: 'center',
    },
    inputContainer: {
        width: '100%',
        borderColor: COLOR_BLACK,
        paddingLeft: 4,
        borderWidth: 0.5,
    },
    input: {
        color: COLOR_BLACK,
        fontSize: 14,
    },
    textStyle: {
        color: COLOR_WHITE,
    },
    previewButtonStyle: {
        backgroundColor: COLOR_BLUE,
        borderRadius: 5,
    },
});

export default styles;