import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_BLACK, COLOR_GRAY } from '../../../../../utils/colors';
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
    currentSignatureContainer: {
        width: width * 0.8,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 5,
        height: 150,
    },
    LabelContainer: {
        width: width * 0.9,
        alignSelf: 'center'
    },
    labelText: {
        color: COLOR_BLACK,
        fontSize: 14,
        fontWeight: '400'
    }

});

export default styles;