import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_GRAY2 } from '../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    // padding: 16,
    width: '100%'
  },
  dropdown: {
    height: 44,
    borderColor: COLOR_GRAY2,
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  errorContainer: {
    width: width * 0.9,
    alignSelf: 'center',
    textAlign: 'left',
    marginTop: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  }
});

export default styles;
