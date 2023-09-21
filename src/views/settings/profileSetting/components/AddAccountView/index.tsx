import React, {useRef} from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import BottomSheet, {BottomSheetModal,} from '@gorhom/bottom-sheet';
import FormModal from '../../../formModal';
import AccountDetailUpdateView from '../AccountDetailUpdateView';
import {GestureHandlerRootView, TouchableOpacity} from 'react-native-gesture-handler';

const AddAccountView = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const presentModal = () => {
    bottomSheetRef.current?.present();
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
      <FormModal ref={bottomSheetRef}>
        <AccountDetailUpdateView onClose={dismissModal} />
      </FormModal>
    </View>
  );
};

export default AddAccountView;
