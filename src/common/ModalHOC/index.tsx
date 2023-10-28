import React, {ReactElement} from 'react';
import {View, Modal, TouchableOpacity, Text} from 'react-native';
import styles from './style';
import CloseIcon from '../../images/icons/close_icon2.svg';

interface IModalProps {
  children: ReactElement;
  visible: boolean;
  onClose: () => void;
  title: string;
}

const ModalHOC: React.FC<IModalProps> = ({
  children,
  visible,
  title,
  onClose,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        // Alert.alert('Modal has been closed.');
        // setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.header}>
          <Text style={styles.titleText}>{title}</Text>
          <TouchableOpacity onPress={onClose}>
            <CloseIcon width={25} height={25} />
          </TouchableOpacity>
        </View>
        {children}
      </View>
    </Modal>
  );
};

export default ModalHOC;
