import React from 'react';
import {View} from 'react-native';
import styles from './style';
import {useQuotationFormContextHook} from '../../../../../provider/QuotationFormContextProvider';
import Label from '../../../../../common/Label';
import Input from '../../../../../common/Input';
import { COLOR_BLACK } from '../../../../../utils/colors';
import Spacer from '../../../../../common/Spacer';

interface Props {
  //
}

const BillingIndividualView: React.FC<Props> = ({}) => {
  const {state, setPartyName, setPartyMobileNo} = useQuotationFormContextHook();

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
          //error={showErrors && errors.dropPincode}
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
          //error={showErrors && errors.dropPincode}
          type="text"
          required={true}
        />
      </View>
    </>
  );
};

export default BillingIndividualView;
