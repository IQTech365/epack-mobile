import { StyleSheet, Dimensions } from "react-native";
import { COLOR_GRAY2 } from "../../utils/colors";
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container:{
        width: width * 0.96,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingVertical: 6,
        paddingHorizontal: 10,
        backgroundColor: COLOR_GRAY2,
        borderRadius: 5,
    }
});

export default styles;