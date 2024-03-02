import React, { useEffect } from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import {FREIGHT_TYPE} from '../../../../utils';
import {COLOR_BLUE} from '../../../../../../../../../utils/colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Spacer from '../../../../../../../../../common/Spacer';
import FreightInputView from '../FreightInputView';
import {useInvoiceFormContextHook} from '../../../../../../../../../provider/InvoiceFormContextProvider';
import { IInvoice } from '../../../../../../../../../interface/order/IGetInvoiceListResponse';

interface Props {
  freightType: FREIGHT_TYPE;
  options: string[];
  label1: string;
  label2: string;
  isEdit?:boolean;
  invoiceData?:IInvoice;
}

const FreightTypeView: React.FC<Props> = ({
  freightType,
  options,
  label1,
  label2,
  isEdit,
  invoiceData
}) => {
  const {
    state,
    setLoadType,
    setPickupCharge,
    setDoorDeliveryCharge,
    setPackingCharge,
    setPackingMaterialCharge,
    setLoadingCharge,
    setUnloadingCharge,
    setUnpackingCharge,
  } = useInvoiceFormContextHook();

  const _initCheckboxOption = () => {
    if(isEdit && invoiceData) {
      const {isPartLoad, isFullLoad, 
        pickupChargesStatus, 
        packagingChargesStatus, 
        doorDeliveryStatus, 
        packingMaterialChargesStatus, 
        loadingChargesStatus, 
        unLoadingChargesStatus, unPackagingChargesStatus} = invoiceData || {};
      switch (freightType) {
        case FREIGHT_TYPE.LOAD_TYPE:
          if(isPartLoad == 'true'){
            setLoadType('Part Load');
          } else if(isFullLoad == 'true'){
            setLoadType('Full Load');
          }
          break;
        case FREIGHT_TYPE.PICKUP_CHARGES:
          setPickupCharge(pickupChargesStatus);
          break;
        case FREIGHT_TYPE.PACKING_CHARGES:
          setPackingCharge(packagingChargesStatus);
          break;
        case FREIGHT_TYPE.DOOR_DELIVERY_CHARGE:
          setDoorDeliveryCharge(doorDeliveryStatus);
          break;
        case FREIGHT_TYPE.PACKING_MATERIAL_CHARGES:
          setPackingMaterialCharge(packingMaterialChargesStatus);
          break;
        case FREIGHT_TYPE.LOADING_CHARGES:
          setLoadingCharge(loadingChargesStatus);
          break;
        case FREIGHT_TYPE.UNLOADING_CHARGES:
          setUnloadingCharge(unLoadingChargesStatus);
          break;
        case FREIGHT_TYPE.UNPACKING_CHARGES:
          setUnpackingCharge(unPackagingChargesStatus);
          break;
        default:
          break;
      }
    }
  };

  const _getFreightTypeText = () => {
    let text: string = '';
    switch (freightType) {
      case FREIGHT_TYPE.LOAD_TYPE:
        text = 'Load Type';
        break;
      case FREIGHT_TYPE.FREIGHT_CHARGES:
        text = 'Freight Charges';
        break;
      case FREIGHT_TYPE.PICKUP_CHARGES:
        text = 'Pickup Charges';
        break;
      case FREIGHT_TYPE.DOOR_DELIVERY_CHARGE:
        text = 'Door Delivery Charges';
        break;
      case FREIGHT_TYPE.PACKING_CHARGES:
        text = 'Packing Charges';
        break;
      case FREIGHT_TYPE.PACKING_MATERIAL_CHARGES:
        text = 'Packing Material Charges';
        break;
      case FREIGHT_TYPE.LOADING_CHARGES:
        text = 'Loading Charges';
        break;
      case FREIGHT_TYPE.UNLOADING_CHARGES:
        text = 'Unloading Charges';
        break;
      case FREIGHT_TYPE.UNPACKING_CHARGES:
        text = 'Unpacking Charges';
        break;
      default:
        break;
    }
    return text;
  };

  const _getCheckedCompareToOption = () => {
    let option: string = '';
    switch (freightType) {
      case FREIGHT_TYPE.LOAD_TYPE:
        option = state.freight_load_type;
        break;
      case FREIGHT_TYPE.FREIGHT_CHARGES:
          option = 'Freight Charge';
          break;
      case FREIGHT_TYPE.PICKUP_CHARGES:
        option = state.pickup_charge;
        break;
      case FREIGHT_TYPE.DOOR_DELIVERY_CHARGE:
        option = state.door_delivery_charge;
        break;
      case FREIGHT_TYPE.PACKING_CHARGES:
        option = state.packing_charge;
        break;
      case FREIGHT_TYPE.PACKING_MATERIAL_CHARGES:
        option = state.packing_material_charge;
        break;
      case FREIGHT_TYPE.LOADING_CHARGES:
        option = state.loading_charge;
        break;
      case FREIGHT_TYPE.UNLOADING_CHARGES:
        option = state.unloading_charge;
        break;
      case FREIGHT_TYPE.UNPACKING_CHARGES:
        option = state.unpacking_charge;
        break;
      default:
        break;
    }
    return option;
  };

  const _handleOption = (option: string) => {
    switch (freightType) {
      case FREIGHT_TYPE.LOAD_TYPE:
        setLoadType(option);
        break;
      case FREIGHT_TYPE.PICKUP_CHARGES:
        setPickupCharge(option);
        break;
      case FREIGHT_TYPE.PICKUP_CHARGES:
        setPickupCharge(option);
        break;
      case FREIGHT_TYPE.PACKING_CHARGES:
        setPackingCharge(option);
        break;
      case FREIGHT_TYPE.DOOR_DELIVERY_CHARGE:
        setDoorDeliveryCharge(option);
        break;
      case FREIGHT_TYPE.PACKING_MATERIAL_CHARGES:
        setPackingMaterialCharge(option);
        break;
      case FREIGHT_TYPE.LOADING_CHARGES:
        setLoadingCharge(option);
        break;
      case FREIGHT_TYPE.UNLOADING_CHARGES:
        setUnloadingCharge(option);
        break;
      case FREIGHT_TYPE.UNPACKING_CHARGES:
        setUnpackingCharge(option);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    _initCheckboxOption();
  }, []);

  return (
    <View style={styles.mainWrapper}>
      <View style={styles.container}>
        <Text style={styles.labelText}>{_getFreightTypeText()}</Text>
      </View>
      {options.length > 0 ? <>
        <Spacer height={10} />
        <View style={styles.optionContainer}>
          {options.map((option: string, index: number) => (
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
                _handleOption(option);
              }}
              isChecked={_getCheckedCompareToOption() == option}
              disableBuiltInState={true}
            />
          ))}
        </View>
      </> : null}
      <Spacer height={10} />
      {['Additional', 'With GST', 'Freight Charge'].includes(_getCheckedCompareToOption()) ? <FreightInputView
        freightType={freightType}
        label1={label1}
        label2={label2}
        isEdit={isEdit}
        invoiceData={invoiceData}
      /> : null}
    </View>
  );
};

export default FreightTypeView;
