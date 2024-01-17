import { StyleSheet, Dimensions } from "react-native";
import { COLOR_BLACK, COLOR_GRAY, COLOR_GRAY2 } from "../../utils/colors";
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    contactContainer: {
        width: width * 0.9,
        alignSelf: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical: 10,
    },
    contactUsText: {
        color: COLOR_BLACK,
        fontSize: 16,
        fontFamily: 'WorkSans-SemiBold'
    },
    callText: {
        color: COLOR_BLACK,
        fontSize: 14,
        fontFamily: 'WorkSans-SemiBold' 
    },
    emailText: {
        color: COLOR_GRAY,
        fontSize: 14,
        fontFamily: 'WorkSans-Medium' 
    }
});

export default styles;