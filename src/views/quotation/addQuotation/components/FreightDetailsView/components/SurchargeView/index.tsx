import React from 'react';
import {View} from 'react-native';
import styles from './style';
import Label from '../../../../../../../common/Label';
import DropdownComponent from '../../../../../../../common/DropdownComponent';
import {TDropdownItem} from '../../../../../../../type/TDropdownItem';
import surchargeOptions from '../../../../../../../data/surchargeOptions.json';
import surchargePercentOptions from '../../../../../../../data/surchargePercentOptions.json';
import {useQuotationFormContextHook} from '../../../../../../../provider/QuotationFormContextProvider';

interface Props {}

const SurchargeView: React.FC<Props> = ({}) => {
  const {setSurcharge, setSurchargePercent} = useQuotationFormContextHook();
  return (
    <>
      <View style={styles.fullWidthContainer}>
        <Label text="Surcharge" style={styles.label} />
      </View>
      <View style={styles.twoColumnContainer}>
        <View style={styles.compContainer}>
          <DropdownComponent
            data={surchargeOptions}
            onSelect={(item: TDropdownItem) => {
              setSurcharge(item.label);
            }}
            defaultValue={surchargeOptions[0]}
          />
        </View>
        <View style={styles.compContainer}>
          <DropdownComponent
            data={surchargePercentOptions}
            onSelect={(item: TDropdownItem) => {
              setSurchargePercent(item.label);
            }}
            defaultValue={surchargePercentOptions[0]}
          />
        </View>
      </View>
    </>
  );
};

export default SurchargeView;
