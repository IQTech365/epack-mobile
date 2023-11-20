import {StyleSheet, Dimensions} from 'react-native';
import {
  COLOR_BLACK,
  COLOR_BLUE,
  COLOR_GRAY,
  COLOR_GRAY2,
  COLOR_WHITE,
} from '../../../../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  labelContainer: {
    width: width * 0.9,
    paddingVertical: 9,
    paddingHorizontal: 12,
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  labelText: {
    color: COLOR_GRAY,
    fontSize: 18,
    fontWeight: '500',
  },
  textContainer2: {
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'center',
},
label: {
    color: COLOR_BLACK,
    fontSize: 14,
    textAlign:'center'
},
mainWrapper: {
    width: width * 0.9,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
},
textContainer: {
    width: width * 0.44,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    alignSelf: 'center',
},
wrapConatiner:{
    justifyContent: 'space-between',
    // alignItems: 'flex-start',
    // alignSelf: 'center',
    flexDirection: 'row',
},
counterContainer: {
    width: width * 0.40,
    paddingVertical: 9,
    // paddingHorizontal: 19,
    borderRadius: 5,
    borderWidth: 0.7,
    borderColor: COLOR_GRAY,
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    alignSelf: 'center',
    flexDirection:'row',
    
  },
  touchableContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLOR_GRAY,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    
  },
  textStyle: {
    color: COLOR_WHITE,
  },
  previewButtonStyle: {
    backgroundColor: COLOR_BLUE,
    borderRadius: 5,
  },

  previewAddButtonStyle: {
    backgroundColor: COLOR_BLUE,
    borderRadius: 5,
    width: width*0.44
  },

  dropDownStyle:{ 
    width:  width * 0.44, 
    left: width * 0.05 
  },

  opratorTextStyle:{ 
    textAlign: 'center', 
    fontWeight: '500', 
    fontSize: 22,
  },
  inputContainer: {
    width: '100%',
    borderColor: COLOR_GRAY2,
    paddingLeft: 4,
  },
  input: {
    color: COLOR_BLACK,
    fontSize: 14,
  },
});

export default styles;
