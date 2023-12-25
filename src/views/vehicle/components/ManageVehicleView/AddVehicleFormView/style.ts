import {StyleSheet, Dimensions} from 'react-native';
import {
  COLOR_BLACK,
  COLOR_BLUE,
  COLOR_GRAY2,
  COLOR_GRAY5,
  COLOR_WHITE,
} from '../../../../../utils/colors';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width * 0.95,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLOR_GRAY2,
    backgroundColor: COLOR_WHITE,
  },
  elementContainer: {
    position: 'relative',
    width: width * 0.9,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  elementContainer2: {
    flexWrap: 'wrap',
    width: width * 0.9,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'center',
  },
  labelContainer: {
    width: width * 0.9,
    alignSelf: 'center',
  },
  label: {
    color: COLOR_BLACK,
    fontSize: 14,
    zIndex: 1,
  },
  inputContainer: {
    width: '100%',
    borderColor: COLOR_GRAY2,
    paddingLeft: 4,
  },
  inputContainer2: {
    width: '100%',
    height: '20%',
    borderColor: COLOR_GRAY2,
    paddingLeft: 4,
  },
  input: {
    color: COLOR_BLACK,
    fontSize: 14,
  },
  input2: {
    color: COLOR_BLACK,
    fontSize: 14,
    paddingVertical: 50,
    // height:'30%',
  },
  twoColumnWrapper: {
    width: width * 0.9,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  twoColumnWrapper2: {
    width: width * 0.35,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    width: width * 0.44,
    justifyContent: 'space-between',
    // alignItems: 'flex-start',
    alignSelf: 'center',
  },
  textStyle: {
    color: COLOR_WHITE,
  },
  previewButtonStyle: {
    backgroundColor: COLOR_BLUE,
    borderRadius: 5,
  },
  browserButtonStyle: {
    backgroundColor: COLOR_BLUE,
    borderRadius: 5,
    width: width * 0.35,
    height: '20%',
  },
  browsertextStyle: {
    color: COLOR_WHITE,
    fontSize: 8,
  },
  textAreaContainer: {
    borderColor: COLOR_GRAY2,
    borderWidth: 1,
    // padding: 5,
  },
  textArea: {
    height: 150,
    width: width * 0.88,
    justifyContent: 'flex-start',
  },
  uploadLicenceStyle: {
    width: '100%',
    height: 150,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLOR_GRAY5,
    justifyContent: 'center',
  },
  uploadLicenceTextStyle: {
    textAlign: 'center',
  },
  uploadContainer: {
    height: 150,
    borderStyle: 'dotted',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLOR_GRAY5,
    justifyContent: 'center',
  },
  uploadContainerText: {
    textAlign: 'center',
    fontWeight: '500',
  },
  orBorderStyle: {
    borderWidth: 0.7,
    width: '40%',
    borderColor: COLOR_GRAY5,
  },
  cameraText: {
    textAlign: 'center',
    color: COLOR_BLUE,
  },
  mainPhotoViewContainer: {
    width: width * 0.9,
    alignSelf: 'center',
  },
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
    width: '100%',
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
