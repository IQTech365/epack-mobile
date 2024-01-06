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
    flex: 1,
    backgroundColor: COLOR_WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container2: {
    width: width * 0.95,
    paddingVertical: 5,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'flex-end',
    marginBottom: 8,
    backgroundColor: COLOR_GRAY2,
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
    fontFamily: 'WorkSans-Medium'
  },
  labelHeading: {
    color: COLOR_BLACK,
    fontSize: 18,
    left: width * 0.05,
    fontFamily: 'WorkSans-Medium'
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
  textStyle: {
    color: COLOR_WHITE,
  },
  previewButtonStyle: {
    backgroundColor: COLOR_BLUE,
    borderRadius: 5,
  },
  // items
  listItemContainer: {
    width: width * 0.9,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    padding: 5,
  },
  rowItemContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftItemContainer: {
    width: '80%',
    alignItems: 'center',
  },
  itemContainer2: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  deleteIconContainer: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: {
    color: COLOR_BLACK,
    fontSize: 16,
    fontFamily: 'WorkSans-Medium'
  },
  valueText: {
    color: COLOR_BLACK,
    fontSize: 14,
    fontFamily: 'WorkSans-Medium'
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: COLOR_BLACK,
    fontSize: 14,
    fontFamily: 'WorkSans-Regular',
  },
});

export default styles;
