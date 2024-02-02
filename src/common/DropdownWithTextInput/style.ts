import {StyleSheet, Dimensions} from 'react-native';
import {
  COLOR_BLACK,
  COLOR_GRAY2,
  COLOR_GRAY4,
  COLOR_GRAY6,
  COLOR_WHITE,
} from '../../utils/colors';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    height: 46,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: COLOR_GRAY4,
    borderRadius: 5,
  },
  inputContainer: {
    width: '82%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  arrowContainer: {
    width: '18%',
    height: '100%',
    alignItems: 'center',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    justifyContent: 'center',
    backgroundColor: COLOR_GRAY6,
  },
  input: {
    width: '100%',
    height: '100%',
    fontFamily: 'WorkSans-Regular',
    color: COLOR_BLACK,
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: width * 0.9,
    maxHeight: height * 0.5,
    backgroundColor: COLOR_WHITE,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  descriptionText: {
    textAlign: 'left',
    color: COLOR_BLACK,
    fontSize: 16,
    fontFamily: 'WorkSans-Regular',
  },
  optionItem: {
    width: width * 0.9,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLOR_GRAY2,
    borderRadius: 5,
  },
});

export default styles;
