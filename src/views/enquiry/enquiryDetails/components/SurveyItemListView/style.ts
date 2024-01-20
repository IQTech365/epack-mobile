import {StyleSheet, Dimensions} from 'react-native';
import {
  COLOR_BLACK,
  COLOR_BLUE,
  COLOR_GRAY,
  COLOR_GRAY2,
  COLOR_GRAY3,
  COLOR_GRAY4,
  COLOR_GRAY5,
  COLOR_GRAY6,
  COLOR_WHITE,
} from '../../../../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLOR_BLACK,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row'
  },
  avatarContainer: {
    width: '10%',
  },
  surveyDateAndNumberContainer: {
    width: width * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 0.5,
    borderColor: COLOR_GRAY,
    borderRadius: 5,
    marginBottom: 8,
  },
  rightContentContainer: {
    width: '100%',
    paddingLeft: 10,
  },
  labelContainer: {
    width: width * 0.9,
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLOR_GRAY,
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  labelText: {
    color: COLOR_GRAY,
    fontSize: 16,
    fontWeight: '500',
  },
  contentContainer: {
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 6,
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
  nameText: {
    color: COLOR_BLUE,
    fontSize: 14,
  },
  actionContainer: {
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    backgroundColor: COLOR_GRAY6,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  actionText: {
    color: COLOR_BLACK,
    fontSize: 16,
    fontFamily: 'WorkSans-Regular',
  },
  action: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
},
});

export default styles;
