import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import styles from './style';
import CollapsibleView from '../../../../../common/CollapsibleView';
import Label from '../../../../../common/Label';
import Input from '../../../../../common/Input';
import {COLOR_BLACK} from '../../../../../utils/colors';
import {useQuotationFormContextHook} from '../../../../../provider/QuotationFormContextProvider';
import EpackDropdown from '../../../../../common/DropdownComponent2';
import Spacer from '../../../../../common/Spacer';
import usePincodeHook from '../../../../../hooks/usePincodeHook';
import {getCities2, getStates2} from '../../../../../utils/formatter';
import Spinner from '../../../../../common/Spinner';

interface Props {
  //
}

const CompanyAddressView: React.FC<Props> = ({}) => {
  const {
    state,
    setCompanyPincode,
    setCompanyState,
    setCompanyCity,
  } = useQuotationFormContextHook();

  const {result, fetching, setPincode} = usePincodeHook(
    () => {},
    () => {},
  );

  const pincodeInputCompRef = useRef(null);
  const stateDropdownCompRef = useRef(null);
  const cityDropdownCompRef = useRef(null);

  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const handlePincodeChange = useCallback(
    (text: string) => {
      setCompanyPincode(text);
      setPincode(text);
    },
    [state.pickup_pincode],
  );

  useEffect(() => {
    if (result && result.Status != 'Error') {
      setStates(getStates2(result));
      setCities(getCities2(result));
    }
  }, [result]);

  useEffect(() => {
    if (
      states.length > 0 &&
      cities.length > 0 &&
      stateDropdownCompRef &&
      cityDropdownCompRef
    ) {
      //@ts-ignore
      stateDropdownCompRef?.current?.setValue(states[0]);
      setCompanyState(states[0]);
      //@ts-ignore
      cityDropdownCompRef?.current?.setValue(cities[0]);
      setCompanyCity(cities[0]);
    }
  }, [states, cities]);

  return (
      <View>
        <View style={styles.twoColumnContainer}>
          <View style={styles.compContainer}>
            <Label text="Pincode" style={styles.label} />
            <Input
              onChangeText={handlePincodeChange}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              placeholder="pincode"
              //@ts-ignore
              ref={pincodeInputCompRef}
              //@ts-ignore
              error={state.errors.pickup_pincode}
              value={state?.pickup_pincode}
              inputType="numeric"
              required={true}
            />
          </View>
          <View style={styles.compContainer}>
            <Label text="State" style={styles.label} />
            <EpackDropdown
              data={states}
              placeholder={'Select State'}
              hanldeData={setCompanyState}
              //@ts-ignore
              ref={stateDropdownCompRef}
            />
          </View>
        </View>
        <Spacer height={4} />
        <View style={styles.fullWidthContainer}>
          <Label text="City" style={styles.label} />
          <EpackDropdown
            data={cities}
            placeholder={'Select City'}
            hanldeData={setCompanyCity}
            //@ts-ignore
            ref={cityDropdownCompRef}
          />
        </View>
        <Spinner show={fetching} />
      </View>
  );
};

export default CompanyAddressView;
