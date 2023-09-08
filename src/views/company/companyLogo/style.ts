import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_GRAY2 } from '../../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        height: '80%',
        alignItems: 'center'
    },
    logoContainer: {
        height: '40%',
    },
    cameraContainer: {
        height: '30%',
    },
    galleryContainer: {
        height: '30%',
    },
    logo: {
        width: 200,
        height: 200,
    },
    button: {
        width: width * 0.8,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR_GRAY2,
        alignItems: 'center',
        alignSelf: 'center',
        paddingVertical: 50
    },
    text: {
        fontSize: 18,
    }
});

export default styles;