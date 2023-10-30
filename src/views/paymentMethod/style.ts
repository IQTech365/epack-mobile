import {StyleSheet, Dimensions} from 'react-native';
import {COLOR_BLACK, COLOR_GRAY4, COLOR_GRAY5, COLOR_WHITE} from '../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  planInfoContainer: {
    width: width * 0.9,
    // flexDirection: 'row',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: COLOR_GRAY5,
    padding: 10,
  },
  paymentMethodContainer: {
    width: width * 0.9,
    flexDirection: 'row',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: COLOR_GRAY4,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  planTypeText: {
    color: COLOR_WHITE,
    fontSize: 22,
    fontWeight: 'bold',
  },
  planPriceText: {
    color: COLOR_WHITE,
    fontSize: 30,
    fontWeight: 'bold',
  },
  planDurationText: {
    color: COLOR_WHITE,
    fontSize: 14,
    fontWeight: 'normal',
  },
  paymentText: {
    color: COLOR_BLACK,
    fontSize: 14,
    fontWeight: 'normal',
  }
});

export default styles;
