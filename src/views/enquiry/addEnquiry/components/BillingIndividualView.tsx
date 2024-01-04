import React, {FC, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from '../style';
import Spacer from '../../../../common/Spacer';
import Label from '../../../../common/Label';
import Input from '../../../../common/Input';
import {useEnquiryFormContextHook} from '../../../../provider/EnquiryFormContextProvider';
import {COLOR_BLACK} from '../../../../utils/colors';
import {
  ICustomer,
  ICustomersRequest,
} from '../../../../interface/common/common';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import {
  getCustomersRequest,
  resetGetCustomersRequest,
} from '../../../../redux/slices/CommonSlice';
import {Validator} from '../../../../utils/validation';
import useCompanyId from '../../../../hooks/useCompanyId';
import {debounce} from '../../../../utils/utility';

interface IProps {}

const BillingIndividualView: FC<IProps> = ({}) => {
  const dispatch = useAppDispatch();
  const companyId = useCompanyId();
  const {state, setPartyMobileNo, setPartyName, setCustomerId} = useEnquiryFormContextHook();
  const [showCompanyList, setShowCompanyList] = useState<boolean>(false);
  const [selectedCompanyOption, setSelectedCompanyOption] = useState<ICustomer | null>(null);
  const {
    customers,
    getCustomersRequesting,
    getCustomersSuccess,
    getCustomersFailure,
  } = useAppSelector(state => state.Common);

  const handleMobileNo = (text: string) => {
    setPartyMobileNo(text);
    if (!Validator.isEmpty(text) && text.length == 10) {
      const payload: ICustomersRequest = {
        companyId: companyId,
        searchKey: text,
      };
      debounce(dispatch(getCustomersRequest(payload)), 3000);
    }
  };

  const _getCustomerList = (): ICustomer[] => {
    const {data} = customers || {};
    let list: ICustomer[] = [];
    if (data && Array.isArray(data) && data.length > 0) {
      list = data;
    }
    return list;
  };

  const handleCustomerOption = (customer: ICustomer) => {
    setSelectedCompanyOption(customer);
    setPartyName(customer.partyName);
    setCustomerId(customer._id);
    setShowCompanyList(false);
    dispatch(resetGetCustomersRequest());
  };

  useEffect(() => {
    if (
      !getCustomersRequesting &&
      (getCustomersSuccess || getCustomersFailure)
    ) {
      setShowCompanyList(true);
    }
  }, [
    customers,
    getCustomersRequesting,
    getCustomersSuccess,
    getCustomersFailure,
  ]);
  return (
    <>
      <Spacer height={4} />
      <View style={styles.elementContainer}>
        <Label text="Mobile Number" style={styles.label} required={true} />
        <Input
          onChangeText={handleMobileNo}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          inputType="numeric"
          selectionColor={COLOR_BLACK}
          value={state.party_mobile_no}
          //@ts-ignore
          //   error={showErrors ? errors?.mobile : ''}
          required={true}
          type="mobile"
        />
      </View>
      <Spacer height={4} />
      {showCompanyList &&
        _getCustomerList().map((d: ICustomer) => {
          return (
            <TouchableOpacity
              style={styles.customerItemContainer}
              onPress={() => handleCustomerOption(d)}>
              <Text style={styles.customerNameText}>{d.partyName}</Text>
            </TouchableOpacity>
          );
        })}
      <Spacer height={4} />
      <View style={styles.elementContainer}>
        <Label text="Party Name" style={styles.label} required={true} />
        <Input
          onChangeText={setPartyName}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          selectionColor={COLOR_BLACK}
          value={state.party_name}
          //@ts-ignore
          // error={showErrors ? errors?.partyName : ''}
          type="text"
          required={true}
        />
      </View>
    </>
  );
};

export default BillingIndividualView;
