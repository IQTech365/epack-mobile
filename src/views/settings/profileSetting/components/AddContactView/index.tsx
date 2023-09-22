import React, {useRef} from 'react';
import {View, Dimensions, FlatList} from 'react-native';
import styles from './style';
import BottomSheet from '@gorhom/bottom-sheet';
import FormModal from '../../../formModal';
import ContactDetailUpdateView from '../contactDetailUpdateView';
import EmptyView from '../../../emptyView';

const AddContactView = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const presentModal = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };

  const dismissModal = () => {
    bottomSheetRef.current?.close();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={[]}
        contentContainerStyle={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        renderItem={({item, index}) => null}
        ListEmptyComponent={
          <EmptyView message="You have not added any contact yet!" onPress={presentModal} />
        }
      />
      <FormModal ref={bottomSheetRef} onClose={dismissModal}>
        <ContactDetailUpdateView />
      </FormModal>
    </View>
  );
};

export default AddContactView;
