import React, {useEffect, useRef, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './style';
import {useQuotationFormContextHook} from '../../../../../provider/QuotationFormContextProvider';
import Label from '../../../../../common/Label';
import Input from '../../../../../common/Input';
import {COLOR_BLACK} from '../../../../../utils/colors';
import Spacer from '../../../../../common/Spacer';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import {
  getCustomersRequest,
  resetGetCustomersRequest,
} from '../../../../../redux/slices/CommonSlice';
import {
  ICustomer,
  ICustomersRequest,
} from '../../../../../interface/common/common';
import { debounce } from '../../../../../utils/utility';
import { Validator } from '../../../../../utils/validation';
import { getCurrentCompanyId } from '../../../../../utils/storage';
import { IEnquiry } from '../../../../../interface/quotation/IGetQuotationsResponse';

interface Props {
  //
}

const BillingIndividualView: React.FC<Props> = ({}) => {
  const {state, setPartyName, setPartyMobileNo, setCustomerId} = useQuotationFormContextHook();
  const partyNameInputCompRef = useRef(null);
  const partyMobileNoInputCompRef = useRef(null);
  const [showCompanyList, setShowCompanyList] = useState<boolean>(false);
  const [selectedCompanyOption, setSelectedCompanyOption] = useState<ICustomer | null>(null);
  const dispatch = useAppDispatch();

  const {
    customers,
    getCustomersRequesting,
    getCustomersSuccess,
    getCustomersFailure,
  } = useAppSelector(state => state.Common);

  const handleMobileNo = (text: string) => {
    setPartyMobileNo(text);
    if(!Validator.isEmpty(text) && text.length == 10){
      getCurrentCompanyId().then(id => {
        const payload: ICustomersRequest = {
          companyId: id as string,
          searchKey: text,
        };
        debounce(dispatch(getCustomersRequest(payload)), 3000);
      }).catch(err => console.log(err));
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

  useEffect(() => {
    if (selectedCompanyOption) {
      if (selectedCompanyOption.billingBy == 'by Individual') {
        setCustomerId(selectedCompanyOption._id);
        setPartyName(selectedCompanyOption.partyName);
        setPartyMobileNo(selectedCompanyOption.mobile);
      }
    }
  }, [selectedCompanyOption]);

  useEffect(() => {
    if(state.editQuotation && state.item) {
      const {item} = state;
      if(item) {
        const enquiry:IEnquiry = item.enquiries;
        if(enquiry) {
          if(enquiry.billingBy == "by Individual") {
            setPartyName(enquiry.partyName);
            setPartyMobileNo(enquiry.mobile);
          }
        }
      }
    }
  }, [state.editQuotation, state.item]);

  return (
    <>
      <View style={styles.fullWidthContainer}>
        <View style={styles.fullWidthContainer}>
          <Label text="Party Mobile No." style={styles.label} required={true} />
          <Input
            onChangeText={handleMobileNo}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            value={state.party_mobile_no}
            //@ts-ignore
            ref={partyMobileNoInputCompRef}
            //@ts-ignore
            error={state.errors.party_mobile_no}
            type="text"
            required={true}
            inputType="numeric"
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
        <Label text="Party Name" style={styles.label} required={true} />
        <Input
          onChangeText={setPartyName}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          selectionColor={COLOR_BLACK}
          value={state.party_name}
          //@ts-ignore
          ref={partyNameInputCompRef}
          //@ts-ignore
          error={state.errors.party_name}
          type="text"
          required={true}
        />
      </View>
    </>
  );
};

export default BillingIndividualView;
