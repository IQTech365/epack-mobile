import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_BLACK, COLOR_BLUE, COLOR_GRAY, COLOR_WHITE } from '../../../../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width * 0.85,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_WHITE,
    borderWidth: 0.5,
    borderRadius: 5,
    marginTop: 20,
    paddingBottom: 20,
  },
  elementContainer: {
    width: width * 0.8,
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemContainer: {
    width: width * 0.38,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    alignSelf: 'center',
  },
  input: {
    color: COLOR_BLACK,
    fontSize: 14,
  },
  inputContainer: {
    width: '100%',
    borderColor: COLOR_GRAY,
    paddingLeft: 4,
    borderWidth: 0.5,
  },
  label: {
    color: COLOR_BLACK,
    fontSize: 14,
    fontFamily: 'WorkSans-Medium'
  },
  labelContainer: {
    width: width * 0.9,
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
  elementContainer3: {
    width: width * 0.8,
    alignSelf: 'center',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  datePicker: {
      width: '100%',
  },
  textStyle: {
    color: COLOR_WHITE,
  },
  previewButtonStyle: {
    backgroundColor: COLOR_BLUE,
    borderRadius: 5,
    width: width * 0.7
  },
  addMoreContainer: {
    borderWidth: 1,
    borderColor: COLOR_BLUE,
    width: width * 0.44,
    paddingVertical: 12,
  },
  addMoreText: {
    color: COLOR_BLACK,
    fontSize: 16,
  }
});

export default styles;
