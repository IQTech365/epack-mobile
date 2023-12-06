import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_BLACK, COLOR_GRAY, COLOR_GRAY2, COLOR_GRAY4, COLOR_WHITE } from '../../../../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        
    },
    twoColumnContainer:{
        width: width * 0.9,
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    compContainer: {
        width: width * 0.44,
        alignItems: 'center',
    },
    fullWidthContainer:{
        width: width * 0.9,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        color: COLOR_BLACK,
        fontSize: 14,
        fontWeight: '500',
    },
    switchInputContainer: {
        width: '100%',
        borderColor: COLOR_GRAY4,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        paddingLeft: 4,
    },
    mainWrapper: {
        width: width * 0.9,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    switchMainWrapper: {
        backgroundColor: COLOR_GRAY2,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
    },
    switchMainWrapper2: {
        backgroundColor: COLOR_WHITE,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
    },
    switchMainWrapper3: {
        borderWidth: 0.5, 
        borderRadius: 8,
        borderColor: COLOR_GRAY,
    },
    textContainer: {
        width: width * 0.44,
        justifyContent: 'space-between',
        alignSelf: 'center',
    },
    switchStyle: {
        width: '100%',
    },
    labelContainer: {
        width: width * 0.9,
        justifyContent: 'center',
        alignItems: 'flex-start',
        alignSelf: 'center',
    },
    input: {
        color: COLOR_BLACK,
        fontSize: 14,
    },
    outerCircleStyle: {
        width: '100%',
    },
    innerCircleStyle: {
        width: '80%'
    },
});

export default styles;