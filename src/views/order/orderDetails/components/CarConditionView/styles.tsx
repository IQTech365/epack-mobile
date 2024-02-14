import {StyleSheet, Dimensions} from 'react-native';
import {
  COLOR_BLACK,
  COLOR_BLUE,
  COLOR_GRAY,
  COLOR_GRAY2,
  COLOR_GRAY3,
  COLOR_GRAY5,
  COLOR_WHITE,
} from '../../../../../utils/colors';
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    width: width * 0.95,
    paddingVertical: 5,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'flex-end',
    marginBottom: 8,
    backgroundColor: COLOR_GRAY2,
  },
  button: {
    borderWidth: 1,
    borderRadius: 25,
    borderColor: COLOR_BLUE,
    paddingHorizontal: 20,
    paddingVertical: 6,
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
  // List Item
  mainWrapper: {
    width: width * 0.95,
    alignSelf: 'center',
  },
  listItemMainContainer: {
    width: width * 0.95,
    alignSelf: 'center',
    borderRadius: 8,
  },
  rowContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: COLOR_GRAY2,
  },
  padding: {
    paddingHorizontal: 8,
  },
  labelContainer: {
    width: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLOR_GRAY3,
    paddingVertical: 5,
    paddingLeft: 8,
  },
  valueContainer: {
    width: '55%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
  },
  dateContainer: {
    // width: '30%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: COLOR_BLUE,
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  label: {
    color: COLOR_BLACK,
    fontSize: 16,
    fontFamily: 'WorkSans-Medium',
  },
  value: {
    color: COLOR_BLACK,
    fontSize: 14,
    fontFamily: 'WorkSans-Medium'
  },
  text2: {
    color: COLOR_WHITE,
    fontSize: 16,
    fontFamily: 'WorkSans-Bold'
  },
  viewDetailsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  viewDetailsText: {
    color: COLOR_BLACK,
    fontSize: 16,
    fontFamily: 'WorkSans-Bold'
  },
  checkboxContainer: {
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'center',
  },
  downloadDisabledButton: {
    alignSelf: 'center',
    paddingHorizontal: 15,
    paddingVertical: 6,
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: COLOR_GRAY5,
  },
  downloadText: {
    color: COLOR_WHITE,
    fontSize: 14,
  },
  downloadButton: {
    alignSelf: 'center',
    paddingHorizontal: 15,
    paddingVertical: 6,
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: COLOR_BLUE,
  },
  modalStyle: {
    width: width,
    height: height,
  },
  headerStyle: {
    width: width,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
});

export default styles;
