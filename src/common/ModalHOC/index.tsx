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
  headerStyle?:ViewStyle;
}

const ModalHOC: React.FC<IModalProps> = ({
  children,
  visible,
  title,
  onClose,
  modalStyle,
  headerStyle,
}) => {
  return (
    <View style={[styles.centeredView]}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {}}>
        <View style={[styles.centeredView]}>
          <View style={[styles.modalView, modalStyle]}>
            <View style={[styles.header, headerStyle]}>
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
