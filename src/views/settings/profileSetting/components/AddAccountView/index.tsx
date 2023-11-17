import React, {useState,useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import styles from './style';
import AccountDetailUpdateView from '../AccountDetailUpdateView';
import Spacer from '../../../../../common/Spacer';
import EditIcon from '../../../../../images/icons/edit2.svg';
import DleteIcon from '../../../../../images/icons/delete.svg';
import Button from '../../../../../common/Button';
import ListViewIcon from '../../../../../images/icons/list_view_icon.svg';
import ListViewIcon2 from '../../../../../images/icons/list_view_icon2.svg';
import CreateIcon from '../../../../../images/icons/create_icon.svg';
import CreateIcon2 from '../../../../../images/icons/create_icon2.svg';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { getPaymentMethodsRequest } from '../../../../../redux/slices/ProfileSettingSlice';

const AddAccountView = () => {
  const [showPaymentMethodList, setShowPaymentMethodList] =
    useState<boolean>(false);
  const [showAddPaymentMehod, setShowAddPaymentMethod] =
    useState<boolean>(true);
    const {addCompanyInfo, companies} = useAppSelector(state => state.Company);
    const dispatch = useAppDispatch();

    const getCompanyId = () => {
      let id;
      const {data} = addCompanyInfo || {};
      const {data: companiesData} = companies || {};
      if (data && Object.keys(data).length > 0) {
        id = data._id;
      } else if (
        companiesData &&
        Array.isArray(companiesData) &&
        companiesData.length > 0
      ) {
        const firstCompany = companiesData[0];
        id = firstCompany._id;
      } else if(companiesData && companiesData.hasOwnProperty('_id')) {
        id = companiesData._id;
      }
      return id;
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
            <View style={{right: '30%'}}>
              <EditIcon width={25} height={25} />
            </View>
            <DleteIcon width={25} height={25} />
          </View>
        </View>
        <View style={{justifyContent: 'center'}}>
          {/* <Spacer height={2} /> */}
          <View style={styles.headStyle}>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.labelTextStyle}>Bank Name :</Text>
              <Text style={styles.labelTextStyle}>Account Holder Name:</Text>
              <Text style={styles.labelTextStyle}>Account Number:</Text>
              <Text style={styles.labelTextStyle}>IFSC Code :</Text>
            </View>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.textStyle}>State Bank</Text>
              <Text style={styles.textStyle}>State Bank</Text>
              <Text style={styles.textStyle}>State Bank</Text>
              <Text style={styles.textStyle}>State Bank</Text>
            </View>
          </View>
          <Spacer height={2} />
        </View>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Button
              text="Quotation"
              onPress={() => {
                console.log('submitted data');
              }}
              disabled={false}
              style={styles.previewButtonStyle}
              textStyle={styles.buttonTextStyle}
            />
            <View style={{left: '70%'}}>
              <Button
                text="Invoice"
                onPress={() => {
                  console.log('submitted data');
                }}
                disabled={false}
                style={styles.previewButtonStyle}
                textStyle={styles.buttonTextStyle}
              />
            </View>
          </View>
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
            <View style={{right: '30%'}}>
              <EditIcon width={25} height={25} />
            </View>
            <DleteIcon width={25} height={25} />
          </View>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Spacer height={2} />
          <View style={styles.headStyle}>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.labelTextStyle}>UPI Name :</Text>
              <Text style={styles.labelTextStyle}>UPI ID :</Text>
            </View>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.textStyle}>State Bank</Text>
              <Text style={styles.textStyle}>State Bank</Text>
            </View>
          </View>
          <Spacer height={2} />
        </View>
      </View>
    );
  };

  useEffect(() => {
    dispatch(getPaymentMethodsRequest(getCompanyId()))
  }, []);

  const showEmptyView = () => {
    return (
      <View style={styles.emptyContainer2}>
        <Text>No Payment Method Found!</Text>
      </View>
    );
  };

  const handleCreateNewBilty = () => {
    setShowPaymentMethodList(false);
    setShowAddPaymentMethod(true);
  };

  const handleShowBiltyList = () => {
    setShowPaymentMethodList(true);
    setShowAddPaymentMethod(false);
  };

  const showForm = () => {
    if (showAddPaymentMehod) {
      return <AccountDetailUpdateView />;
    }
    return null;
  };

  const showList = () => {
    if (showPaymentMethodList) {
      return (
        <FlatList
          data={[]}
          renderItem={({item, index}) => <Text>Hello</Text>}
          ListEmptyComponent={showEmptyView()}
        />
      );
    }
    return null;
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <View style={styles.container2}>
        <TouchableOpacity onPress={handleShowBiltyList} activeOpacity={0.4}>
          {showPaymentMethodList ? (
            <ListViewIcon2 width={30} height={30} />
          ) : (
            <ListViewIcon width={30} height={30} />
          )}
        </TouchableOpacity>
        <Spacer width={10} />
        <TouchableOpacity onPress={handleCreateNewBilty} activeOpacity={0.4}>
          {showAddPaymentMehod ? (
            <CreateIcon2 width={30} height={30} />
          ) : (
            <CreateIcon width={30} height={30} />
          )}
        </TouchableOpacity>
        <Spacer width={10} />
      </View>
      {showForm()}
      {showList()}
    </View>
  );
};

export default AddAccountView;
