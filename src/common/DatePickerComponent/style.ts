import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_GRAY, COLOR_GRAY2 } from '../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        width: width * 0.44,
        borderWidth: 0.5,
        borderColor: COLOR_GRAY,
        paddingVertical: 12,
        borderRadius: 5,
        paddingHorizontal: 8,
    },
    errorBorderColor: {
        borderColor: 'red',
    },
    contentContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    errorContainer: {
        width: width * 0.9,
        alignSelf: 'center',
        textAlign: 'left',
        marginTop: 5,
      },
      errorText: {
        color: 'red',
        fontSize: 12,
      }
});

export default styles;