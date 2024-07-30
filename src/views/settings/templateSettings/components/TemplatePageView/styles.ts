import { StyleSheet, Dimensions } from "react-native";
import { COLOR_BLACK, COLOR_GRAY, COLOR_GRAY2, COLOR_WHITE } from "../../../../../utils/colors";
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
    imageStyle: {
        width: 100,
        height: 50,
        resizeMode: 'contain',
      },

      textContainer: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: COLOR_WHITE,
    },
    tumbnail: {
        width: width * 0.88,
        height: 300,
        borderRadius:8,
        borderWidth: 3
        // resizeMode: "contain"
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