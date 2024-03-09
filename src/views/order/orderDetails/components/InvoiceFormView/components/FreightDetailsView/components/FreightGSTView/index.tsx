import React, { useEffect, useRef } from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import {
  gstOptions,
  gstPaidByOptions,
  gstPercentOptions,
  gstTypeOptions,
} from '../../../../utils';
import {COLOR_BLUE} from '../../../../../../../../../utils/colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Spacer from '../../../../../../../../../common/Spacer';
import {useInvoiceFormContextHook} from '../../../../../../../../../provider/InvoiceFormContextProvider';
import DropdownComponent from '../../../../../../../../../common/DropdownComponent';
import {TDropdownItem} from '../../../../../../../../../type/TDropdownItem';
import { IInvoice } from '../../../../../../../../../interface/order/IGetInvoiceListResponse';

interface Props {
  isEdit?:boolean;
  invoiceData?:IInvoice;
}

const FreightGSTView: React.FC<Props> = ({isEdit, invoiceData}) => {
  const {state, setGSTOnInvoice, setGSTPercent, setGSTType, setGSTPaidBy} = useInvoiceFormContextHook();
  const gstPercentRef = useRef(null);
  const gstTypeRef = useRef(null);

    const _initFormValues = () => {
      if(isEdit && invoiceData) {
        const {gstStatus, gstPaidBy} = invoiceData || {};
        setGSTOnInvoice(gstStatus);
        setGSTPaidBy(gstPaidBy);
      }
    }

    const _setGstPercentAndType = () => {
      if(isEdit && invoiceData) {
        if(state.gst_on_invoice == gstOptions[0]) {
          const {gstType, gstPercentage} = invoiceData || {};
          const gstPercentItem:TDropdownItem = gstPercentOptions.find((e:TDropdownItem) => e.value === gstPercentage) as TDropdownItem;
          if(gstPercentItem !== undefined){
            //@ts-ignore
            gstPercentRef && gstPercentRef?.current?.setDefaultValue(gstPercentItem);
            setGSTPercent(gstPercentage);
          }
          const gstTypeItem:TDropdownItem = gstTypeOptions.find((e:TDropdownItem) => e.label === gstType) as TDropdownItem;
          if(gstTypeItem !== undefined){
            //@ts-ignore
            gstTypeRef && gstTypeRef?.current?.setDefaultValue(gstTypeItem);
            setGSTType(gstType);
          }
        } else {
          setGSTPercent('');
          setGSTType('');
        }
      }
    }

    useEffect(() => {
      _initFormValues();
    }, []);

    useEffect(() => {
      _setGstPercentAndType();
    }, [state.gst_on_invoice]);



  return (
    <View style={styles.mainWrapper}>
      <View style={styles.container}>
        <Text style={styles.labelText}>GST</Text>
      </View>
      <Spacer height={10} />
      <View style={styles.optionContainer}>
        {gstOptions.map((option: string, index: number) => (
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
              setGSTOnInvoice(option);
            }}
            isChecked={state.gst_on_invoice == option}
            disableBuiltInState={true}
          />
        ))}
      </View>
      {state.gst_on_invoice == gstOptions[0] ? (
        <>
          <Spacer height={10} />
          <View style={styles.fullWidthContainer}>
            <View style={styles.compContainer}>
              <DropdownComponent
                //@ts-ignore
                ref={gstPercentRef}
                data={gstPercentOptions}
                onSelect={(item: TDropdownItem) => {
                  setGSTPercent(item.value);
                }}
              />
            </View>
            <View style={styles.compContainer}>
              <DropdownComponent
                //@ts-ignore
                ref={gstTypeRef}
                data={gstTypeOptions}
                onSelect={(item: TDropdownItem) => {
                  setGSTType(item.label);
                }}
              />
            </View>
          </View>
        </>
      ) : null}
      <Spacer height={15} />
      <View style={styles.container}>
        <Text style={styles.labelText}>GST paid by</Text>
      </View>
      <Spacer height={10} />
      <View style={styles.optionContainer}>
        {gstPaidByOptions.map((option: string, index: number) => (
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
              setGSTPaidBy(option);
            }}
            isChecked={state.gst_paid_by == option}
            disableBuiltInState={true}
          />
        ))}
      </View>
    </View>
  );
};

export default FreightGSTView;
