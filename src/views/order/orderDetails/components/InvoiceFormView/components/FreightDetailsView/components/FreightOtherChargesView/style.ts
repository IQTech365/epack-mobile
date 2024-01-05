import {StyleSheet, Dimensions} from 'react-native';
import {
  COLOR_BLACK,
  COLOR_BLUE,
  COLOR_GRAY2,
  COLOR_GRAY3,
  COLOR_GRAY4,
  COLOR_GRAY5,
  COLOR_WHITE,
} from '../../../../../../../../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  mainWrapper: {
    width: width * 0.95,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: COLOR_GRAY3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    width: width * 0.88,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  compContainer: {
    width: width * 0.42,
    alignSelf: 'center',
  },
  fullWidhCompContainer: {
    width: width * 0.88,
    alignSelf: 'center',
  },
  fullWidhCompContainer2: {
    width: width * 0.88,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  label: {
    color: COLOR_BLACK,
    fontSize: 14,
    fontFamily: 'WorkSans-Regular'
  },
  label2: {
    color: COLOR_BLACK,
    fontSize: 14,
    fontFamily: 'WorkSans-SemiBold'
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
  buttonStyle: {
    width: '50%',
    borderRadius: 5,
    backgroundColor: COLOR_BLUE,
    alignSelf: 'center',
    marginRight: 10,
  },
  buttonText: {
    color: COLOR_WHITE,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default styles;
