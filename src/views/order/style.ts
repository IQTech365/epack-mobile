import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_BLACK, COLOR_GRAY, COLOR_GRAY2, COLOR_GRAY3, COLOR_GRAY4, COLOR_GRAY6, COLOR_WHITE } from '../../utils/colors';
const {width,height} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: COLOR_WHITE,
    },
    listContent: {
        alignItems: 'center', 
        paddingVertical: 10, 
        paddingHorizontal: 5,
    },
    text: {
        color: COLOR_BLACK,
        fontFamily: 'WorkSans-Regular',
        fontSize: 14,
    },
    title: {
        textAlign: 'left',
        color: COLOR_GRAY,
        fontSize: 20,
        fontFamily: 'WorkSans-SemiBold',
    },
    item: {
        color: COLOR_GRAY4,
        fontSize: 18,
        fontFamily: 'WorkSans-Medium',
        marginVertical: 5
    },

    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        marginLeft: 5,
        gap: 6
      },
});

export default styles;