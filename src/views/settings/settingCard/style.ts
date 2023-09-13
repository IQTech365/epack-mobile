import {StyleSheet, Dimensions} from 'react-native';
import {
  COLOR_BLUE,
  COLOR_GRAY,
  COLOR_GRAY2,
  COLOR_ORANGE,
  COLOR_WHITE,
} from '../../../utils/colors';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  cardWrapper: {
    borderRadius: 8,
    alignItems: 'center',
    
  },
  container: {
    width: width * 0.42,
    height:height*0.2,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    
  },

});

export default styles;
