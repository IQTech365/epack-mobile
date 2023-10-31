import {StyleSheet, Dimensions} from 'react-native';
import {COLOR_BLUE, COLOR_GRAY, COLOR_WHITE} from '../../utils/colors';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_WHITE,
    alignItems: 'center',
    // justifyContent: 'center'
  },
  cardContainer:{
    width:width*0.85,
    height:height*0.1,
    backgroundColor:COLOR_WHITE,
    borderRadius:11,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'space-evenly'
  },
  cardcircularBarContainer:{
    margin: 8,
    width:width*0.25,
    height:height*0.12,
    backgroundColor:COLOR_WHITE,
    borderRadius:11,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'space-evenly'
  },
  textStyle:{
    position:'absolute',
    left:width*0.1,
    fontSize:18,
    fontWeight:'bold'
  },
  subTextStyle:{
    position:'absolute',
    bottom:height*0.0001,
    fontSize:10,
    fontWeight:'bold',
    left:width*0.05
  }
});

export default styles;
