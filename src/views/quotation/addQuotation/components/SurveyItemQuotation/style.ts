import {StyleSheet, Dimensions} from 'react-native';
import {COLOR_BLACK, COLOR_BLUE, COLOR_ERROR, COLOR_GRAY, COLOR_WHITE} from '../../../../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  mainWrapper: {
    width: width * 0.9,
  },
  container: {
    width: width * 0.9,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  optionContainer: {
    width: width * 0.9,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
  },
  iconStyle: {
    borderRadius: 12,
    width: 22,
    height: 22,
  },
  innerIconStyle: {
    borderWidth: 1,
    borderRadius: 12,
    width: 22,
    height: 22,
  },
  textStyle: {
    fontFamily: 'JosefinSans-Regular',
    textDecorationLine: 'none',
    fontSize: 15,
    color: COLOR_GRAY
  },
  textContainerStyle: {
    paddingLeft: 0,
    marginLeft: 10,
  },
  style: {
    marginRight: 25,
    marginBottom: 15,
  },
  checkboxContainer: {
    width: width * 0.9,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  labelText: {
    fontSize: 14,
    color: COLOR_BLACK,
  },
  loadTypeErrorContainer: {
    width: width * 0.9,
    alignSelf: 'center',
    marginTop: 5,
  },
  loadTypeErrorText: {
    color: COLOR_ERROR,
    fontSize: 14,
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

  elementContainer2: {
    width: width * 0.9,
    alignSelf: 'center',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  elementContainer: {
    width: width * 0.9,
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    fontFamily: 'WorkSans-Medium'
  },

  textStyle2: {
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
  valueText: {
    fontSize: 14,
    fontFamily: 'WorkSans-Regular',
    color: COLOR_BLACK,
  }
});

export default styles;
