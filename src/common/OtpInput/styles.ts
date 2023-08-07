import { StyleSheet } from 'react-native';
import { COLOR_WHITE } from '../../utils/colors';

const styles = StyleSheet.create({
    container: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: COLOR_WHITE,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: COLOR_WHITE,
        fontSize: 16
    }
});

export default styles;