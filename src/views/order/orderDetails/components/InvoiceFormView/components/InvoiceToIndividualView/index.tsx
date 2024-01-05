import React, {useRef} from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import Label from '../../../../../../../common/Label';
import Input from '../../../../../../../common/Input';
import {COLOR_BLACK} from '../../../../../../../utils/colors';
import Spacer from '../../../../../../../common/Spacer';
import EpackDropdown from '../../../../../../../common/DropdownComponent2';
import { useInvoiceFormContextHook } from '../../../../../../../provider/InvoiceFormContextProvider';

interface Props {}

const InvoiceToIndividualView: React.FC<Props> = () => {
  const stateDropdownCompRef = useRef(null);
  const cityDropdownCompRef = useRef(null);
  const {
    setPartyName,
    setPartyMobileNo,
    setPincode,
    setState,
    setCity,
    setAddress,
  } = useInvoiceFormContextHook();

  return (
    <>
      <Spacer height={4} />
      <View style={styles.fullWidthCompContainer}>
        <Label text="Party Name" style={styles.label} />
        <Input
          onChangeText={setPartyName}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          selectionColor={COLOR_BLACK}
        />
      </View>
      <Spacer height={4} />
      <View style={styles.fullWidthCompContainer}>
        <Label text="Mobile No." style={styles.label} />
        <Input
          onChangeText={setPartyMobileNo}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          selectionColor={COLOR_BLACK}
        />
      </View>
      <Spacer height={4} />
      <View style={styles.halfWidthCompContainer}>
        <View style={styles.compContainer}>
          <Label text="Pincode" style={styles.label} />
          <Input
            onChangeText={setPincode}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            placeholder='Enter Pincode'
          />
        </View>
        <View style={styles.compContainer}>
          <Label text="State" style={styles.label} />
          <EpackDropdown
            data={[]}
            placeholder={'Select State'}
            hanldeData={setState}
            //@ts-ignore
            ref={stateDropdownCompRef}
          />
        </View>
      </View>
      <Spacer height={4} />
      <View style={styles.fullWidthCompContainer}>
        <Label text="City" style={styles.label} />
        <EpackDropdown
          data={[]}
          placeholder={'Select City'}
          hanldeData={setCity}
          //@ts-ignore
          ref={cityDropdownCompRef}
        />
      </View>
      <Spacer height={4} />
      <View style={styles.fullWidthCompContainer}>
        <Label text="Address" style={styles.label} />
        <Input
          onChangeText={setAddress}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          selectionColor={COLOR_BLACK}
        />
      </View>
    </>
  );
};

export default InvoiceToIndividualView;
