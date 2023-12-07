import React from 'react';
import {View} from 'react-native';
import styles from './style';
import {COLOR_BLACK} from '../../../../../../../utils/colors';
import Label from '../../../../../../../common/Label';
import Input from '../../../../../../../common/Input';
import {useQuotationFormContextHook} from '../../../../../../../provider/QuotationFormContextProvider';
import {FREIGHT_TYPE} from '../utils';

interface Props {
  freightType: FREIGHT_TYPE;
}

const BothChargeInputView: React.FC<Props> = ({freightType}) => {
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

  const _getLabelText = () => {
    let label1: string = 'Part Load',
      label2: string = 'Full Load';
    if (freightType == FREIGHT_TYPE.LOAD_TYPE) {
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

  return (
    <View style={styles.twoColumnContainer}>
      <View style={styles.compContainer}>
        <Label text={_getLabelText().label1} style={styles.label} />
        <Input
          onChangeText={_inputChangeHandler().handler1}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          selectionColor={COLOR_BLACK}
          // value={state.authority_person_name}
          //@ts-ignore
          //error={showErrors && errors.dropPincode}
          inputType="numeric"
        />
      </View>
      <View style={styles.compContainer}>
        <Label text={_getLabelText().label2} style={styles.label} />
        <Input
          onChangeText={_inputChangeHandler().handler2}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          selectionColor={COLOR_BLACK}
          // value={state.authority_person_name}
          //@ts-ignore
          //error={showErrors && errors.dropPincode}
          inputType="numeric"
        />
      </View>
    </View>
  );
};

export default BothChargeInputView;
