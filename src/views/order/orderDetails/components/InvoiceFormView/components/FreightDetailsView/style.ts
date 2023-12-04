import {StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        width: width * 0.98,
        alignItems: 'center',
        alignSelf: 'center'
    }
});

export default styles;