import React, { useEffect, useRef } from 'react';
import {View} from 'react-native';
import styles from './style';
import {COLOR_BLACK} from '../../../../../../../utils/colors';
import Label from '../../../../../../../common/Label';
import Input from '../../../../../../../common/Input';
import {useQuotationFormContextHook} from '../../../../../../../provider/QuotationFormContextProvider';
import {FREIGHT_TYPE, options} from '../utils';
import shiftingLuggages from '../../../../../../../data/shiftingLuggage.json';
import { IQuotationFreight, ISingleQuotationData } from '../../../../../../../interface/quotation/IGetSingleQuotationResponse';
import { IGetQuotationData } from '../../../../../../../interface/quotation/IGetQuotationsResponse';
import _ from 'underscore';
interface Props {
  freightType: FREIGHT_TYPE;
  isEdit?:boolean;
  item?:IGetQuotationData;
  quotationData?:ISingleQuotationData;
}

const BothChargeInputView: React.FC<Props> = ({freightType, isEdit, item, quotationData}) => {
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);

  const {
    state,
    setFreightPartCharge,
    setFreightFullCharge,
    setPackingChargePartLoad,
    setPackingChargeFullLoad,
    setPackingMaterialChargePartLoad,
    setPackingMaterialChargeFullLoad,
    setLoadingChargePartLoad,
    setLoadingChargeFullLoad,
    setUnloadingChargePartLoad,
    setUnloadingChargeFullLoad,
    setUnpackingChargePartLoad,
    setUnpackingChargeFullLoad,
  } = useQuotationFormContextHook();

  useEffect(() => {
    if(isEdit && quotationData) {
        const quotationfreight:IQuotationFreight = quotationData.quotationfreights;
        if(_.isObject(quotationfreight)) {
          setFreightPartCharge(quotationfreight.partLoadCharge);
          setFreightFullCharge(quotationfreight.fullLoadCharge);
          setPackingChargePartLoad(quotationfreight.packagingPartLoadCharges);
          setPackingChargeFullLoad(quotationfreight.packagingFullLoadCharges);
          setPackingMaterialChargePartLoad(quotationfreight.packingMaterialPartLoadCharges);
          setPackingMaterialChargeFullLoad(quotationfreight.packingMaterialFullLoadCharges);
          setLoadingChargePartLoad(quotationfreight.loadingPartLoadCharges);
          setLoadingChargeFullLoad(quotationfreight.loadingFullLoadCharges);
          setUnloadingChargePartLoad(quotationfreight.unLoadingPartLoadCharges);
          setUnloadingChargeFullLoad(quotationfreight.unLoadingFullLoadCharges);
          setUnpackingChargePartLoad(quotationfreight.unPackagingPartLoadCharges);
          setUnpackingChargeFullLoad(quotationfreight.unPackagingFullLoadCharges);
          _inputValue(quotationfreight);
        }
    }
  }, [isEdit, quotationData]);

  const _getLabelText = () => {
    let label1: string = 'Part Load', label2: string = 'Full Load';
    if(state.shifting_luggage == shiftingLuggages[3].label) {
      label1 = 'In Sharing';
      label2 = 'Separate';
    }
    if (freightType == FREIGHT_TYPE.LOAD_TYPE && state.shifting_luggage == shiftingLuggages[3].label) {
      label1 = 'Freight In Sharing';
      label2 = 'Freight Separate';
    } else if (freightType == FREIGHT_TYPE.LOAD_TYPE) {
      label1 = 'Freight Part';
      label2 = 'Freight Full';
    }

    
    return {label1, label2};
  };

  const _inputChangeHandler = () => {
    let handler1: (text: string) => void = (text: string) => {};
    let handler2: (text: string) => void = (text: string) => {};
    if (freightType == FREIGHT_TYPE.LOAD_TYPE) {
        handler1 = setFreightPartCharge;
        handler2 = setFreightFullCharge;
    } else if (freightType == FREIGHT_TYPE.PACKING_CHARGE) {
        handler1 = setPackingChargePartLoad;
        handler2 = setPackingChargeFullLoad;
    } else if (freightType == FREIGHT_TYPE.PACKING_MATERIAL_CHARGE) {
        handler1 = setPackingMaterialChargePartLoad;
        handler2 = setPackingMaterialChargeFullLoad;
    } else if (freightType == FREIGHT_TYPE.LOADING_CHARGE) {
        handler1 = setLoadingChargePartLoad;
        handler2 = setLoadingChargeFullLoad;
    } else if (freightType == FREIGHT_TYPE.UNLOADING_CHARGE) {
        handler1 = setUnloadingChargePartLoad;
        handler2 = setUnloadingChargeFullLoad;
    } else if (freightType == FREIGHT_TYPE.UNPACKING_CHARGE) {
        handler1 = setUnpackingChargePartLoad;
        handler2 = setUnpackingChargeFullLoad;
    }
    return {handler1, handler2};
  };

  const _inputValue = (quotationfreight:IQuotationFreight) => {
    if (freightType == FREIGHT_TYPE.LOAD_TYPE) {
      //@ts-ignore
      input1Ref && input1Ref?.current?.setValue(quotationfreight.partLoadCharge);
      setFreightPartCharge(quotationfreight.partLoadCharge);
      //@ts-ignore
      input2Ref && input2Ref?.current?.setValue(quotationfreight.fullLoadCharge);
      setFreightFullCharge(quotationfreight.fullLoadCharge);
    } else if (freightType == FREIGHT_TYPE.PACKING_CHARGE) {
      //@ts-ignore
      input1Ref && input1Ref?.current?.setValue(quotationfreight.packagingPartLoadCharges);
      setPackingChargePartLoad(quotationfreight.packagingPartLoadCharges)
      //@ts-ignore
      input2Ref && input2Ref?.current?.setValue(quotationfreight.packagingFullLoadCharges);
      setPackingChargeFullLoad(quotationfreight.packagingFullLoadCharges)
    } else if (freightType == FREIGHT_TYPE.PACKING_MATERIAL_CHARGE) {
     //@ts-ignore
     input1Ref && input1Ref?.current?.setValue(quotationfreight.packingMaterialPartLoadCharges);
     setPackingMaterialChargePartLoad(quotationfreight.packingMaterialPartLoadCharges);
     //@ts-ignore
     input2Ref && input2Ref?.current?.setValue(quotationfreight.packingMaterialFullLoadCharges);
     setPackingMaterialChargeFullLoad(quotationfreight.packingMaterialFullLoadCharges);
    } else if (freightType == FREIGHT_TYPE.LOADING_CHARGE) {
      //@ts-ignore
      input1Ref && input1Ref?.current?.setValue(quotationfreight.loadingPartLoadCharges);
      setLoadingChargePartLoad(quotationfreight.loadingPartLoadCharges);
      //@ts-ignore
      input2Ref && input2Ref?.current?.setValue(quotationfreight.loadingFullLoadCharges);
      setLoadingChargeFullLoad(quotationfreight.loadingFullLoadCharges);
    } else if (freightType == FREIGHT_TYPE.UNLOADING_CHARGE) {
     //@ts-ignore
     input1Ref && input1Ref?.current?.setValue(quotationfreight.unLoadingPartLoadCharges);
     setUnloadingChargePartLoad(quotationfreight.unLoadingPartLoadCharges);
     //@ts-ignore
     input2Ref && input2Ref?.current?.setValue(quotationfreight.unLoadingFullLoadCharges);
     setUnloadingChargeFullLoad(quotationfreight.unLoadingFullLoadCharges);
    } else if (freightType == FREIGHT_TYPE.UNPACKING_CHARGE) {
      //@ts-ignore
      input1Ref && input1Ref?.current?.setValue(quotationfreight.unPackagingPartLoadCharges);
      setUnpackingChargePartLoad(quotationfreight.unPackagingPartLoadCharges);
      //@ts-ignore
      input2Ref && input2Ref?.current?.setValue(quotationfreight.unPackagingFullLoadCharges);
      setUnpackingChargeFullLoad(quotationfreight.unPackagingFullLoadCharges);
    }
  };

  const _getInputValue = () => {
    let value1:string = '';
    let value2:string = '';
    if (freightType == FREIGHT_TYPE.LOAD_TYPE) {
      value1 = state.freight_part_charge;
      value2 = state.freight_full_charge;
    } else if (freightType == FREIGHT_TYPE.PACKING_CHARGE) {
      value1 = state.packing_charge_part_load;
      value2 = state.packing_charge_full_load;
    } else if (freightType == FREIGHT_TYPE.PACKING_MATERIAL_CHARGE) {
      value1 = state.packing_material_charge_part_load;
      value2 = state.packing_material_charge_full_load;
    } else if (freightType == FREIGHT_TYPE.LOADING_CHARGE) {
      value1 = state.loading_charge_part_load;
      value2 = state.loading_charge_full_load;
    } else if (freightType == FREIGHT_TYPE.UNLOADING_CHARGE) {
      value1 = state.unloading_charge_part_load;
      value2 = state.unloading_charge_full_load;
    } else if (freightType == FREIGHT_TYPE.UNPACKING_CHARGE) {
      value1 = state.unpacking_charge_part_load;
      value2 = state.unpacking_charge_full_load;
    }
    return {value1, value2};
  };

  const _shouldHideView = () => {
    let hideView:boolean = false;
    if(freightType == FREIGHT_TYPE.PACKING_CHARGE && state.packing_charge !== options[1]) {
        hideView = true;
    } else if(freightType == FREIGHT_TYPE.PACKING_MATERIAL_CHARGE && state.packing_material_charge !== options[1]) {
        hideView = true;
    } else if(freightType == FREIGHT_TYPE.LOADING_CHARGE && state.loading_charge !== options[1]) {
        hideView = true;
    } else if(freightType == FREIGHT_TYPE.UNLOADING_CHARGE && state.unloading_charge !== options[1]) {
        hideView = true;
    } else if(freightType == FREIGHT_TYPE.UNPACKING_CHARGE && state.unpacking_charge !== options[1]) {
        hideView = true;
    }
    return hideView;
  }

  if(_shouldHideView()) {
    return null;
  }

  

  return (
    <View style={styles.twoColumnContainer}>
      <View style={styles.compContainer}>
        <Label text={_getLabelText().label1} style={styles.label} />
        <Input
          onChangeText={_inputChangeHandler().handler1}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          selectionColor={COLOR_BLACK}
          placeholder='Enter amount'
          inputType="numeric"
          value={_getInputValue().value1}
          //@ts-ignore
          ref={input1Ref}
        />
      </View>
      <View style={styles.compContainer}>
        <Label text={_getLabelText().label2} style={styles.label} />
        <Input
          onChangeText={_inputChangeHandler().handler2}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          selectionColor={COLOR_BLACK}
          placeholder='Enter amount'
          value={_getInputValue().value2}
          inputType="numeric"
          //@ts-ignore
          ref={input2Ref}
        />
      </View>
    </View>
  );
};

export default BothChargeInputView;
