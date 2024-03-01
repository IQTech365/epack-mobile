import { StyleSheet, Dimensions } from "react-native";
import { COLOR_BLACK, COLOR_BLUE, COLOR_BLUE2, COLOR_GRAY, COLOR_GRAY2, COLOR_GRAY3, COLOR_GRAY4, COLOR_GRAY6, COLOR_GREEN, COLOR_WHITE } from "../../utils/colors";
const {width, } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    labelContainer: {
        width: width * 0.9,
        alignSelf: 'center',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    planCardContainer: {
        width: width * 0.9,
        alignSelf: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: COLOR_GRAY,
        padding: 8,
    },
    planInfoContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    text: {
        fontSize: 16,
        fontFamily: 'WorkSans-Medium',
        color: COLOR_BLACK,
    },
    text2: {
        fontSize: 14,
        fontFamily: 'WorkSans-SemiBold',
        color: COLOR_BLACK,
    },
    text3: {
        fontSize: 12,
        fontFamily: 'WorkSans-Regular',
        color: COLOR_GRAY,
    },
    text4: {
        fontSize: 15,
        fontFamily: 'WorkSans-Medium',
        color: COLOR_BLACK,
    },
    text5: {
        fontSize: 14,
        fontFamily: 'WorkSans-Medium',
        color: COLOR_BLACK,
    },
    text6: {
        fontSize: 14,
        fontFamily: 'WorkSans-Medium',
        color: COLOR_GRAY,
    },
    line: {
        width: width * 0.9,
        height: 1,
        alignSelf: 'center',
        backgroundColor: COLOR_GRAY2,
    },
    priceBreakupContainer: {
        width: width * 0.9,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inputWrapper: {
        width: '80%',
        borderColor: COLOR_GRAY4,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputContainer: {
        width: '50%',
        borderColor: COLOR_GRAY4,
        borderRadius: 8,
        height: 44,
    },
    btnText: {
        fontSize: 14,
        fontFamily: 'WorkSans-Medium',
        color: COLOR_BLUE,
    },
    btnText2: {
        fontSize: 14,
        fontFamily: 'WorkSans-Medium',
        color: COLOR_GREEN,
    },
    btnText3: {
        fontSize: 14,
        fontFamily: 'WorkSans-Medium',
        color: COLOR_GRAY,
        textDecorationLine: "underline",
    },
    buttonStyle: {
        borderRadius: 5,
        backgroundColor: COLOR_BLUE2,
    },
    buttonTextStyle: {
        color: COLOR_WHITE,
        fontSize: 16,
        fontFamily: 'WorkSans-Medium'
    },
    input: {
        color: COLOR_BLACK,
        fontSize: 14,
      },
});

export default styles;