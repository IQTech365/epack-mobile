import React, {useEffect, useRef} from 'react';
import {View} from 'react-native';
import styles from './style';
import CollapsibleView from '../../../../../../../common/CollapsibleView';
import Spacer from '../../../../../../../common/Spacer';
import Label from '../../../../../../../common/Label';
import Input, {InputMethods} from '../../../../../../../common/Input';
import DatePickerComponent, {
  IDateMethods,
} from '../../../../../../../common/DatePickerComponent';
import {COLOR_BLACK, COLOR_BLUE} from '../../../../../../../utils/colors';
import {insuranceOptions} from '../MaterialDetails/utils';
import {useBiltyFormContextHook} from '../../../../../../../provider/BiltyFormContextProvider';
import {formatDate4} from '../../../../../../../utils/formatter';
import {IBilty} from '../../../../../../../interface/order/IGetBiltyListResponse';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import DropdownComponent, {
  IDropdownHandler,
} from '../../../../../../../common/DropdownComponent';
import {getVehicleInsuranceCompanyList} from '../../../CarConditionFormView/utils';
import {useAppSelector} from '../../../../../../../redux/hooks';
import {TDropdownItem} from '../../../../../../../type/TDropdownItem';

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
    setInsurance,
  } = useBiltyFormContextHook();

  const {vehicleInsuranceCompany} = useAppSelector(state => state.Common);
  const insuranceCompanyNameRef = useRef<IDropdownHandler>(null);
  const insurancePolicyNoRef = useRef<InputMethods>(null);
  const insuranceAmountRef = useRef<InputMethods>(null);
  const insuranceDateRef = useRef<IDateMethods>(null);

  useEffect(() => {
    if (isEdit && item) {
      setInsurance(item.insuranceStatus);
    }
  }, [isEdit, item]);

  useEffect(() => {
    if(isEdit && item && state.insurance === insuranceOptions[0]) {
      setInsuranceCompany(item.insurance.companyName);
      const insuranceCompanyItem: TDropdownItem =
        getVehicleInsuranceCompanyList(vehicleInsuranceCompany).find(
          (d: TDropdownItem) => d.label === item.insurance.companyName,
        ) as TDropdownItem;
      if (insuranceCompanyItem) {
        insuranceCompanyNameRef.current?.setDefaultValue(insuranceCompanyItem);
      }
      insurancePolicyNoRef.current?.setValue(item.insurance.policyNumber);
      setPolicyNumber(item.insurance.policyNumber);
      insuranceAmountRef.current?.setValue(item.insurance.amount);
      setInsuranceAmount(item.insurance.amount);
      if (item?.insurance?.date) {
        setInsuranceDate(item.insurance.date);
        insuranceDateRef.current?.setDefaultValue(
          new Date(item.insurance.date),
        );
      }
    }
  }, [state.insurance]);
  

  return (
    <CollapsibleView title="INSURANCE DETAILS" collapsed={true}>
      <View>
        <View style={styles.elementContainer}>
          {insuranceOptions.map((option: string, index: number) => (
            <BouncyCheckbox
              key={`${index}`}
              size={25}
              unfillColor="#FFFFFF"
              text={option}
              fillColor={COLOR_BLUE}
              iconStyle={styles.iconStyle}
              innerIconStyle={styles.innerIconStyle}
              textStyle={styles.textStyle}
              style={styles.style}
              textContainerStyle={styles.textContainerStyle}
              onPress={(isChecked: boolean) => {
                setInsurance(option);
              }}
              isChecked={state.insurance == option}
              disableBuiltInState={true}
            />
          ))}
        </View>
        {state.insurance == insuranceOptions[0] ? (
          <>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Insurance Company" style={styles.label} />
              <DropdownComponent
                data={getVehicleInsuranceCompanyList(vehicleInsuranceCompany)}
                onSelect={(item: TDropdownItem) => {
                  setInsuranceCompany(item.label);
                }}
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
                autoCapitalize="characters"
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Insurance Date" style={styles.label} />
                <DatePickerComponent
                  onDateSelect={(date: Date|null) => {
                    if(date){
                      setInsuranceDate(date.toISOString());
                    }
                  }}
                  ref={insuranceDateRef}
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
          </>
        ) : null}
      </View>
    </CollapsibleView>
  );
};

export default InsuranceDetails;
