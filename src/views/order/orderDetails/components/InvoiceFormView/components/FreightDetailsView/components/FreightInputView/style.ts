import {StyleSheet, Dimensions} from 'react-native';
import {
  COLOR_BLACK,
  COLOR_GRAY,
} from '../../../../../../../../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  compContainer: {
    width: width * 0.44,
    alignSelf: 'center',
  },
  label: {
    color: COLOR_BLACK,
    fontSize: 15,
    fontFamily: 'WorkSans-Regular'
  },
  inputContainer: {
    width: '100%',
    borderColor: COLOR_GRAY,
    paddingLeft: 4,
  },
  input: {
    color: COLOR_BLACK,
    fontSize: 14,
  },
});

export default styles;
