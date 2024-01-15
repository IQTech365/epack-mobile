import React from 'react';
import {View} from 'react-native';
import styles from './style';
import CollapsibleView from '../../../../../../../common/CollapsibleView';
import Label from '../../../../../../../common/Label';
import Input from '../../../../../../../common/Input';
import Spacer from '../../../../../../../common/Spacer';
import {COLOR_BLACK} from '../../../../../../../utils/colors';
import {useBiltyFormContextHook} from '../../../../../../../provider/BiltyFormContextProvider';
import DropdownComponent from '../../../../../../../common/DropdownComponent';
import {TDropdownItem} from '../../../../../../../type/TDropdownItem';
import {demurrageChargeRateOptions, perDayOptions, perHourOptions} from './utils';

const DemurageDetails: React.FC<{}> = ({}) => {
  const {state, setDemurrageCharge, setRate, setChargeApplicableAfter} =
    useBiltyFormContextHook();

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
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="Charge Applicable After" style={styles.label} />
            <DropdownComponent
              data={state.rate == demurrageChargeRateOptions[0].label ? perHourOptions : perDayOptions}
              onSelect={(item: TDropdownItem) => {
                setChargeApplicableAfter(item.label);
              }}
            />
          </View>
        </View>
      </View>
    </CollapsibleView>
  );
};

export default DemurageDetails;
