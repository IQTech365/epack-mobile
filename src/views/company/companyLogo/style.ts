import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_BLACK, COLOR_GRAY2 } from '../../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        height: '80%',
        alignItems: 'center'
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
        // borderWidth: 2,
        // borderColor: COLOR_BLACK,
    },
    galleryContainer: {
        height: '20%',
        // borderWidth: 2,
        // borderColor: COLOR_BLACK,
    },
    logo: {
        width: 200,
        height: 200,
    },
    button: {
        width: width * 0.8,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: COLOR_BLACK,
        alignItems: 'center',
        alignSelf: 'center',
        paddingVertical: 20
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
});

export default styles;