import {StyleSheet, Dimensions} from 'react-native';
import {COLOR_BLACK, COLOR_BLUE2, COLOR_GRAY, COLOR_GRAY2, COLOR_GRAY3, COLOR_WHITE} from '../../utils/colors';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  centeredView: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: COLOR_WHITE,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: width * 0.9,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: COLOR_GRAY,
    backgroundColor: COLOR_BLUE2,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  modalView: {
    width: width * 0.9,
    backgroundColor: COLOR_WHITE,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  titleText: {
    fontSize: 16,
    color: COLOR_WHITE,
    fontFamily: 'WorkSans-Bold'
  },
});

export default styles;
