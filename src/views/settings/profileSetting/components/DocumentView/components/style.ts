import { StyleSheet, Dimensions } from "react-native";
import { COLOR_BLACK, COLOR_GRAY, COLOR_GRAY2, COLOR_GRAY3 } from "../../../../../../utils/colors";
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    mainWrapper:{
        padding:5,
    },
    cardWrapper: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:8,
    },
    container:{
        width: width * 0.95,
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius:8,
        flexDirection: 'row',
    },
    contentContainer: {
        width: '85%',
        alignItems: 'center',
    },
    actionContainer: {
        width: '15%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    rowContainer:{
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderBottomWidth:0.5,
        borderBottomColor: COLOR_GRAY2,
    },
    labelContainer: {
        width: '45%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: 6,
        backgroundColor: COLOR_GRAY3,
        paddingVertical: 8,
    },
    valueContainer: {
        width: '55%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: 6,
        paddingVertical: 8,
    },
    label:{
        color: COLOR_BLACK,
        fontSize: 16,
        fontFamily: 'WorkSans-Medium',
    },
    value:{
        color: COLOR_GRAY,
        fontSize: 16,
        fontFamily: 'WorkSans-Regualr',
    },
    btlr: {
        borderTopLeftRadius: 8,
    },
    btrr: {
        borderTopRightRadius: 8,
    },
    bblr: {
        borderBottomLeftRadius: 8,
    },
    bbrr: {
        borderBottomRightRadius: 8,
    }
});

export default styles;