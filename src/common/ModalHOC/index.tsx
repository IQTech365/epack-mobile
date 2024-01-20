import React, {ReactElement} from 'react';
import {View, Modal, TouchableOpacity, Text, ViewStyle} from 'react-native';
import styles from './style';
import CloseIcon from '../../images/icons/close_icon2.svg';

interface IModalProps {
  children: ReactElement;
  visible: boolean;
  onClose: () => void;
  title: string;
  modalStyle?: ViewStyle;
}

const ModalHOC: React.FC<IModalProps> = ({
  children,
  visible,
  title,
  onClose,
  modalStyle,
}) => {
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {}}>
        <View style={[styles.centeredView]}>
          <View style={styles.modalView}>
            <View style={styles.header}>
              <Text style={styles.titleText}>{title}</Text>
              <TouchableOpacity onPress={onClose}>
                <CloseIcon width={25} height={25} />
              </TouchableOpacity>
            </View>
            {children}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalHOC;
