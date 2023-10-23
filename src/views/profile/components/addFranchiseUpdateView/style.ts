import {StyleSheet, Dimensions} from 'react-native';
import {
  COLOR_BLACK,
  COLOR_BLUE,
  COLOR_GRAY,
  COLOR_GRAY2,
  COLOR_WHITE,
} from '../../../../utils/colors';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_WHITE,
  },
  elementContainer: {
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'flex-start',
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
  },
  inputContainer: {
    width: '100%',
    borderColor: COLOR_GRAY2,
    paddingLeft: 4,
  },
  inputContainer2: {
    width: '100%',
    height:'20%',
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
    paddingVertical:50,
    // height:'30%',
  },
  twoColumnWrapper: {
    width: width * 0.9,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    width: width * 0.44,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    alignSelf: 'center',
  },
  textStyle: {
    color: COLOR_WHITE,
  },
  previewButtonStyle: {
    backgroundColor: COLOR_BLUE,
    borderRadius: 5,
  },
  textAreaContainer: {
    borderColor: COLOR_GRAY2,
    borderWidth: 1,
    // padding: 5,
  },
  textArea: {
    height: 150,
    width:width*0.88,
    justifyContent: "flex-start",
  }
});

export default styles;