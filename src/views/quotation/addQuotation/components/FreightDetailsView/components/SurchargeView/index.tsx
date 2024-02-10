import React, { useEffect, useRef } from 'react';
import {View} from 'react-native';
import styles from './style';
import Label from '../../../../../../../common/Label';
import DropdownComponent from '../../../../../../../common/DropdownComponent';
import {TDropdownItem} from '../../../../../../../type/TDropdownItem';
import surchargeOptions from '../../../../../../../data/surchargeOptions.json';
import surchargePercentOptions from '../../../../../../../data/surchargePercentOptions.json';
import {useQuotationFormContextHook} from '../../../../../../../provider/QuotationFormContextProvider';
import { IQuotationFreight } from '../../../../../../../interface/quotation/IGetSingleQuotationResponse';

interface Props {}

const SurchargeView: React.FC<Props> = ({}) => {
  const {state, setSurcharge, setSurchargePercent} = useQuotationFormContextHook();
  const surchargeTypeDropdownRef = useRef(null);
  const surchargePercentDropdownRef = useRef(null);

  useEffect(() => {
    if(state.editQuotation && state.item) {
      const {item} = state;
      if(item) {
        const quotationfreight:IQuotationFreight = item.quotationfreights;
        if(quotationfreight) {
          const surchargeTypeItem:TDropdownItem = surchargeOptions.find((d:TDropdownItem) => d.label == quotationfreight.surchargeIsRequired) as TDropdownItem;
          if(surchargeTypeItem) {
            console.log('surchargeTypeDropdownRef---', JSON.stringify(surchargeTypeDropdownRef));
            
            //@ts-ignore
            surchargeTypeDropdownRef && surchargeTypeDropdownRef?.current?.setDefaultValue(surchargeTypeItem);
            setSurcharge(surchargeTypeItem.label);
          }
          const surchargePercentItem:TDropdownItem = surchargePercentOptions.find((d:TDropdownItem) => d.value == quotationfreight.surchargeCharges) as TDropdownItem;
          if(surchargePercentItem) {
            //@ts-ignore
            surchargePercentDropdownRef && surchargePercentDropdownRef?.current?.setDefaultValue(surchargePercentItem);
            setSurchargePercent(surchargePercentItem.value);
          }
        }
      }
    }
  }, [state.editQuotation, state.item]);

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
            // defaultValue={surchargeOptions[0]}
            //@ts-ignore
            ref={surchargeTypeDropdownRef}
          />
        </View>
        <View style={styles.compContainer}>
          <DropdownComponent
            data={surchargePercentOptions}
            onSelect={(item: TDropdownItem) => {
              setSurchargePercent(item.value);
            }}
            // defaultValue={surchargePercentOptions[0]}
            //@ts-ignore
            ref={surchargePercentDropdownRef}
          />
        </View>
      </View>
    </>
  );
};

export default SurchargeView;
