import React from 'react';
import {View} from 'react-native';
import styles from './style';
import CollapsibleView from '../../../../../../../common/CollapsibleView';
import Label from '../../../../../../../common/Label';
import Input from '../../../../../../../common/Input';
import Spacer from '../../../../../../../common/Spacer';
import {COLOR_BLACK} from '../../../../../../../utils/colors';
import DatePickerComponent from '../../../../../../../common/DatePickerComponent';
import {useBiltyFormContextHook} from '../../../../../../../provider/BiltyFormContextProvider';
import {formatDate4} from '../../../../../../../utils/formatter';

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
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <View style={styles.itemContainer}>
            <Label text="Rate" style={styles.label} />
            <Input
              onChangeText={setRate}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="Charge Applicable After" style={styles.label} />
            <DatePickerComponent
              onDateSelect={(date: Date) => {
                setChargeApplicableAfter(formatDate4(date));
              }}
            />
          </View>
        </View>
      </View>
    </CollapsibleView>
  );
};

export default DemurageDetails;
