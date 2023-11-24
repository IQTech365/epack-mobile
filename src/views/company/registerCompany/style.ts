import {StyleSheet, Dimensions} from 'react-native';
import {
  COLOR_BLACK,
  COLOR_BLUE,
  COLOR_GRAY2,
  COLOR_WHITE,
} from '../../../utils/colors';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_WHITE,
  },
  contentContainer: {
    flex: 0.9
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
    borderColor: COLOR_GRAY2,
    paddingLeft: 4,
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
    alignItems: 'flex-start',
    alignSelf: 'center',
  },
  textStyle: {
    color: COLOR_WHITE,
  },
  previewButtonStyle: {
    backgroundColor: COLOR_BLUE,
    borderRadius: 5,
  },
  titleText: {
    fontSize: 18,
    color: COLOR_BLACK,
    fontWeight: '400',
    paddingHorizontal: 16,
  },
  datePickerWidth: {
    width: width * 0.9,
  },
  buttonContainer: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
  },
  prevButtonContainer: {
    width: '50%',
  },
  nextButtonContainer: {
    width: '50%',
  },
  buttonStyle: {
    backgroundColor: COLOR_BLUE,
    width: '80%',
    alignSelf: 'center',
  },
  buttonTextStyle: {
    color: COLOR_WHITE,
  },
});

export default styles;
