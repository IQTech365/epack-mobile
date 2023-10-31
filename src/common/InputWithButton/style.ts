import {StyleSheet, Dimensions} from 'react-native';
import {COLOR_BLUE, COLOR_GRAY4, COLOR_GRAY5, COLOR_WHITE} from '../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    flexDirection: 'row',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: COLOR_GRAY5,
  },
  inputContainer: {
      width: '70%',
  },
  buttonContainer: {
      width: '30%',
      backgroundColor: COLOR_BLUE,
      alignItems: 'center',
      justifyContent: 'center',
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
  },
  buttonDisabledContainer: {
    width: '30%',
    backgroundColor: COLOR_GRAY5,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
},
  buttonText: {
      fontSize: 16,
      color: COLOR_WHITE,
      fontWeight: '500',
  },
});

export default styles;
