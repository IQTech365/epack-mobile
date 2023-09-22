import React, {useRef} from 'react';
import {View, FlatList} from 'react-native';
import styles from './style';
import BottomSheet from '@gorhom/bottom-sheet';
import FormModal from '../../../formModal';
import Header from '../../../../../common/Header';
import SerialNoSettingPageView from '../../../../company/serialNoSettings';
import Spacer from '../../../../../common/Spacer';
import EmptyView from '../../../emptyView';

const AddSerialNoView = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const presentModal = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };

  const dismissModal = () => {
    bottomSheetRef.current?.close();
  };

  return (
    <View style={{flex: 1}}>
      <Header canGoBack={true} label="Serial No Setting" />
      <Spacer height={8} />
      <FlatList
        data={[]}
        contentContainerStyle={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        renderItem={({item, index}) => null}
        ListEmptyComponent={
          <EmptyView message="No Serial Number Added" onPress={presentModal} />
        }
      />
      <FormModal ref={bottomSheetRef} onClose={dismissModal}>
        <SerialNoSettingPageView />
      </FormModal>
    </View>
  );
};

export default AddSerialNoView;
