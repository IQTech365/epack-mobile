import {StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        width: width * 0.45,
        marginLeft: 2,
        marginTop: 8,
    },
    container2: {
        width: width * 0.45,
        marginLeft: 8,
        marginTop: 8,
    },
    template: {
        width: '100%',
        height: 150,
    },
});

export default styles;