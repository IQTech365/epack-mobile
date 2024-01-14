import React, {FC, useEffect, useRef, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from '../style';
import Spacer from '../../../../common/Spacer';
import Label from '../../../../common/Label';
import Input from '../../../../common/Input';
import {COLOR_BLACK} from '../../../../utils/colors';
import {
  ICustomer,
  ICustomersRequest,
} from '../../../../interface/common/common';
import {useOrderFormContextHook} from '../../../../provider/OrderFormContextProvider';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import {debounce} from '../../../../utils/utility';
import {
  getCustomersRequest,
  resetGetCustomersRequest,
} from '../../../../redux/slices/CommonSlice';
import {Validator} from '../../../../utils/validation';
import { getCurrentCompanyId } from '../../../../utils/storage';

interface IProps {}

const BillingIndividualView: FC<IProps> = ({}) => {
  const dispatch = useAppDispatch();
  const {state, setPartyMobileNo, setPartyName} = useOrderFormContextHook();

  const {
    customers,
    getCustomersRequesting,
    getCustomersSuccess,
    getCustomersFailure,
  } = useAppSelector(state => state.Common);
  const [showCompanyList, setShowCompanyList] = useState<boolean>(false);
  const handleCustomerOption = (customer: ICustomer) => {
    setPartyName(customer.partyName);
    setShowCompanyList(false);
    dispatch(resetGetCustomersRequest());
  };

  const _getCustomerList = (): ICustomer[] => {
    const {data} = customers || {};
    let list: ICustomer[] = [];
    if (data && Array.isArray(data) && data.length > 0) {
      list = data;
    }
    return list;
  };

  const handleMobileNo = async (text: string) => {
    setPartyMobileNo(text);
    if (!Validator.isEmpty(text) && text.length == 10) {
      getCurrentCompanyId().then(id => {
        const payload: ICustomersRequest = {
          companyId: id as string,
          searchKey: text,
        };
        debounce(dispatch(getCustomersRequest(payload)), 3000);
      }).catch(err => console.log(err));
    }
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
          selectionColor={COLOR_BLACK}
          //@ts-ignore
        //   error={showErrors ? errors?.mobile : ''}
          type="mobile"
          inputType="numeric"
          required={true}
          value={state.party_mobile_no}
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
          //@ts-ignore
        //   error={showErrors ? errors?.partyName : ''}
          type="text"
          required={true}
          value={state.party_name}
        />
      </View>
    </>
  );
};

export default BillingIndividualView;
