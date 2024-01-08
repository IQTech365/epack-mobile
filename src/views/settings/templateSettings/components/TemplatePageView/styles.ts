import { StyleSheet, Dimensions } from "react-native";
import { COLOR_BLACK, COLOR_GRAY, COLOR_GRAY2 } from "../../../../../utils/colors";
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        width: width * 0.44,
        height: width * 0.44,
        alignItems: 'center',
        justifyContent: 'center',
    },
    taskTitle: {
        color: COLOR_BLACK,
        fontFamily: 'WorkSans-SemiBold',
        fontSize: 16,
    },
    sectionHeaderContainer: {
        width: width,
        alignSelf: 'center',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 5,
        backgroundColor: COLOR_GRAY2,
        // marginVertical: 8,
    }
});

export default styles;