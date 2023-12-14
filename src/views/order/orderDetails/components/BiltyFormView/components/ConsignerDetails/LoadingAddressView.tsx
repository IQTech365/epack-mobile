import React, { useRef } from 'react';
import {View} from 'react-native';
import styles from './style';
import Spacer from '../../../../../../../common/Spacer';
import Label from '../../../../../../../common/Label';
import Input from '../../../../../../../common/Input';
import EpackDropdown from '../../../../../../../common/DropdownComponent2';
import {useBiltyFormContextHook} from '../../../../../../../provider/BiltyFormContextProvider';
import {COLOR_BLACK} from '../../../../../../../utils/colors';

interface Props {}

const LoadingAddressView: React.FC<Props> = ({}) => {
  const {
    state,
    setLoadingAddress,
    setLoadingState,
    setLoadingPincode,
    setLoadingCity,
  } = useBiltyFormContextHook();

  const stateDropdwonCompRef = useRef(null);
  const cityDropdownCompRef = useRef(null);

  if(!state.loading_address_same_as_consigner) return null;

  return (
    <>
      <Spacer height={4} />
      <View style={styles.elementContainer2}>
        <Label text="Address" style={styles.label} />
        <Input
          onChangeText={setLoadingAddress}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          selectionColor={COLOR_BLACK}
        />
      </View>
      <Spacer height={4} />
      <View style={styles.elementContainer2}>
        <Label text="Pincode" style={styles.label} />
        <Input
          onChangeText={setLoadingPincode}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          selectionColor={COLOR_BLACK}
        />
      </View>
      <Spacer height={4} />
      <View style={styles.elementContainer}>
        <View style={styles.itemContainer}>
          <Label text="State" style={styles.label} />
          <EpackDropdown
            data={[]}
            placeholder={'Select State'}
            hanldeData={setLoadingState}
            //@ts-ignore
            ref={stateDropdwonCompRef}
          />
        </View>
        <View style={styles.itemContainer}>
          <Label text="City" style={styles.label} />
          <EpackDropdown
            data={[]}
            placeholder={'Select City'}
            hanldeData={setLoadingCity}
            //@ts-ignore
            ref={cityDropdownCompRef}
          />
        </View>
      </View>
    </>
  );
};

export default LoadingAddressView;
