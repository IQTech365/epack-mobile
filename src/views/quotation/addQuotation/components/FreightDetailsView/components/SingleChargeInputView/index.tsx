import React, { useEffect, useRef } from 'react';
import {View} from 'react-native';
import styles from './style';
import Label from '../../../../../../../common/Label';
import Input from '../../../../../../../common/Input';
import {COLOR_BLACK} from '../../../../../../../utils/colors';
import {useQuotationFormContextHook} from '../../../../../../../provider/QuotationFormContextProvider';
import {FREIGHT_TYPE, options} from '../utils';
import shiftingLuggages from '../../../../../../../data/shiftingLuggage.json';
import { IQuotationFreight } from '../../../../../../../interface/quotation/IGetSingleQuotationResponse';
interface Props {
  freightType: FREIGHT_TYPE;
}

const SingleChargeInputView: React.FC<Props> = ({freightType}) => {
  const input1Ref = useRef();

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
    if(state.editQuotation && state.item) {
      const {item} = state;
      if(item) {
        const quotationfreight:IQuotationFreight = item.quotationfreights;
        if(quotationfreight) {
          setFreightPartCharge(quotationfreight.partLoadCharge);
          setPackingChargePartLoad(quotationfreight.packagingPartLoadCharges);
          setPackingMaterialChargePartLoad(quotationfreight.packingMaterialPartLoadCharges);
          setLoadingChargePartLoad(quotationfreight.loadingPartLoadCharges);
          setUnloadingChargePartLoad(quotationfreight.unLoadingPartLoadCharges);
          setUnpackingChargePartLoad(quotationfreight.unPackagingPartLoadCharges);
          _inputValue(quotationfreight);
        }
      }
    }
  }, [state.editQuotation, state.item]);

  const _getLabelText = () => {
    let text: string = state.freight_part_load ? 'Part Load' : 'Full Load';
    if(state.shifting_luggage == shiftingLuggages[3].label) {
      text = state.freight_part_load ? 'In Sharing' : 'Separate';
    }
    if (freightType == FREIGHT_TYPE.LOAD_TYPE && state.shifting_luggage == shiftingLuggages[3].label) {
      if (state.freight_part_load && !state.freight_full_load) {
        text = 'Freight In Sharing';
      } else if (state.freight_full_load && !state.freight_part_load) {
        text = 'Freight Separate';
      }
    } else if (freightType == FREIGHT_TYPE.LOAD_TYPE) {
      if (state.freight_part_load && !state.freight_full_load) {
        text = 'Freight Part';
      } else if (state.freight_full_load && !state.freight_part_load) {
        text = 'Freight Full';
      }
    }
    

    return text;
  };

  const _inputChangeHandler = () => {
    let handler:(text:string) => void = (text:string) => {};
    if(freightType == FREIGHT_TYPE.LOAD_TYPE) {
        if(state.freight_part_load) {
            handler = setFreightPartCharge;
        } else if(state.freight_full_load) {
            handler = setFreightFullCharge;
        }
    } else if(freightType == FREIGHT_TYPE.PACKING_CHARGE) {
        if(state.freight_part_load) {
            handler = setPackingChargePartLoad;
        } else if(state.freight_full_load) {
            handler = setPackingChargeFullLoad;
        }
    } else if(freightType == FREIGHT_TYPE.PACKING_MATERIAL_CHARGE) {
        if(state.freight_part_load) {
            handler = setPackingMaterialChargePartLoad;
        } else if(state.freight_full_load) {
            handler = setPackingMaterialChargeFullLoad;
        }
    } else if(freightType == FREIGHT_TYPE.LOADING_CHARGE) {
        if(state.freight_part_load) {
            handler = setLoadingChargePartLoad;
        } else if(state.freight_full_load) {
            handler = setLoadingChargeFullLoad;
        }
    } else if(freightType == FREIGHT_TYPE.UNLOADING_CHARGE) {
        if(state.freight_part_load) {
            handler = setUnloadingChargePartLoad;
        } else if(state.freight_full_load) {
            handler = setUnloadingChargeFullLoad;
        }
    } else if(freightType == FREIGHT_TYPE.UNPACKING_CHARGE) {
        if(state.freight_part_load) {
            handler = setUnpackingChargePartLoad;
        } else if(state.freight_full_load) {
            handler = setUnpackingChargeFullLoad;
        }
    }
    return handler;
  }

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

  const _inputValue = (quotationfreight:IQuotationFreight) => {
    if (freightType == FREIGHT_TYPE.LOAD_TYPE) {
      //@ts-ignore
      input1Ref && input1Ref?.current?.setValue(quotationfreight.partLoadCharge);
      setFreightPartCharge(quotationfreight.partLoadCharge);
    } else if (freightType == FREIGHT_TYPE.PACKING_CHARGE) {
      //@ts-ignore
      input1Ref && input1Ref?.current?.setValue(quotationfreight.packagingPartLoadCharges);
      setPackingChargePartLoad(quotationfreight.packagingPartLoadCharges)
    } else if (freightType == FREIGHT_TYPE.PACKING_MATERIAL_CHARGE) {
     //@ts-ignore
     input1Ref && input1Ref?.current?.setValue(quotationfreight.packingMaterialPartLoadCharges);
     setPackingMaterialChargePartLoad(quotationfreight.packingMaterialPartLoadCharges);
    } else if (freightType == FREIGHT_TYPE.LOADING_CHARGE) {
      //@ts-ignore
      input1Ref && input1Ref?.current?.setValue(quotationfreight.loadingPartLoadCharges);
      setLoadingChargePartLoad(quotationfreight.loadingPartLoadCharges);
    } else if (freightType == FREIGHT_TYPE.UNLOADING_CHARGE) {
     //@ts-ignore
     input1Ref && input1Ref?.current?.setValue(quotationfreight.unLoadingPartLoadCharges);
     setUnloadingChargePartLoad(quotationfreight.unLoadingPartLoadCharges);
    } else if (freightType == FREIGHT_TYPE.UNPACKING_CHARGE) {
      //@ts-ignore
      input1Ref && input1Ref?.current?.setValue(quotationfreight.unPackagingPartLoadCharges);
      setUnpackingChargePartLoad(quotationfreight.unPackagingPartLoadCharges);
    }
  };

  const _getInputValue = ():string => {
    let value:string = '';
    if (freightType == FREIGHT_TYPE.LOAD_TYPE) {
      value = state.freight_part_charge;
    } else if (freightType == FREIGHT_TYPE.PACKING_CHARGE) {
      value = state.packing_charge_part_load;
    } else if (freightType == FREIGHT_TYPE.PACKING_MATERIAL_CHARGE) {
      value = state.packing_material_charge_part_load;
    } else if (freightType == FREIGHT_TYPE.LOADING_CHARGE) {
      value = state.loading_charge_part_load;
    } else if (freightType == FREIGHT_TYPE.UNLOADING_CHARGE) {
      value = state.unloading_charge_part_load;
    } else if (freightType == FREIGHT_TYPE.UNPACKING_CHARGE) {
      value = state.unpacking_charge_part_load;
    }
    return value;
  };

  if(_shouldHideView()) {
    return null;
  }

  return (
    <View style={styles.fullWidthContainer}>
      <Label text={_getLabelText()} style={styles.label} />
      <Input
        onChangeText={_inputChangeHandler()}
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        selectionColor={COLOR_BLACK}
        value={_getInputValue()}
        inputType="numeric"
      />
    </View>
  );
};

export default SingleChargeInputView;
