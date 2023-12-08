import {StyleSheet, Dimensions} from 'react-native';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_GRAY3,
} from '../../../../../../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  contentContainer: {
    width: width * 0.92,
    alignItems: 'center',
    backgroundColor: COLOR_GRAY3,
    borderRadius: 5,
  },
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
});

export default styles;
