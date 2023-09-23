import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_GRAY2, COLOR_LIGHT_GREEN, COLOR_WHITE } from '../../../utils/colors';
const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
    wrapper: {
        // flex:1,
        width: width * 0.9,
        height:height*0.3,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: COLOR_WHITE,
        backgroundColor: COLOR_LIGHT_GREEN,
        alignSelf: 'center',
        elevation: 4,
        shadowColor: 'rgba(0, 0, 0, 0.3)', 
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 1,
        shadowRadius: 1,
    },
    container: {
        // alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        // borderColor: COLOR_GRAY2,
        // borderRadius: 5,
        // borderWidth: 1,
        // paddingHorizontal: 40,
        paddingVertical: 10,
        marginTop: 10,

    },
    borderLine: {
        width: width * 0.9,
        borderWidth: 0.15,
        // borderColor: COLOR_GRAY,
        elevation: 4,
        shadowColor: 'rgba(0, 0, 0, 0.3)'
      },
      headerContainerStyle:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        // height: '35%',
        alignItems: 'center',
    },
    headerTextStyle:{
       fontSize: 15,
        fontWeight: 500 
      }
});

export default styles;