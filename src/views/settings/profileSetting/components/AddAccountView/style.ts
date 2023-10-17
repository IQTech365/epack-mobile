import {StyleSheet, Dimensions} from 'react-native';
import {
  COLOR_GRAY,
  COLOR_GRAY2,
  COLOR_WHITE,
} from '../../../../../utils/colors';
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    marginTop: 50,
  },
  emptyContainer: {
    width: width * 0.8,
    // paddingVertical: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLOR_GRAY,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelTextStyle: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'right',
  },
  textStyle: {
    fontSize: 15,
    fontWeight: '400',
  },
  borderStyle: {
    width: 20,
    height: '45%',
    borderWidth: 2,
    borderRadius: 12,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  iconStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  upiBorderStyle: {
    width: '6%',
    height: '55%',
    borderWidth: 2,
    borderRadius: 12,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  headStyle: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  previewButtonStyle: {
    backgroundColor: COLOR_WHITE,
    borderColor: COLOR_GRAY,
    borderWidth: 1,
    borderRadius: 20,
    width: width * 0.23,
  },
  buttonTextStyle: {
    fontSize: 8.5,
    textAlign: 'center',
    fontWeight: '500',
  },
  container2: {
    width: width * 0.95,
    paddingVertical: 5,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'flex-end',
    marginBottom: 8,
    backgroundColor: COLOR_GRAY2,
  },
  emptyContainer2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: COLOR_GRAY,
    fontSize: 14,
  },
});

export default styles;
