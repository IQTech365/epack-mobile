import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_BLACK, COLOR_BLUE, COLOR_GRAY, COLOR_GRAY2, COLOR_WHITE } from '../../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoContainer: {
        height: '50%',
        width: width * 0.80,
        borderWidth: 1,
        borderColor: COLOR_BLACK,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cameraContainer: {
        height: '20%',
    },
    galleryContainer: {
        height: '20%',
    },
    logo: {
        width: 200,
        height: 200,
    },
    button: {
        width: width * 0.8,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR_BLACK,
        alignItems: 'center',
        alignSelf: 'center',
        paddingVertical: 20,
        borderStyle: 'dashed'
    },
    text: {
        fontSize: 18,
    },
    titleText: {
        fontSize: 18,
        color: COLOR_BLACK,
        fontWeight: '400',
        paddingHorizontal: 16,
    },
    contentContainer: {
        flex: 0.9,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
      },
      prevButtonContainer: {
        width: '50%',
      },
      nextButtonContainer: {
        width: '50%',
      },
      buttonStyle: {
        backgroundColor: COLOR_BLUE,
        width: '80%',
        alignSelf: 'center',
      },
      skipButtonStyle: {
        backgroundColor: COLOR_GRAY,
        width: '80%',
        alignSelf: 'center',
      },
      buttonTextStyle: {
        color: COLOR_WHITE,
      },
});

export default styles;