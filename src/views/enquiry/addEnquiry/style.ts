import {StyleSheet, Dimensions} from 'react-native';
import {
  COLOR_BLACK,
  COLOR_BLUE,
  COLOR_ERROR,
  COLOR_GRAY,
  COLOR_GRAY2,
  COLOR_WHITE,
} from '../../../utils/colors';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_WHITE,
  },
  elementContainer: {
    width: width * 0.9,
    justifyContent: 'center',
    // alignItems: 'flex-start',
    alignSelf: 'center',
  },
  elementContainer2: {
    flexWrap: 'wrap',
    width: width * 0.9,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'center',
  },
  labelContainer: {
    width: width * 0.9,
    alignSelf: 'center',
  },
  label: {
    color: COLOR_BLACK,
    fontSize: 14,
  },
  inputContainer: {
    width: '100%',
    borderColor: COLOR_GRAY,
    paddingLeft: 4,
    borderWidth: 0.5,
  },
  input: {
    color: COLOR_BLACK,
    fontSize: 14,
  },
  twoColumnWrapper: {
    width: width * 0.9,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    width: width * 0.44,
    justifyContent: 'space-between',
    // alignItems: 'flex-start',
    alignSelf: 'center',
  },
  textStyle: {
    color: COLOR_WHITE,
  },
  previewButtonStyle: {
    backgroundColor: COLOR_BLUE,
    borderRadius: 5,
  },
  errorContainer: {
    width: width * 0.9,
    paddingHorizontal: 20,
  },
  error: {
    color: COLOR_ERROR,
    fontSize: 14,
  },
});

export default styles;
