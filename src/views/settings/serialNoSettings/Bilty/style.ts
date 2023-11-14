import { StyleSheet, Dimensions } from 'react-native';
import { COLOR_BLUE, COLOR_GRAY2, COLOR_GRAY5, COLOR_WHITE } from '../../../../utils/colors';
const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
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
  checkboxContainer: {
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'center',
  },
  downloadDisabledButton: {
    alignSelf: 'center',
    paddingHorizontal: 15,
    paddingVertical: 6,
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: COLOR_GRAY5,
  },
  downloadText: {
    color: COLOR_WHITE,
    fontSize: 14,
  },
  downloadButton: {
    alignSelf: 'center',
    paddingHorizontal: 15,
    paddingVertical: 6,
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: COLOR_BLUE
  },
});

export default styles;
