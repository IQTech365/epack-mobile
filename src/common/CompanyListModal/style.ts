import {StyleSheet, Dimensions} from 'react-native';
import {COLOR_BLUE, COLOR_ERROR2, COLOR_GRAY, COLOR_GRAY4, COLOR_GRAY6, COLOR_GREEN, COLOR_WHITE} from '../../utils/colors';
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
    width: width * 0.8,
    backgroundColor: COLOR_WHITE,
    borderRadius: 10,
    // alignItems: 'center',
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
    fontSize: 16,
    fontWeight: '500',
  },
  descriptionText: {
    textAlign: 'left',
    color: COLOR_GRAY,
    fontSize: 16,
    fontWeight: '400'
  },
  titleSuccessContainer: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 14,
    backgroundColor: COLOR_GREEN,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  titleErrorContainer: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 14,
    backgroundColor: COLOR_ERROR2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  buttonStyle: {
    width: '25%',
    borderRadius: 20,
    backgroundColor: COLOR_WHITE,
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  buttonText: {
    color: COLOR_GRAY4,
    fontSize: 14,
    fontWeight: '600',
  },
  companyNameItem: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: COLOR_GRAY4,
    // backgroundColor: 'red'
  },
  footerItem: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  footerText: {
    textAlign: 'left',
    color: COLOR_BLUE,
    fontSize: 16,
    fontWeight: '500'
  },
});

export default styles;
