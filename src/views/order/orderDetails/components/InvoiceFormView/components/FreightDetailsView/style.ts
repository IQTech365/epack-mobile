import {StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        width: width,
        alignItems: 'center'
    }
});

export default styles;