import {StyleSheet, Dimensions} from 'react-native';
import {
  COLOR_BLACK,
  COLOR_BLUE,
  COLOR_GRAY,
  COLOR_GRAY3,
  COLOR_WHITE,
} from '../../../../../../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  contentContainer: {
    width: width * 0.92,
    // padding: 4,
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
  fullWidhCompContainer2: {
    width: width * 0.90,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 8,
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
  buttonStyle: {
    width: width * 0.44,
    backgroundColor: COLOR_BLUE,
    borderRadius: 5,
  },
  textStyle: {
    color: COLOR_WHITE,
  },
});

export default styles;
