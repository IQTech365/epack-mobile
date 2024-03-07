import React, { useEffect, useRef } from 'react';
import {View} from 'react-native';
import styles from './style';
import Label from '../../../../../../../common/Label';
import DropdownComponent from '../../../../../../../common/DropdownComponent';
import {TDropdownItem} from '../../../../../../../type/TDropdownItem';
import surchargeOptions from '../../../../../../../data/surchargeOptions.json';
import surchargePercentOptions from '../../../../../../../data/surchargePercentOptions.json';
import {useQuotationFormContextHook} from '../../../../../../../provider/QuotationFormContextProvider';
import { IQuotationFreight, ISingleQuotationData } from '../../../../../../../interface/quotation/IGetSingleQuotationResponse';
import { IGetQuotationData } from '../../../../../../../interface/quotation/IGetQuotationsResponse';

interface Props {
  isEdit?:boolean;
  item?:IGetQuotationData;
  quotationData?:ISingleQuotationData;
}

const SurchargeView: React.FC<Props> = ({isEdit, item, quotationData}) => {
  const {state, setSurcharge, setSurchargePercent} = useQuotationFormContextHook();
  const surchargeTypeDropdownRef = useRef(null);
  const surchargePercentDropdownRef = useRef(null);

  useEffect(() => {
    if(isEdit && quotationData) {
        const quotationfreight:IQuotationFreight = quotationData.quotationfreights;
        if(quotationfreight) {
          const surchargeTypeItem:TDropdownItem = surchargeOptions.find((d:TDropdownItem) => d.label == quotationfreight.surchargeIsRequired) as TDropdownItem;
          if(surchargeTypeItem) {
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
  }, [isEdit, quotationData]);

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
