import {StyleSheet, Dimensions} from 'react-native';
import {COLOR_BLACK, COLOR_GRAY} from '../../../../../utils/colors';
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  fullWidthContainer: {
    width: width * 0.9,
    alignSelf: 'center',
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
  twoColumnContainer: {
    width: width * 0.9,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  compContainer: {
    width: width * 0.44,
  },
});

export default styles;
