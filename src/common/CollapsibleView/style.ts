import {StyleSheet, Dimensions, ViewStyle, TextStyle, ImageStyle} from 'react-native';
import { COLOR_BLACK, COLOR_GRAY, COLOR_GRAY2 } from '../../utils/colors';
// import color from '../../utilities/color';
// import { fontRegular_600 } from '../../utilities/utils';
const {width} = Dimensions.get('window');

interface IContactDetailsStyle {
  container: ViewStyle;
  header: ViewStyle;
  headerText: TextStyle;
  downarrow: ImageStyle;
  uparrow: ImageStyle;
}

const style = StyleSheet.create<IContactDetailsStyle>({
  container: {
    width: width * 0.96,
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLOR_GRAY2,
    alignSelf: 'center',
    paddingBottom: 15,
  },
  header: {
    width: width * 0.96,
    borderTopStartRadius: 5,
    borderTopEndRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: COLOR_GRAY2,
    alignSelf: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  headerText: {
    color: COLOR_BLACK,
    // fontFamily: fontRegular_600,
    fontSize: 14,
    fontWeight: '700',
  },
  downarrow: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  uparrow: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    transform: [{rotate: '180deg'}]
  },
});

export default style;
