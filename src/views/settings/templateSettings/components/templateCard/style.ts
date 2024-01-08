import { StyleSheet, Dimensions } from "react-native";
import { COLOR_BLACK, COLOR_BLUE2, COLOR_GRAY, COLOR_GRAY2 } from "../../../../../utils/colors";
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        width: width * 0.9,
        height: width * 0.44,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR_GRAY,
    },
    activeContainer: {
        width: width * 0.9,
        height: width * 0.44,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR_BLUE2,
    },
    text: {
        color: COLOR_BLACK,
        fontFamily: 'WorkSans-Medium',
        fontSize: 14
    }
});

export default styles;