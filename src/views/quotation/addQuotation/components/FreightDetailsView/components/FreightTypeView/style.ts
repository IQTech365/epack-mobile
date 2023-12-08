import {StyleSheet, Dimensions} from 'react-native';
import {COLOR_BLACK, COLOR_ERROR} from '../../../../../../../utils/colors';
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
    borderRadius: 0,
    width: 18,
    height: 18,
  },
  innerIconStyle: {
    borderWidth: 1,
    borderRadius: 0,
    width: 18,
    height: 18,
  },
  iconStyle2: {
    borderRadius: 12,
    width: 22,
    height: 22,
  },
  innerIconStyle2: {
    borderWidth: 1,
    borderRadius: 12,
    width: 22,
    height: 22,
  },
  textStyle: {
    fontFamily: 'JosefinSans-Regular',
    textDecorationLine: 'none',
    fontSize: 14,
  },
  textContainerStyle: {
    paddingLeft: 0,
    marginLeft: 6,
  },
  style: {
    marginRight: 15,
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
}
});

export default styles;
