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
    flex: 1,
    alignItems: 'center',
  },
  labelContainer: {
    width: width * 0.9,
    paddingVertical: 9,
    // paddingHorizontal: 5,
    borderRadius: 5,
    // borderWidth: 1,
    borderColor: COLOR_GRAY,
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  labelText: {
    color: COLOR_BLACK,
    fontSize: 14,
    fontFamily: 'WorkSans-SemiBold'
  },
  contentContainer: {
    width: width * 0.9,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingVertical: 4,
  },
  contentLabelText: {
    color: COLOR_BLACK,
    fontSize: 14,
    fontFamily: 'WorkSans-Medium'
  },
  nameText: {
    color: COLOR_BLUE,
    fontSize: 14,
    fontFamily: 'WorkSans-Medium'
  },
  elementContainer: {
    width: width * 0.9,
    alignSelf: 'center',
  },
  datePicker: {
    width: '100%',
  },
  inputContainer: {
    width: '100%',
    borderColor: COLOR_BLACK,
    borderWidth: 0.5,
    // paddingLeft: 4,
  },
  input: {
    color: COLOR_BLACK,
    fontSize: 14,
  },
  textStyle: {
    color: COLOR_WHITE,
  },
  previewButtonStyle: {
    backgroundColor: COLOR_BLUE,
    borderRadius: 5,
  },
  tabsContainer: {
    width: width,
    height: 40,
},
container2: {
  paddingHorizontal: 12,
  alignItems: 'center',
  justifyContent: 'center',
  borderBottomWidth: 2,
  borderBottomColor:COLOR_WHITE,
  marginRight: 8,
},
containerActive: {
  paddingHorizontal: 12,
  alignItems: 'center',
  justifyContent: 'center',
  borderBottomWidth: 2,
  borderBottomColor: COLOR_BLUE,
  marginRight: 8,
},
activeText: {
  color: COLOR_BLACK,
  fontSize: 16,
  fontFamily: 'WorkSans-Medium'
},
inactiveText: {
  color: COLOR_BLACK,
  fontSize: 16,
  fontFamily: 'WorkSans-Medium'
}
});

export default styles;
