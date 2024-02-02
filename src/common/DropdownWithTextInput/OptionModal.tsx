import React, {FC} from 'react';
import {FlatList, Modal, Text, TouchableOpacity, View} from 'react-native';
import styles from './style';

interface IProps {
  visible: boolean;
  onPress: (item: string) => void;
  data: string[];
}

const OptionModal: FC<IProps> = ({visible, onPress, data}) => {
  const renderOption = (item: string, index: number) => {
    return (
      <TouchableOpacity
        key={`${index}`}
        activeOpacity={0.6}
        onPress={() => onPress(item)}
        style={styles.optionItem}>
        <Text style={styles.descriptionText}>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.modalContainer}>
      <Modal animationType="fade" transparent={true} visible={visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <FlatList
              data={data}
              renderItem={({item, index}) => renderOption(item, index)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default OptionModal;
