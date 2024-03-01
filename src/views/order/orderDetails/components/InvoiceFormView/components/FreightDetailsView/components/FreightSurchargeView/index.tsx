import React from 'react';
import {View} from 'react-native';
import styles from './style';
import Label from '../../../../../../../../../common/Label';
import Spacer from '../../../../../../../../../common/Spacer';
import {useInvoiceFormContextHook} from '../../../../../../../../../provider/InvoiceFormContextProvider';
import DropdownComponent from '../../../../../../../../../common/DropdownComponent';
import {surchargeOptions, surchargePercentOptions} from '../../../../utils';
import { TDropdownItem } from '../../../../../../../../../type/TDropdownItem';
interface Props {}

const FreightSurchargeView: React.FC<Props> = ({}) => {
  const {setSurcharge, setSurchargePercent} = useInvoiceFormContextHook();

  const surchargeOptions2 = surchargeOptions.slice(0,2);

  return (
    <>
      <View style={styles.fullWidhCompContainer2}>
        <Label text="Surcharge" style={styles.label} />
      </View>
      <View style={styles.container}>
        <View style={styles.compContainer}>
          <DropdownComponent data={surchargeOptions2} onSelect={(item:TDropdownItem) => {
            setSurcharge(item.label);
          }} />
        </View>
        <Spacer width={8} />
        <View style={styles.compContainer}>
          <DropdownComponent
            data={surchargePercentOptions}
            onSelect={(item:TDropdownItem) => {
              setSurchargePercent(item.value);
            }}
          />
        </View>
      </View>
    </>
  );
};

export default FreightSurchargeView;
