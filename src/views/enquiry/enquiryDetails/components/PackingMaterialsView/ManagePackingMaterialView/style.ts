import { StyleSheet, Dimensions } from "react-native";
import { COLOR_BLACK } from "../../../../../../utils/colors";
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    wrapper: {
        width: width * 0.9,
        alignSelf: 'center',
        alignItems: 'center',
    },
    labelContainer: {
        width: width * 0.9,
        alignSelf: 'center',
        alignItems: 'flex-start',
    },
    container: {
        width: width * 0.9,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    manageCountContainer: {
        width: '55%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    unitContainer: {
        width: '45%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    countActionContainer: {
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputContainer: {
        width: '40%',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: COLOR_BLACK,
    },
    input: {
        height: 40,
    },
    dropDownWrapperStyle: {
        width: '100%'
    },
    label: {
        color: COLOR_BLACK,
        fontSize: 16,
        fontFamily: 'WorkSans-Medium'
    }
});

export default styles;