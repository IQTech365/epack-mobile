import {StyleSheet, Dimensions} from 'react-native';
import {
  COLOR_BLACK,
  COLOR_GRAY2,
  COLOR_GRAY3,
} from '../../../../../utils/colors';
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  contentWrapper: {
    width: width * 0.95,
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLOR_GRAY2,
  },
  rowContainer: {
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  rowItemContainer1: {
    width: '45%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLOR_GRAY3,
    paddingVertical: 12,
    paddingLeft: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: COLOR_GRAY2,
  },
  rowItemContainer2: {
    width: '55%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 12,
    paddingLeft: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: COLOR_GRAY2,
  },
  labelText: {
    color: COLOR_BLACK,
    fontSize: 16,
    fontFamily: 'WorkSans-Medium',
    marginRight: 8,
  },
  valueText: {
    color: COLOR_BLACK,
    fontSize: 15,
    fontFamily: 'WorkSans-Regular',
  },

  imageStyle: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  imageStyle1: {
    width: 350,
    height: 300,
    resizeMode: 'contain',
  },

  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
    marginRight: 10,
    backgroundColor: COLOR_BLACK,
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
});

export default styles;
