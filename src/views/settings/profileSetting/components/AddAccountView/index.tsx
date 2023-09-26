import React, { useRef } from 'react';
import { View, Text, Dimensions, FlatList, ScrollView } from 'react-native';
import styles from './style';
import BottomSheet from '@gorhom/bottom-sheet';
import FormModal from '../../../formModal';
import AccountDetailUpdateView from '../AccountDetailUpdateView';
import EmptyView from '../../../emptyView';
import Spacer from '../../../../../common/Spacer';
import EditIcon from '../../../../../images/icons/edit2.svg';
import DleteIcon from '../../../../../images/icons/delete.svg';



const AddAccountView = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const presentModal = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };

  const dismissModal = () => {
    bottomSheetRef.current?.close();
  };

  const rederItemBankAccount = (index: number) => {
    return (
      <View>
        <Spacer height={8} />
        <View style={styles.iconStyle}>
          <View style={styles.borderStyle}>
            <Text style={styles.labelTextStyle}>{index + 1}</Text>

          </View>
          <View style={styles.iconStyle}>
            <View style={{ right: '30%' }}>
              <EditIcon width={25} height={25} />
            </View>
            <DleteIcon width={25} height={25} />
          </View>
        </View>
        <View style={{ justifyContent: 'center' }}>
          {/* <Spacer height={2} /> */}
          <View style={styles.headStyle}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={styles.labelTextStyle}>Bank Name :</Text>
              <Text style={styles.labelTextStyle}>Account Holder Name:</Text>
              <Text style={styles.labelTextStyle}>Account Number:</Text>
              <Text style={styles.labelTextStyle}>IFSC Code :</Text>
            </View>
            <View style={{ flexDirection: 'column' }}>
              <Text style={styles.textStyle}>State Bank</Text>
              <Text style={styles.textStyle}>State Bank</Text>
              <Text style={styles.textStyle}>State Bank</Text>
              <Text style={styles.textStyle}>State Bank</Text>
            </View>
          </View>
          <Spacer height={2} />

        </View>
      </View>

    );
  };

  const rederItemUPIDeatail = (index: number) => {
    return (
      <View>
        <Spacer height={10} />
        <View style={styles.iconStyle}>
          <View style={styles.upiBorderStyle}>
            <Text style={styles.labelTextStyle}>{index + 1}</Text>

          </View>
          <View style={styles.iconStyle}>
            <View style={{ right: '30%' }}>
              <EditIcon width={25} height={25} />
            </View>
            <DleteIcon width={25} height={25} />
          </View>
        </View>
        <View style={{ justifyContent: 'center' }}>
          <Spacer height={2} />
          <View style={styles.headStyle}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={styles.labelTextStyle}>UPI Name :</Text>
              <Text style={styles.labelTextStyle}>UPI ID :</Text>
            </View>
            <View style={{ flexDirection: 'column' }}>
              <Text style={styles.textStyle}>State Bank</Text>
              <Text style={styles.textStyle}>State Bank</Text>
            </View>
          </View>
          <Spacer height={2} />

        </View>
      </View>

    );
  };

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>

      <EmptyView
        message="Bank Accounts"
        onPress={presentModal}
      >
        <FlatList
          data={['ss', 'hh', 'rr']}
          contentContainerStyle={{
            flex: 1,
          }}
          renderItem={({ item, index }) => rederItemBankAccount(index)
          }
          keyExtractor={item => item}
        />
      </EmptyView>

      <Spacer height={8} />
      <EmptyView
        message="UPI Details"
        onPress={presentModal}
      >
        <FlatList
          data={['ss', 'hh', 'rr']}
          contentContainerStyle={{
            flex: 1,
          }}
          renderItem={({ item, index }) => rederItemUPIDeatail(index)
          }
          keyExtractor={item => item}
        />
      </EmptyView>

      <FormModal ref={bottomSheetRef} onClose={dismissModal}>
        <AccountDetailUpdateView />
      </FormModal>
    </View>
  );
};

export default AddAccountView;
