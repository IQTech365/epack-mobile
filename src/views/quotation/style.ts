import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_BLACK, COLOR_BLUE, COLOR_GRAY, COLOR_GRAY4, COLOR_GRAY5, COLOR_WHITE } from '../../utils/colors';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR_WHITE,
        alignItems: 'center'
    },
    listContent: {
        alignItems: 'center', 
        paddingVertical: 10, 
        paddingHorizontal: 5
    },
    checkboxContainer: {
        width: width * 0.9,
        justifyContent: 'center',
        alignItems: 'flex-start',
        alignSelf: 'center', 
    },
    downloadButton: {
        alignSelf: 'center',
        paddingHorizontal: 15,
        paddingVertical: 6,
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: COLOR_BLUE
    },
    downloadDisabledButton: {
        alignSelf: 'center',
        paddingHorizontal: 15,
        paddingVertical: 6,
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: COLOR_GRAY5,
    },
    downloadText: {
        color: COLOR_WHITE,
        fontSize: 14,
    },
    text: {
        color: COLOR_BLACK,
        fontFamily: 'WorkSans-Regular',
        fontSize: 14,
    },
    modalStyle: {
        width: width,
        height: height
    },
    headerStyle: {
        width: width,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },

    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        marginLeft: 5,
        gap: 6
      },

      item: {
        color: COLOR_GRAY4,
        fontSize: 18,
        fontFamily: 'WorkSans-Medium',
        marginVertical: 5
    },
    title: {
        textAlign: 'left',
        color: COLOR_GRAY,
        fontSize: 20,
        fontFamily: 'WorkSans-SemiBold',
    },

    // containerss:{

    //     alignItems:'flex-start'
    // }
});

export default styles;