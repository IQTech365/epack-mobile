import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_BLUE, COLOR_GRAY, COLOR_GRAY2, COLOR_WHITE } from '../../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
      tabsContainer: {
        width: width,
        height: 40,
      },
      contentContainer: {
        flex: 0.9,
        alignItems: 'center',
        justifyContent: 'center',
      },
      buttonContainer: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      prevButtonContainer: {
        width: '50%',
      },
      nextButtonContainer: {
        width: '50%',
      },
      buttonStyle2: {
        backgroundColor: COLOR_BLUE,
        width: '80%',
        alignSelf: 'center',
      },
      buttonTextStyle: {
        color: COLOR_WHITE,
      },
});

export default styles;