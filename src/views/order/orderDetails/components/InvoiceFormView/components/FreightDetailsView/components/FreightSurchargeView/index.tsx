import React, { useEffect, useRef } from 'react';
import {View} from 'react-native';
import styles from './style';
import Label from '../../../../../../../../../common/Label';
import Spacer from '../../../../../../../../../common/Spacer';
import {useInvoiceFormContextHook} from '../../../../../../../../../provider/InvoiceFormContextProvider';
import DropdownComponent from '../../../../../../../../../common/DropdownComponent';
import {surchargeOptions, surchargePercentOptions} from '../../../../utils';
import { TDropdownItem } from '../../../../../../../../../type/TDropdownItem';
import { IInvoice } from '../../../../../../../../../interface/order/IGetInvoiceListResponse';
interface Props {
  isEdit?:boolean;
  invoiceData?:IInvoice;
}

const FreightSurchargeView: React.FC<Props> = ({isEdit, invoiceData}) => {
  const {setSurcharge, setSurchargePercent} = useInvoiceFormContextHook();

  const surchargeOptions2 = surchargeOptions.slice(0,2);

  const optionDropdownRef = useRef(null);
  const percentDropdownRef = useRef(null);

  const _initFormValues = () => {
    if(isEdit && invoiceData) {
      const {surchargeCharges, surchargeStatus} = invoiceData || {};
      const optionItem:TDropdownItem = surchargeOptions2.find((e:TDropdownItem) => e.label == surchargeStatus) as TDropdownItem;
      if(optionItem !== undefined) {
        //@ts-ignore
        optionDropdownRef && optionDropdownRef?.current?.setDefaultValue(optionItem);
        setSurcharge(surchargeStatus);
      }

      const percentOptionItem:TDropdownItem = surchargePercentOptions.find((e:TDropdownItem) => e.value == surchargeCharges) as TDropdownItem;
      if(percentOptionItem !== undefined) {
        //@ts-ignore
        percentDropdownRef && percentDropdownRef?.current?.setDefaultValue(percentOptionItem);
        setSurchargePercent(surchargeCharges);
      }
    }
  }

  useEffect(() => {
    _initFormValues();
  }, []);

  return (
    <>
      <View style={styles.fullWidhCompContainer2}>
        <Label text="Surcharge" style={styles.label} />
      </View>
      <View style={styles.container}>
        <View style={styles.compContainer}>
          <DropdownComponent
             //@ts-ignore
             ref={optionDropdownRef}
             data={surchargeOptions2} 
             onSelect={(item:TDropdownItem) => {
              setSurcharge(item.label);
            }}
          />
        </View>
        <Spacer width={8} />
        <View style={styles.compContainer}>
          <DropdownComponent
            //@ts-ignore
            ref={percentDropdownRef}
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
