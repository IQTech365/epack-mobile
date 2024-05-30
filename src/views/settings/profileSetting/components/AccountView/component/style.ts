import { StyleSheet, Dimensions } from "react-native";
import { COLOR_BLACK, COLOR_BLUE, COLOR_BLUE3, COLOR_GRAY, COLOR_GRAY2, COLOR_GRAY3, COLOR_GRAY4, COLOR_GRAY5, COLOR_GRAY6 } from "../../../../../../utils/colors";
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    topWrapper: {
        padding: 8,
        alignSelf: 'center',
    },
    cardWrapper: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    container: {
        width: width * 0.95,
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    rowContainer: {
        width: '100%',
        alignSelf: 'center',
        flexDirection: 'row',
    },
    labelContainer: {
        width: '45%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: COLOR_GRAY3,
        paddingVertical: 8,
        paddingLeft: 8,
    },
    valueContainer: {
        width: '55%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingLeft: 8,
    },
    btlr:{
        borderTopLeftRadius: 8,
    },
    btrr: {
        borderTopRightRadius: 8,
    },
    bblr: {
        borderBottomLeftRadius: 8,
    },
    bbrr:{
        borderBottomRightRadius: 8,
    },
    label: {
        color: COLOR_BLACK,
        fontSize: 16,
        fontFamily: 'WorkSans-Medium',
    },

    text: {
        fontSize: 15,
        color: COLOR_GRAY,
        fontFamily: 'WorkSans-Regular',
    },

    content: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    value: {
        color: COLOR_GRAY,
        fontSize: 16,
        fontFamily: 'WorkSans-Regular',
    },
    bb: {
        borderBottomWidth: 0.5,
        borderBottomColor: COLOR_GRAY2,
    },
    top:{
        backgroundColor: COLOR_GRAY6,
        paddingVertical: 5,
        justifyContent: 'flex-end',
        paddingHorizontal: 8,
    }
});

export default styles;