import {StyleSheet, Dimensions} from 'react-native';
import {
  COLOR_BLACK,
  COLOR_BLUE,
  COLOR_GRAY,
  COLOR_GRAY2,
  COLOR_WHITE,
} from '../../../../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: COLOR_WHITE,
    justifyContent: 'center',
  },
  elementContainer: {
    width: width * 0.9,
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  elementContainer2: {
    width: width * 0.9,
    alignSelf: 'center',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  itemContainer: {
    width: width * 0.44,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    alignSelf: 'center',
  },
  label: {
    color: COLOR_BLACK,
    fontSize: 14,
  },
  labelHeading: {
    color: COLOR_BLACK,
    fontSize: 18,
    left: width * 0.05,
  },
  inputContainer: {
    width: '100%',
    borderColor: COLOR_GRAY,
    paddingLeft: 4,
  },
  input: {
    color: COLOR_BLACK,
    fontSize: 14,
  },
  textStyle: {
    color: COLOR_WHITE,
    fontFamily: 'WorkSans-Regular'
  },
  previewButtonStyle: {
    backgroundColor: COLOR_BLUE,
    borderRadius: 5,
  },
  itemWrapper: {
    width: width * 0.9,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: COLOR_BLACK,
    borderRadius: 5,
    marginBottom: 5,
  },
  labelContainer: {
    width: '45%',
    alignItems: 'flex-start',
    paddingLeft: 5,
  },
  valueContainer: {
    width: '55%',
    alignItems: 'flex-start',
  },
  labelText: {
    fontSize: 14,
    fontFamily: 'WorkSans-Medium',
    color: COLOR_BLACK,
  },
  valueText: {
    fontSize: 14,
    fontFamily: 'WorkSans-Regular',
    color: COLOR_BLACK,
  }
});

export default styles;
