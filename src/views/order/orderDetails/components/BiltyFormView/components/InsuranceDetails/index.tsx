import React, {useEffect, useRef} from 'react';
import {View} from 'react-native';
import styles from './style';
import CollapsibleView from '../../../../../../../common/CollapsibleView';
import BouncyCheckboxGroup, {
  ICheckboxButton,
} from 'react-native-bouncy-checkbox-group';
import Spacer from '../../../../../../../common/Spacer';
import Label from '../../../../../../../common/Label';
import Input, {InputMethods} from '../../../../../../../common/Input';
import DatePickerComponent from '../../../../../../../common/DatePickerComponent';
import {COLOR_BLACK} from '../../../../../../../utils/colors';
import {insuranceOptions} from '../MaterialDetails/utils';
import {useBiltyFormContextHook} from '../../../../../../../provider/BiltyFormContextProvider';
import {formatDate4} from '../../../../../../../utils/formatter';
import {IBilty} from '../../../../../../../interface/order/IGetBiltyListResponse';

interface IProps {
  item?: IBilty;
  isEdit?: boolean;
}

const InsuranceDetails: React.FC<IProps> = ({item, isEdit}) => {
  const {
    state,
    setInsuranceCompany,
    setPolicyNumber,
    setInsuranceDate,
    setInsuranceAmount,
  } = useBiltyFormContextHook();

  const insuranceCompanyNameRef = useRef<InputMethods>(null);
  const insurancePolicyNoRef = useRef<InputMethods>(null);
  const insuranceAmountRef = useRef<InputMethods>(null);
  const insuranceDateRef = useRef<InputMethods>(null);

  useEffect(() => {
    if (isEdit && item) {
      //
      insuranceCompanyNameRef.current?.setValue(item.insurance.companyName);
      setInsuranceCompany(item.insurance.companyName);
      insurancePolicyNoRef.current?.setValue(item.insurance.policyNumber);
      setPolicyNumber(item.insurance.policyNumber);
      insuranceAmountRef.current?.setValue(item.insurance.amount);
      setInsuranceAmount(item.insurance.amount);
      insuranceDateRef.current?.setValue(item.insurance.date);
      setInsuranceDate(item.insurance.date);
    }
  }, [isEdit, item]);

  return (
    <CollapsibleView title="INSURANCE DETAILS" collapsed={true}>
      <View>
        <View style={styles.elementContainer}>
          <BouncyCheckboxGroup
            data={insuranceOptions}
            // isChecked={state.insurance}
            onChange={(selectedItem: ICheckboxButton) => {}}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer2}>
          <Label text="Insurance Company" style={styles.label} />
          <Input
            onChangeText={setInsuranceCompany}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            ref={insuranceCompanyNameRef}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer2}>
          <Label text="Policy Number" style={styles.label} />
          <Input
            onChangeText={setPolicyNumber}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            ref={insurancePolicyNoRef}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <View style={styles.itemContainer}>
            <Label text="Insurance Date" style={styles.label} />
            <DatePickerComponent
              onDateSelect={(date: Date) => {
                setInsuranceDate(formatDate4(date));
              }}
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="Insurance Amount" style={styles.label} />
            <Input
              onChangeText={setInsuranceAmount}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              inputType="numeric"
              ref={insuranceAmountRef}
            />
          </View>
        </View>
      </View>
    </CollapsibleView>
  );
};

export default InsuranceDetails;
