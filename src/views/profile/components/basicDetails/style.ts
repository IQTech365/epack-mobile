import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_BLACK, COLOR_GRAY, COLOR_WHITE } from '../../../../utils/colors';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR_WHITE,
        alignItems: 'center',
    },
    elementContainer: {
        width: width * 0.9,
        alignSelf: 'center',
        alignItems: 'center',
    },
    labelContainer: {
        width: width * 0.9,
        paddingVertical: 9,
        paddingHorizontal: 12,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: COLOR_GRAY,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        alignSelf: 'center',
        flexDirection: 'row',
      },
      labelText: {
        color: COLOR_GRAY,
        fontSize: 16,
        fontFamily: 'WorkSans-SemiBold'
      },
      labelText2: {
        color: COLOR_BLACK,
        fontSize: 14,
        fontFamily: 'WorkSans-SemiBold'
      },
      companyLogoContainer: {
        width: width * 0.9,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        height: 150,
        borderRadius: 5,
        borderWidth: 1,
      },
      modalStyle: {
        height: height * 0.9,
      },
      modalWrapper: {
        width: width * 0.90,
      }
});

export default styles;