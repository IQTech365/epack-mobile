import {StyleSheet, Dimensions} from 'react-native';
import {
  COLOR_BLACK,
  COLOR_BLUE,
  COLOR_GRAY2,
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
  // List Item Styles
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
  },
  padding: {
    paddingHorizontal: 8,
  },
  halfContainer: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  datecontainer: {
    // width: '30%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: COLOR_BLUE,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  label: {
    color: COLOR_BLACK,
    fontSize: 12,
    fontFamily: 'WorkSans-Medium',
    marginRight: 8,
  },
  value: {
    color: COLOR_BLACK,
    fontSize: 12,
    fontFamily: 'WorkSans-Regular',
  },
  text2: {
    color: COLOR_WHITE,
    fontSize: 14,
    fontFamily: 'WorkSans-Medium',
  },
  viewDetailsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: COLOR_BLUE,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  viewDetailsText: {
    color: COLOR_BLACK,
    fontSize: 13,
    fontWeight: '600',
  },
  checkboxContainer: {
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'center',
    paddingHorizontal: 10,
  },
  downloadDisabledButton: {
    alignSelf: 'center',
    paddingHorizontal: 45,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 22,
    backgroundColor: COLOR_GRAY5,
  },
  downloadText: {
    color: COLOR_WHITE,
    fontSize: 14,
  },
  downloadButton: {
    alignSelf: 'center',
    paddingHorizontal: 45,
    paddingVertical: 10,
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
