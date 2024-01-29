import React, {useRef} from 'react';
import {View, FlatList} from 'react-native';
import styles from './style';
import BottomSheet from '@gorhom/bottom-sheet';
import FormModal from '../../../formModal';
import EmptyView from '../../../emptyView';
import SignatureUpdateView from '../SignatureFormView';
import Spacer from '../../../../../common/Spacer';
import Label from '../../../../../common/Label';

const AddSignatureView = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const presentModal = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };

  const dismissModal = () => {
    bottomSheetRef.current?.close();
  };

  return (
    <View style={{flex: 1, justifyContent: 'flex-start'}}>
      <View style={styles.currentSignatureContainer}></View>
      <Spacer height={4} />
      <View style={styles.LabelContainer}>
        <Label text='CHANGE SIGNATURE' style={styles.labelText} />
      </View>
    </View>
  );
};

export default AddSignatureView;
