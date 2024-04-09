import React from "react";
import {View, Modal, StyleSheet, Dimensions, Text, Pressable} from 'react-native';
import LimitReachImage from '../../images/icons/limit_reach.svg';
import CloseIcon from '../../images/icons/close_icon.svg';
import { COLOR_GRAY } from "../../utils/colors";

interface IProps {
    visible:boolean;
    onClose: () => void;
    onUpgrade: () => void;
}

const AlertModal = ({visible, onClose, onUpgrade}:IProps) => {

    return (
        <View style={styles.centeredView}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
              onClose();
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.headerContainer}>
                  <Pressable onPress={onClose}>
                    <CloseIcon />
                  </Pressable>
                </View>
                <Text style={styles.modalText}>Your document create limit has been reached. Please upgrade your plan.</Text>
                <LimitReachImage width={200} height={200} />
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={onUpgrade}>
                  <Text style={styles.textStyle}>UPGRADE</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      );
}

export default AlertModal;


const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
      backgroundColor: 'rgba(0,0,0, 0.6)'
    },
    modalView: {
      width: width * 0.9,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 15,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      paddingVertical: 10,
      paddingHorizontal: 30,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      fontFamily: 'WorkSans-Medium',
      fontSize: 16,
      color: COLOR_GRAY,
    },
    headerContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',

    },
  });