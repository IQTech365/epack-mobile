import React, {useEffect, useRef} from 'react';
import {View} from 'react-native';
import styles from './style';
import CollapsibleView from '../../../../../../../common/CollapsibleView';
import Label from '../../../../../../../common/Label';
import Input, {InputMethods} from '../../../../../../../common/Input';
import Spacer from '../../../../../../../common/Spacer';
import {COLOR_BLACK} from '../../../../../../../utils/colors';
import {useBiltyFormContextHook} from '../../../../../../../provider/BiltyFormContextProvider';
import DropdownComponent, { IDropdownHandler } from '../../../../../../../common/DropdownComponent';
import {TDropdownItem} from '../../../../../../../type/TDropdownItem';
import {
  demurrageChargeRateOptions,
  perDayOptions,
  perHourOptions,
} from './utils';
import {IBilty} from '../../../../../../../interface/order/IGetBiltyListResponse';

interface IProps {
  item?: IBilty;
  isEdit?: boolean;
}

const DemurageDetails: React.FC<IProps> = ({item, isEdit}) => {
  const {state, setDemurrageCharge, setRate, setChargeApplicableAfter} =
    useBiltyFormContextHook();

  const demurrageChargeRef = useRef<InputMethods>(null);
  const demurrageRateRef = useRef<IDropdownHandler>(null);
  const demurrageChargeApplicableAfterRef = useRef<IDropdownHandler>(null);

  useEffect(() => {
    if (isEdit && item) {
      demurrageChargeRef.current?.setValue(item.demurrage?.charge);
      setDemurrageCharge(item.demurrage?.charge);
      if(item.demurrage?.rate) {
        const option:TDropdownItem = demurrageChargeRateOptions.find((e:TDropdownItem) => e.label === item.demurrage?.rate) as TDropdownItem;
        if(option) {
          demurrageRateRef.current?.setDefaultValue(option);
          if(option.label === 'Per Day') {
            if(item.demurrage?.chargeAfterApplicable) {
              const perDayOption:TDropdownItem = perDayOptions.find((d:TDropdownItem) => d.label === item.demurrage?.chargeAfterApplicable) as TDropdownItem;
              demurrageChargeApplicableAfterRef.current?.setDefaultValue(perDayOption);
            }
          } else if(option.label === 'Per Hour') {
            if(item.demurrage?.chargeAfterApplicable) {
              const perHourOption:TDropdownItem = perHourOptions.find((d:TDropdownItem) => d.label === item.demurrage?.chargeAfterApplicable) as TDropdownItem;
              demurrageChargeApplicableAfterRef.current?.setDefaultValue(perHourOption);
            }
          }
        }
      }
      setRate(item?.demurrage?.rate);
      setChargeApplicableAfter(item.demurrage?.chargeAfterApplicable);
    }
  }, [isEdit, item]);

  

  return (
    <CollapsibleView title="DEMURRAGE DETAILS" collapsed={true}>
      <View>
        <View style={styles.elementContainer2}>
          <Label text="Demurrage Charge" style={styles.label} />
          <Input
            onChangeText={setDemurrageCharge}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            inputType="numeric"
            ref={demurrageChargeRef}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <View style={styles.itemContainer}>
            <Label text="Rate" style={styles.label} />
            <DropdownComponent
              data={demurrageChargeRateOptions}
              onSelect={(item: TDropdownItem) => {
                setRate(item.label);
              }}
              defaultValue={demurrageChargeRateOptions[0]}
              ref={demurrageRateRef}
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="Charge Applicable After" style={styles.label} />
            <DropdownComponent
              data={
                state.rate == demurrageChargeRateOptions[0].label
                  ? perHourOptions
                  : perDayOptions
              }
              onSelect={(item: TDropdownItem) => {
                setChargeApplicableAfter(item.label);
              }}
              ref={demurrageChargeApplicableAfterRef}
            />
          </View>
        </View>
      </View>
    </CollapsibleView>
  );
};

export default DemurageDetails;
