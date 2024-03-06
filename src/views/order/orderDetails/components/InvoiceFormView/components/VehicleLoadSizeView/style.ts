import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_BLACK } from '../../../../../../../utils/colors';
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  fullWidthContainer: {
    width: width * 0.9,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  label: {
    color: COLOR_BLACK,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default styles;
