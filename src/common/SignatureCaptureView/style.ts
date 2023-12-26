import {StyleSheet, Dimensions} from 'react-native';
import {COLOR_BLACK, COLOR_BLUE, COLOR_GRAY2, COLOR_WHITE} from '../../utils/colors';
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  signatureWrapper: {
    width: width * 0.9,
    height: 150,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLOR_BLACK,
    borderWidth: 1,
  },
  signature: {
    width: width * 0.88,
    height: 140,
    alignSelf: 'center',
    borderColor: COLOR_BLACK,
    borderWidth: 1,
  },
  prevSignature: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  rowContainer2: {
    width: width * 0.95,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  buttonStyle2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    backgroundColor: COLOR_GRAY2,
    margin: 10,
  },
  buttonText: {
    color: COLOR_BLACK,
    fontSize: 16,
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
