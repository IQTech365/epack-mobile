import { StyleSheet, Dimensions } from "react-native";
import { COLOR_BLACK } from "../../../../../utils/colors";
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height * 0.8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: COLOR_BLACK,
        fontFamily: 'WorkSans-Regular',
        fontSize: 16,
    }
});

export default styles;