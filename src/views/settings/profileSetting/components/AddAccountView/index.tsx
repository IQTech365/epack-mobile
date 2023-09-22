import React, {useRef} from 'react';
import {View, Text, Dimensions} from 'react-native';
import styles from './style';
import BottomSheet from '@gorhom/bottom-sheet';
import FormModal from '../../../formModal';
import AccountDetailUpdateView from '../AccountDetailUpdateView';
import {
  TouchableOpacity,
} from 'react-native-gesture-handler';
const {height} = Dimensions.get('screen');

const AddAccountView = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const presentModal = () => {
    bottomSheetRef.current?.snapToIndex(1);
  };

  const dismissModal = () => {
    bottomSheetRef.current?.close();
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.emptyContainer}>
        <TouchableOpacity onPress={presentModal}>
          <Text>Add Account</Text>
        </TouchableOpacity>
      </View>
      <FormModal ref={bottomSheetRef} onClose={dismissModal}>
        <AccountDetailUpdateView />
      </FormModal>
    </View>
  );
};

export default AddAccountView;
