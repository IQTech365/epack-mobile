import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_GRAY, COLOR_GRAY2 } from '../../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        height: '80%',
        alignItems: 'center'
    },
    labelContainer: {
        width: width * 0.9,
        paddingVertical: 9,
        paddingHorizontal: 12,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: COLOR_GRAY,
        alignItems: 'flex-start',
        justifyContent: 'center',
        alignSelf: 'center',
      },
      labelText: {
        color: COLOR_GRAY,
        fontSize: 16,
        fontWeight: '500',
      },
      titleText: {
        color: COLOR_GRAY,
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center'
      },
      rowContainer: {
        width: width * 0.9,
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between'
      },
      elementContainer: {
        width: '48%'
      },
      inputStyle: {
        width: '100%',
        borderWidth: 1,
        borderColor: COLOR_GRAY2,
      },
      buttonStyle: {
        width: '100%',
        backgroundColor: COLOR_GRAY2,
      }
});

export default styles;