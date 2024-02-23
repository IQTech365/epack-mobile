import {StyleSheet, Dimensions} from 'react-native';
import {COLOR_BLACK, COLOR_GRAY, COLOR_GRAY2} from '../../../utils/colors';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  surveyItemContainer: {
    width: width * 0.9,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLOR_GRAY,
    borderRadius: 5,
    paddingVertical: 5,
    marginBottom: 10,
  },
  contentWraperContainer: {
    width: '80%',
    paddingLeft: 10,
  },
  contentContainer: {
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 8,
  },
  contentLabelText: {
    color: COLOR_BLACK,
    fontSize: 14,
    fontFamily: 'WorkSans-Regular',
  },
  contentLabelText2: {
    color: COLOR_BLACK,
    fontSize: 14,
    fontFamily: 'WorkSans-Medium',
  },
  actionContainer: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalStyle: {
    height: height,
  },
  saveActionContainer: {
    width: width * 0.9,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: 8,
  },
  saveChangeButton: {
    paddingVertical: 7,
    paddingHorizontal: 30,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLOR_GRAY,
  },
  saveText: {
    color: COLOR_BLACK,
    fontSize: 16,
    fontFamily: 'WorkSans-Medium',
  }
});

export default styles;
