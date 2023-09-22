import {StyleSheet, Dimensions} from 'react-native';
import {
  COLOR_BLACK,
  COLOR_BLUE,
  COLOR_GRAY2,
  COLOR_WHITE,
} from '../../../../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width,
    backgroundColor: COLOR_WHITE,
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
  },
  mainWrapper: {
    width: width * 0.9,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },

  textContainer: {
    width: width * 0.44,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    alignSelf: 'center',
  },
  textContainer2: {
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'center',
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
  label: {
    color: COLOR_BLACK,
    fontSize: 14,
  },
  innerCircleStyle: {
    width: '80%',
  },
  switchStyle: {
    width: '100%',
  },
  buttonStyle: {
    width: width * 0.44,
    backgroundColor: COLOR_BLUE,
    borderRadius: 5,
  },
  textStyle: {
    color: COLOR_WHITE,
  },
  previewButtonStyle: {
    backgroundColor: COLOR_BLUE,
    borderRadius: 5,
  },
  applicableWrapper: {
    width: width * 0.9,
    alignSelf: 'center',
    alignItems: 'flex-start',
  },
  checkboxItem: {
    paddingVertical: 5,
  },
  toolbarContentContainer: {
    width: width * 0.9,
    alignSelf: 'center',
  },
  editorContentContainer: {
    width: width * 0.9,
    alignSelf: 'center',
    height: 250,
    borderWidth: 1,
    borderColor: COLOR_GRAY2,
  }
});

export default styles;
