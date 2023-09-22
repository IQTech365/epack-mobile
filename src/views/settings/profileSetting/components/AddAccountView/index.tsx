import React, {useRef} from 'react';
import {View, Text, Dimensions, FlatList} from 'react-native';
import styles from './style';
import BottomSheet from '@gorhom/bottom-sheet';
import FormModal from '../../../formModal';
import AccountDetailUpdateView from '../AccountDetailUpdateView';
import {TouchableOpacity} from 'react-native-gesture-handler';
import EmptyView from '../../../emptyView';
const {height} = Dimensions.get('screen');

const AddAccountView = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const presentModal = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };

  const dismissModal = () => {
    bottomSheetRef.current?.close();
  };

  return (
    <View style={{flex: 1, alignItems: 'center',
    justifyContent: 'center',}}>
      <FlatList
        data={[]}
        contentContainerStyle={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        renderItem={({item, index}) => null}
        ListEmptyComponent={
          <EmptyView
            message="You have not added any account yet!"
            onPress={presentModal}
          />
        }
      />
      <FormModal ref={bottomSheetRef} onClose={dismissModal}>
        <AccountDetailUpdateView />
      </FormModal>
    </View>
  );
};

export default AddAccountView;
