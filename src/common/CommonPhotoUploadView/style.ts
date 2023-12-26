import {StyleSheet, Dimensions} from 'react-native';
import {COLOR_BLACK, COLOR_BLUE, COLOR_GRAY2, COLOR_WHITE} from '../../utils/colors';
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  photoCaptureContainer: {
    width: width * 0.9,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderRadius: 5,
    borderStyle: 'dashed',
    borderWidth: 1,
    alignItems: 'center',
    padding: 10,
  },
  button: {
    borderColor: COLOR_BLACK,
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 20,
  },
  photoContainer: {
    width: width * 0.5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: 150,
    height: 150,
    borderRadius: 5,
  },
  changeImageIconContainer: {
    position: 'absolute',
    top: -10,
    right: -10,
    zIndex: 9999,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF0000'
  },
  uploadButton: {
    width: width * 0.25,
    borderRadius: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    borderWidth: 0.7,
    borderColor: COLOR_GRAY2,
    backgroundColor: COLOR_BLUE,
    marginTop: 5,
  },
  uploadText: {
    fontSize: 14,
    color: COLOR_WHITE,
    fontWeight: '400'
  }
});

export default styles;
