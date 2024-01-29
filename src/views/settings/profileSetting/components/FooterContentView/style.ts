import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_BLACK, COLOR_GRAY, COLOR_GRAY2 } from '../../../../../utils/colors';
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        marginTop: 50,
    },
    emptyContainer: {
        width: width * 0.8,
        // paddingVertical: 50,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: COLOR_GRAY,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container2: {
        width: width * 0.95,
        paddingVertical: 5,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'flex-end',
        marginBottom: 8,
        backgroundColor: COLOR_GRAY2,
      },
      emptyContainer2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      text: {
        color: COLOR_BLACK,
        fontSize: 14,
        fontFamily: 'WorkSans-Regular'
      },
});

export default styles;