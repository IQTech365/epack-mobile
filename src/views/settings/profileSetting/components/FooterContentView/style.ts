import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_BLACK, COLOR_GRAY, COLOR_GRAY2 } from '../../../../../utils/colors';
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
    container2: {
        width: width * 0.95,
        paddingVertical: 5,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'flex-end',
        marginBottom: 8,
        backgroundColor: COLOR_GRAY2,
      },
      emptyContainer2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      text: {
        color: COLOR_BLACK,
        fontSize: 14,
        fontFamily: 'WorkSans-Regular'
      },
      // list item
      listWrapper: {
        width: width * 0.9,
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: COLOR_BLACK,
      },
      listContentContainer:{
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: COLOR_GRAY2,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginBottom: 5,
      },
      contentTypeContainer:{
        width: width * 0.9,
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        paddingHorizontal: 8,
        paddingBottom: 5,
      },
      contentContainer: {
        width: '70%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 8,
      },
      actionContainer: {
        width: '30%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        paddingRight: 10
      },
      contentTypeText: {
        color: COLOR_BLACK,
        fontSize: 16,
        fontFamily: 'WorkSans-Medium'
      }
      
});

export default styles;