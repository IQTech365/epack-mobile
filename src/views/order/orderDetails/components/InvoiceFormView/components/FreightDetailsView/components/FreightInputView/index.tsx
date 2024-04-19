import React, { useEffect, useRef } from 'react';
import {View} from 'react-native';
import styles from './style';
import Label from '../../../../../../../../../common/Label';
import Input from '../../../../../../../../../common/Input';
import {COLOR_BLACK, COLOR_GRAY4} from '../../../../../../../../../utils/colors';
import {FREIGHT_TYPE} from '../../../../utils';
import {useInvoiceFormContextHook} from '../../../../../../../../../provider/InvoiceFormContextProvider';
import { IInvoice } from '../../../../../../../../../interface/order/IGetInvoiceListResponse';

interface Props {
  label1: string;
  label2: string;
  freightType: FREIGHT_TYPE;
  isEdit?:boolean;
  invoiceData?:IInvoice;
}

const FreightInputView: React.FC<Props> = ({label1, label2, freightType, isEdit, invoiceData}) => {
  const {
    setFreightCharges,
    setFreightHSN,
    setPickupChargeAmount,
    setPickupChargeHSN,
    setDoorDeliveryAmount,
    setDoorDeliveryHSN,
    setPackingAmount,
    setPackingHSN,
    setPackingMaterialAmount,
    setPackingMaterialHSN,
    setLoadingAmount,
    setLoadingHSN,
    setUnloadingAmount,
    setUnloadingHSN,
    setUnpackingAmount,
    setUnpackingHSN,
  } = useInvoiceFormContextHook();

  const amountInputRef = useRef(null);
  const hsnInputRef = useRef(null);

  const _initInputValue = () => {
    if(isEdit && invoiceData) {
      const {freightCharges, freightHSNCode, 
        pickupChargesAmount, pickupHSNCode, 
        doorDeliveryAmount, doorDeliveryHSNCode, 
        packagingChargesAmount, packagingHSNCode, 
        packingMaterialChargesAmount, packingMaterialHSNCode, 
        loadingChargesAmount, loadingHSNCode, 
        unLoadingChargesAmount, unLoadingHSNCode, 
        unPackagingChargesAmount, unPackagingHSNCode} = invoiceData || {};
      switch (freightType) {
        case FREIGHT_TYPE.FREIGHT_CHARGES:
          setFreightCharges(freightCharges);
          setFreightHSN(freightHSNCode);
          //@ts-ignore
          amountInputRef && amountInputRef?.current?.setValue(freightCharges);
          //@ts-ignore
          hsnInputRef && hsnInputRef?.current?.setValue(freightHSNCode);
          break;
        case FREIGHT_TYPE.PICKUP_CHARGES:
          setPickupChargeAmount(pickupChargesAmount);
          setPickupChargeHSN(pickupHSNCode);
          //@ts-ignore
          amountInputRef && amountInputRef?.current?.setValue(pickupChargesAmount);
          //@ts-ignore
          hsnInputRef && hsnInputRef?.current?.setValue(pickupHSNCode);
          break;
        case FREIGHT_TYPE.DOOR_DELIVERY_CHARGE:
          setDoorDeliveryAmount(doorDeliveryAmount);
          setDoorDeliveryHSN(doorDeliveryHSNCode);
          //@ts-ignore
          amountInputRef && amountInputRef?.current?.setValue(doorDeliveryAmount);
          //@ts-ignore
          hsnInputRef && hsnInputRef?.current?.setValue(doorDeliveryHSNCode);
          break;
        case FREIGHT_TYPE.PACKING_CHARGES:
          setPackingAmount(packagingChargesAmount);
          setPackingHSN(packagingHSNCode);
           //@ts-ignore
           amountInputRef && amountInputRef?.current?.setValue(packagingChargesAmount);
           //@ts-ignore
           hsnInputRef && hsnInputRef?.current?.setValue(packagingHSNCode);
          break;
        case FREIGHT_TYPE.PACKING_MATERIAL_CHARGES:
          setPackingMaterialAmount(packingMaterialChargesAmount);
          setPackingMaterialHSN(packingMaterialHSNCode);
          //@ts-ignore
          amountInputRef && amountInputRef?.current?.setValue(packingMaterialChargesAmount);
          //@ts-ignore
          hsnInputRef && hsnInputRef?.current?.setValue(packingMaterialHSNCode);
          break;
        case FREIGHT_TYPE.LOADING_CHARGES:
          setLoadingAmount(loadingChargesAmount);
          setLoadingHSN(loadingHSNCode);
          //@ts-ignore
          amountInputRef && amountInputRef?.current?.setValue(loadingChargesAmount);
          //@ts-ignore
          hsnInputRef && hsnInputRef?.current?.setValue(loadingHSNCode);
          break;
        case FREIGHT_TYPE.UNLOADING_CHARGES:
          setUnloadingAmount(unLoadingChargesAmount);
          setUnloadingHSN(unLoadingHSNCode);
           //@ts-ignore
           amountInputRef && amountInputRef?.current?.setValue(unLoadingChargesAmount);
           //@ts-ignore
           hsnInputRef && hsnInputRef?.current?.setValue(unLoadingHSNCode);
          break;
        case FREIGHT_TYPE.UNPACKING_CHARGES:
          setUnpackingAmount(unPackagingChargesAmount);
          setUnpackingHSN(unPackagingHSNCode);
          //@ts-ignore
          amountInputRef && amountInputRef?.current?.setValue(unPackagingChargesAmount);
          //@ts-ignore
          hsnInputRef && hsnInputRef?.current?.setValue(unPackagingHSNCode);
          break;
        default:
          break;
      }
    }
  }

  const _getInputValue = () => {
    let amount, hsnCode;
    if(isEdit && invoiceData) {
      const {freightCharges, freightHSNCode, 
        pickupChargesAmount, pickupHSNCode, 
        doorDeliveryAmount, doorDeliveryHSNCode, 
        packagingChargesAmount, packagingHSNCode, 
        packingMaterialChargesAmount, packingMaterialHSNCode, 
        loadingChargesAmount, loadingHSNCode, 
        unLoadingChargesAmount, unLoadingHSNCode, 
        unPackagingChargesAmount, unPackagingHSNCode} = invoiceData || {};
      switch (freightType) {
        case FREIGHT_TYPE.FREIGHT_CHARGES:
          amount = freightCharges;
          hsnCode = freightHSNCode
          break;
        case FREIGHT_TYPE.PICKUP_CHARGES:
          amount = pickupChargesAmount;
          hsnCode = pickupHSNCode
          break;
        case FREIGHT_TYPE.DOOR_DELIVERY_CHARGE:
          amount = doorDeliveryAmount;
          hsnCode = doorDeliveryHSNCode
          break;
        case FREIGHT_TYPE.PACKING_CHARGES:
          amount = packagingChargesAmount;
          hsnCode = packagingHSNCode;
          break;
        case FREIGHT_TYPE.PACKING_MATERIAL_CHARGES:
          amount = packingMaterialChargesAmount;
          hsnCode = packingMaterialHSNCode;
          break;
        case FREIGHT_TYPE.LOADING_CHARGES:
          amount = loadingChargesAmount;
          hsnCode = loadingHSNCode;
          break;
        case FREIGHT_TYPE.UNLOADING_CHARGES:
          amount = unLoadingChargesAmount;
          hsnCode = unLoadingHSNCode;
          break;
        case FREIGHT_TYPE.UNPACKING_CHARGES:
          amount = unPackagingChargesAmount;
          hsnCode = unPackagingHSNCode;
          break;
        default:
          break;
      }
    }
    return {amount, hsnCode}
  }

  const handleStateUpdate = (text: string, inputAt: number) => {
    switch (freightType) {
      case FREIGHT_TYPE.FREIGHT_CHARGES:
        if (inputAt == 1) {
          setFreightCharges(text);
        } else if (inputAt == 2) {
          setFreightHSN(text);
        }
        break;
      case FREIGHT_TYPE.PICKUP_CHARGES:
        if (inputAt == 1) {
          setPickupChargeAmount(text);
        } else if (inputAt == 2) {
          setPickupChargeHSN(text);
        }
        break;
      case FREIGHT_TYPE.DOOR_DELIVERY_CHARGE:
        if (inputAt == 1) {
          setDoorDeliveryAmount(text);
        } else if (inputAt == 2) {
          setDoorDeliveryHSN(text);
        }
        break;
      case FREIGHT_TYPE.PACKING_CHARGES:
        if (inputAt == 1) {
          setPackingAmount(text);
        } else if (inputAt == 2) {
          setPackingHSN(text);
        }
        break;
      case FREIGHT_TYPE.PACKING_MATERIAL_CHARGES:
        if (inputAt == 1) {
          setPackingMaterialAmount(text);
        } else if (inputAt == 2) {
          setPackingMaterialHSN(text);
        }
        break;
      case FREIGHT_TYPE.LOADING_CHARGES:
        if (inputAt == 1) {
          setLoadingAmount(text);
        } else if (inputAt == 2) {
          setLoadingHSN(text);
        }
        break;
      case FREIGHT_TYPE.UNLOADING_CHARGES:
        if (inputAt == 1) {
          setUnloadingAmount(text);
        } else if (inputAt == 2) {
          setUnloadingHSN(text);
        }
        break;
      case FREIGHT_TYPE.UNPACKING_CHARGES:
        if (inputAt == 1) {
          setUnpackingAmount(text);
        } else if (inputAt == 2) {
          setUnpackingHSN(text);
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    _initInputValue();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.compContainer}>
        <Label text={label1} style={styles.label} />
        <Input
          //@ts-ignore
          ref={amountInputRef}
          onChangeText={(text: string) => handleStateUpdate(text, 1)}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          selectionColor={COLOR_BLACK}
          value={_getInputValue().amount}
          inputType="numeric"
          placeholder='Enter amount'
          placeholderTextColor={COLOR_GRAY4}
        />
      </View>
      <View style={styles.compContainer}>
        <Label text={label2} style={styles.label} />
        <Input
          //@ts-ignore
          ref={hsnInputRef}
          onChangeText={(text: string) => handleStateUpdate(text, 2)}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          selectionColor={COLOR_BLACK}
          placeholder='Enter HSN code'
          value={_getInputValue().hsnCode}
          inputType="numeric"
          placeholderTextColor={COLOR_GRAY4}
        />
      </View>
    </View>
  );
};

export default FreightInputView;
