import React, { FC, useEffect, useRef } from "react";
import {View, Text} from 'react-native';
import styles from './style';
import DropdownComponent from "../../../../../../../common/DropdownComponent";
import { gstPercentOptions, gstTypeOptions } from "../../../../../../order/orderDetails/components/InvoiceFormView/utils";
import { TDropdownItem } from "../../../../../../../type/TDropdownItem";
import { IQuotationFreight } from "../../../../../../../interface/quotation/IGetSingleQuotationResponse";
import { useQuotationFormContextHook } from "../../../../../../../provider/QuotationFormContextProvider";
import { gstInQuotationOptions } from "../utils";

const GstDropdownView:FC<{}> = ({}) => {
    const {state, setGstInQuotation, setGstPercent, setGstType} = useQuotationFormContextHook();
    const gstPercentDropdownCompRef = useRef(null);
    const gstTypeDropdownCompRef = useRef(null);
  
    useEffect(() => {
      if(state.editQuotation && state.item) {
        const {item} = state;
        if(item) {
          const quotationfreight:IQuotationFreight = item.quotationfreights;
          if(quotationfreight) {
            setGstInQuotation(quotationfreight.gstStatus);
            const gstPercentItem:TDropdownItem = gstPercentOptions.find((d:TDropdownItem) => d.value == quotationfreight.gstPercentage) as TDropdownItem;
            console.log('gstPercentItem---', JSON.stringify(gstPercentItem));
            
            if(gstPercentItem) {
              //@ts-ignore
              gstPercentDropdownCompRef && gstPercentDropdownCompRef?.current?.setDefaultValue(gstPercentItem);
              setGstPercent(gstPercentItem.value);
            }
            const gstTypeItem:TDropdownItem = gstTypeOptions.find((d:TDropdownItem) => d.label == quotationfreight.gstType) as TDropdownItem;
            if(gstTypeItem) {
              //@ts-ignore
              gstTypeDropdownCompRef && gstTypeDropdownCompRef?.current?.setDefaultValue(gstTypeItem);
              setGstType(gstTypeItem.label);
            }
          }
        }
      }
    }, [state.editQuotation, state.item]);

    // if(state.gst_in_quotation !== gstInQuotationOptions[0]) return null;

    return (
      <View style={styles.twoColumnContainer}>
        <View style={styles.compContainer}>
          <DropdownComponent
            data={gstPercentOptions}
            onSelect={(item: TDropdownItem) => {
              setGstPercent(item.value);
            }}
            //@ts-ignore
            ref={gstPercentDropdownCompRef}
          />
        </View>
        <View style={styles.compContainer}>
          <DropdownComponent
            data={gstTypeOptions}
            onSelect={(item: TDropdownItem) => {
              setGstType(item.label);
            }}
            //@ts-ignore
            ref={gstTypeDropdownCompRef}
          />
        </View>
      </View>
    );

}

export default GstDropdownView;