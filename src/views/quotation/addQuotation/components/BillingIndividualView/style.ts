import {StyleSheet, Dimensions} from 'react-native';
import {COLOR_BLACK, COLOR_GRAY, COLOR_GREEN, COLOR_WHITE} from '../../../../../utils/colors';
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  fullWidthContainer: {
    width: width * 0.9,
    alignSelf: 'center',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  inputContainer: {
    width: '100%',
    borderColor: COLOR_GRAY,
    borderWidth: 0.5,
    paddingLeft: 4,
  },
  input: {
    color: COLOR_BLACK,
    fontSize: 14,
  },
  label: {
    color: COLOR_BLACK,
    fontSize: 14,
    fontWeight: '500',
  },
  customerItemContainer: {
    width: width * 0.9,
    alignSelf: 'center',
    paddingVertical: 10,
    backgroundColor: COLOR_GREEN,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 8,
  },
  customerNameText: {
    color: COLOR_WHITE,
    fontSize: 16,
    fontWeight: '400',
  }
});

export default styles;
