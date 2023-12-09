import React, { useEffect, useRef } from 'react';
import {View} from 'react-native';
import styles from './style';
import {useQuotationFormContextHook} from '../../../../../provider/QuotationFormContextProvider';
import Label from '../../../../../common/Label';
import Input from '../../../../../common/Input';
import { COLOR_BLACK } from '../../../../../utils/colors';
import Spacer from '../../../../../common/Spacer';
import billingByOptions from '../../../../../data/billingByOptions.json';
import { Validator } from '../../../../../utils/validation';

interface Props {
  //
}

const enum Error {
  PARTY_NAME = 'Party name required',
  PARTY_MOB_NO = 'Mobile number required',
}

const BillingIndividualView: React.FC<Props> = ({}) => {
  const {
    state,
    setPartyName,
    setPartyMobileNo,
    setPartyNameError,
    setPartyMobileNoError,
    resetError,
    validateForm,
    validForm,
  } = useQuotationFormContextHook();
  const partyNameInputCompRef = useRef(null);
  const partyMobileNoInputCompRef = useRef(null);

  const validate = () => {
    resetError();
    if(Validator.isEmpty(state.party_name)) {
      setPartyNameError(Error.PARTY_NAME)
    }
    if(Validator.isEmpty(state.party_mobile_no)) {
      setPartyMobileNoError(Error.PARTY_MOB_NO);
    }
    validateForm(false);
  }

  useEffect(() => {
    if(state.billing_by == billingByOptions[0].label && state.validate_form) {
      validate();
    }
  }, [state.validate_form]);

  useEffect(() => {
    const hasErrors = Object.values(state.errors).some(e => e != '');
    if(hasErrors) {
      validForm(false);
    } else {
      validForm(true);
    }
  }, [state.errors.party_name, state.errors.party_mobile_no]);

  return (
    <>
      <View style={styles.fullWidthContainer}>
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
      <Spacer height={4} />
      <View style={styles.fullWidthContainer}>
        <Label text="Party Mobile No." style={styles.label} required={true} />
        <Input
          onChangeText={setPartyMobileNo}
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
        />
      </View>
    </>
  );
};

export default BillingIndividualView;
