import React, {useEffect, useRef} from 'react';
import {View} from 'react-native';
import styles from './style';
import {useQuotationFormContextHook} from '../../../../../provider/QuotationFormContextProvider';
import Label from '../../../../../common/Label';
import Input from '../../../../../common/Input';
import {COLOR_BLACK} from '../../../../../utils/colors';
import Spacer from '../../../../../common/Spacer';
import SearchIcon from '../../../../../images/icons/search.svg';

interface Props {
  //
}

const BillingIndividualView: React.FC<Props> = ({}) => {
  const {state, setPartyName, setPartyMobileNo} = useQuotationFormContextHook();
  const partyNameInputCompRef = useRef(null);
  const partyMobileNoInputCompRef = useRef(null);

  const findCustomer = (searchKey:string) => {

  }

  return (
    <>
      <View style={styles.fullWidthContainer}>
        <View style={styles.fullWidthContainer}>
          <Label text="Party Mobile No." style={styles.label} required={true} />
          <Input
            searchIcon={<SearchIcon width={20} height={20} />}
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
