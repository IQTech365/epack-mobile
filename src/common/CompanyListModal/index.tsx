import React from 'react';
import {Modal, Text, View} from 'react-native';
import Button from '../Button';
import Spacer from '../Spacer';
import styles from './style';

interface IProps {
  visible: boolean;
  onPress: () => void;
  message?: string;
}

const CompanyListModal: React.FC<IProps> = ({visible, onPress, message}) => {
  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onPress}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.titleSuccessContainer}>
              <Text style={styles.modalText}>You Listed Companies</Text>
            </View>
            <Spacer height={20} />
            <Text style={styles.descriptionText}>List display here...</Text>
            <Spacer height={20} />
            <Button
              text="OK"
              onPress={onPress}
              style={styles.buttonStyle}
              textStyle={styles.buttonText}
            />
            <Spacer height={10} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CompanyListModal;
