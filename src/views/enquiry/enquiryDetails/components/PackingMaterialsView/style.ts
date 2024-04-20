import {StyleSheet, Dimensions} from 'react-native';
import {
  COLOR_BLACK,
  COLOR_BLUE,
  COLOR_GRAY,
  COLOR_GRAY2,
  COLOR_GRAY3,
  COLOR_WHITE,
} from '../../../../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  labelContainer: {
    width: width * 0.92,
    paddingVertical: 9,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: COLOR_GRAY2,
    borderRadius: 5,
  },
  labelText: {
    color: COLOR_BLACK,
    fontSize: 18,
    fontFamily: 'WorkSans-SemiBold'
  },
  textContainer2: {
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'center',
},
label: {
    color: COLOR_BLACK,
    fontSize: 16,
    textAlign:'center',
    fontFamily: 'WorkSans-Medium'
},
mainWrapper: {
    width: width * 0.9,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
},
textContainer: {
    width: width * 0.44,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    alignSelf: 'center',
},
wrapConatiner:{
    justifyContent: 'space-between',
    flexDirection: 'row',
},
counterContainer: {
    width: width * 0.40,
    paddingVertical: 9,
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
  manageCountContainer: {
    width: '100%',
    alignItems: 'center',
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
},
countActionContainer: {
  width: '30%',
  alignItems: 'center',
  justifyContent: 'center'
},

wrapper: {
  width: width * 0.9,
  alignSelf: 'center',
  alignItems: 'center',
},

unitContainer: {
  width: '45%',
  alignItems: 'center',
  justifyContent: 'center',
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
  inputContainer: {
    width: '100%',
    borderColor: COLOR_GRAY2,
    paddingLeft: 4,
  },
  input: {
    color: COLOR_BLACK,
    fontSize: 14,
  },
  showListButtonContainer: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: COLOR_BLACK,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: COLOR_BLACK,
  },
  buttonText: {
    color: COLOR_WHITE,
    fontSize: 14,
    fontFamily: 'WorkSans-Medium'
  },
  modalStyle: {
    width: width * 0.9,
  }
});

export default styles;
