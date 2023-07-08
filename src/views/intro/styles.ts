import {StyleSheet, Dimensions} from 'react-native';
import {COLOR_ORANGE, COLOR_WHITE} from '../../utils/colors';
const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bannerContainer: {
    flex: 0.5,
  },
  banner: {
    width: width,
    resizeMode: 'stretch',
  },
  contentContainer: {
    flex: 0.5,
    width: width * 0.94,
    alignSelf: 'center',
    paddingTop: 20,
    alignItems: 'center',
  },
  nameContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  academyInfoContainer: {
    marginTop: 50,
    width: '100%',
  },
  nameText: {
    color: COLOR_ORANGE,
    fontSize: 16,
    fontWeight: '600',
  },
  taglineText: {
    color: COLOR_WHITE,
    fontSize: 12,
  },
  welcomeText: {
    color: COLOR_WHITE,
    fontSize: 12,
  },
  academyText: {
    color: COLOR_ORANGE,
    fontSize: 20,
    fontWeight: '600',
  },
  founderText: {
    color: COLOR_WHITE,
    fontSize: 12,
  },
  ceoText: {
    color: COLOR_WHITE,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'right',
  },
  quoteContainer: {
    width: '100%',
    alignItems: 'center',
  },
  quoteText: {
    color: COLOR_WHITE,
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 40,
  },
});

export default styles;
