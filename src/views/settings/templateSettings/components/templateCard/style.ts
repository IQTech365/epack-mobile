import { StyleSheet, Dimensions } from "react-native";
import { COLOR_BLACK, COLOR_BLUE2, COLOR_GRAY, COLOR_GRAY2 } from "../../../../../utils/colors";
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        width: width * 0.9,
        height: height * 0.50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: COLOR_GRAY,
    },
    activeContainer: {
        width: width * 0.9,
        height: height * 0.50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: COLOR_BLUE2,
    },
    text: {
        color: COLOR_BLACK,
        fontFamily: 'WorkSans-Medium',
        fontSize: 14
    },
    tumbnail: {
        width: width * 0.89,
        height: height * 0.50,
        borderRadius:8,
        // resizeMode: "contain"
    }
});

export default styles;