import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_BLACK, COLOR_GRAY2 } from '../../../../../utils/colors';
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  contentWrapper: {
    width: width * 0.95,
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLOR_GRAY2,
    padding: 8,
  },
  rowContainer: {
    width: width * 0.9,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 10,
  },
  labelText: {
    color: COLOR_BLACK,
    fontSize: 16,
    fontWeight: '500',
    marginRight: 8,
  },
  valueText: {
    color: COLOR_BLACK,
    fontSize: 15,
    fontWeight: '400',
  }
});

export default styles
