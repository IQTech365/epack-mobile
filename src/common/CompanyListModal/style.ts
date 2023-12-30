import {StyleSheet, Dimensions} from 'react-native';
import {COLOR_ERROR2, COLOR_GRAY4, COLOR_GREEN, COLOR_WHITE} from '../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
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
    width: width * 0.7,
    backgroundColor: COLOR_WHITE,
    borderRadius: 20,
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
  modalText: {
    textAlign: 'center',
    color: COLOR_WHITE,
  },
  descriptionText: {
    textAlign: 'left',
    color: COLOR_GRAY4,
  },
  titleSuccessContainer: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 14,
    backgroundColor: COLOR_GREEN,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  titleErrorContainer: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 14,
    backgroundColor: COLOR_ERROR2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  buttonStyle: {
    width: '25%',
    borderRadius: 25,
    backgroundColor: COLOR_WHITE,
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  buttonText: {
    color: COLOR_GRAY4,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default styles;
