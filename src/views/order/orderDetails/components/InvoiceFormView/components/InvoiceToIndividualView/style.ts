import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_BLACK, COLOR_GRAY2 } from '../../../../../../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  halfWidthCompContainer: {
    width: width * 0.9,
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fullWidthCompContainer: {
    width: width * 0.9,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  compContainer: {
    width: width * 0.44,
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  label: {
    color: COLOR_BLACK,
    fontSize: 14,
  },
  inputContainer: {
    width: '100%',
    borderColor: COLOR_GRAY2,
    paddingLeft: 4,
  },
  input: {
    color: COLOR_BLACK,
    fontSize: 14,
  },
});

export default styles;
