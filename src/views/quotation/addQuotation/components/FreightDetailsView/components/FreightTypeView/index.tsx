import React, { useEffect } from 'react';
import {Text, View} from 'react-native';
import styles from './style';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Spacer from '../../../../../../../common/Spacer';
import {FREIGHT_TYPE} from '../utils';
import {COLOR_BLUE} from '../../../../../../../utils/colors';
import {useQuotationFormContextHook} from '../../../../../../../provider/QuotationFormContextProvider';
import SingleChargeInputView from '../SingleChargeInputView';
import BothChargeInputView from '../BothChargeInputView';
import shiftingLuggages from '../../../../../../../data/shiftingLuggage.json';
interface Props {
  freightType: FREIGHT_TYPE;
  options: string[];
}

const FreightTypeView: React.FC<Props> = ({freightType, options}) => {
  const {
    state,
    setFreightPartLoad,
    setFreightFullLoad,
    setPackingCharge,
    setPackingMaterialCharge,
    setLoadingCharge,
    setUnloadingCharge,
    setUnpackingCharge,
    resetAllPartLoad,
    resetAllFullLoad,
  } = useQuotationFormContextHook();

  const _getFreightTypeText = () => {
    let text: string = '';
    switch (freightType) {
      case FREIGHT_TYPE.LOAD_TYPE:
        text = 'Load Type';
        break;
      case FREIGHT_TYPE.PACKING_CHARGE:
        text = 'Packing Charges';
        break;
      case FREIGHT_TYPE.PACKING_MATERIAL_CHARGE:
        text = 'Packing Material Charges';
        break;
      case FREIGHT_TYPE.LOADING_CHARGE:
        text = 'Loading Charges';
        break;
      case FREIGHT_TYPE.UNLOADING_CHARGE:
        text = 'Unloading Charges';
        break;
      case FREIGHT_TYPE.UNPACKING_CHARGE:
        text = 'Unpacking Charges';
        break;
      default:
        break;
    }
    return text;
  };

  const _getCheckedCompareToOption = (op: string = '') => {
    let option: string = '';
    switch (freightType) {
      case FREIGHT_TYPE.LOAD_TYPE:
        if (op == options[0]) {
          if (state.freight_part_load) {
            option = options[0];
          } else {
            option = '';
          }
        } else if (op == options[1]) {
          if (state.freight_full_load) {
            option = options[1];
          } else {
            option = '';
          }
        }
        break;
      case FREIGHT_TYPE.PACKING_CHARGE:
        option = state.packing_charge;
        break;
      case FREIGHT_TYPE.PACKING_MATERIAL_CHARGE:
        option = state.packing_material_charge;
        break;
      case FREIGHT_TYPE.LOADING_CHARGE:
        option = state.loading_charge;
        break;
      case FREIGHT_TYPE.UNLOADING_CHARGE:
        option = state.unloading_charge;
        break;
      case FREIGHT_TYPE.UNPACKING_CHARGE:
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
        if (option == options[0]) {
          setFreightPartLoad(!state.freight_part_load);
        } else if (option == options[1]) {
          setFreightFullLoad(!state.freight_full_load);
        }
        break;
      case FREIGHT_TYPE.PACKING_CHARGE:
        setPackingCharge(option);
        break;
      case FREIGHT_TYPE.PACKING_MATERIAL_CHARGE:
        setPackingMaterialCharge(option);
        break;
      case FREIGHT_TYPE.LOADING_CHARGE:
        setLoadingCharge(option);
        break;
      case FREIGHT_TYPE.UNLOADING_CHARGE:
        setUnloadingCharge(option);
        break;
      case FREIGHT_TYPE.UNPACKING_CHARGE:
        setUnpackingCharge(option);
        break;
      default:
        break;
    }
  };

  const isBothLoadType = state.freight_part_load && state.freight_full_load;

  const showLoadTypeRequiredErrorView = () => {
    const noLoadTypeSelected = !state.freight_part_load && !state.freight_full_load;
    if (noLoadTypeSelected && freightType == FREIGHT_TYPE.LOAD_TYPE) {
      return (
        <View style={styles.loadTypeErrorContainer}>
          <Text style={styles.loadTypeErrorText}>Load type required</Text>
        </View>
      );
    }
    return null;
  };

  useEffect(() => {
    if(state.shifting_luggage == shiftingLuggages[3].label) {
      if(freightType == FREIGHT_TYPE.PACKING_CHARGE) {
        setPackingCharge(options[2]);
      }
      if(freightType == FREIGHT_TYPE.PACKING_MATERIAL_CHARGE) {
        setPackingMaterialCharge(options[2]);
      }
      if(freightType == FREIGHT_TYPE.UNPACKING_CHARGE) {
        setUnpackingCharge(options[2]);
      }
    } else {
      if(freightType == FREIGHT_TYPE.PACKING_CHARGE) {
        setPackingCharge(options[1]);
      }
      if(freightType == FREIGHT_TYPE.PACKING_MATERIAL_CHARGE) {
        setPackingMaterialCharge(options[1]);
      }
      if(freightType == FREIGHT_TYPE.UNPACKING_CHARGE) {
        setUnpackingCharge(options[1]);
      }
    }
  }, [state.shifting_luggage]);

  useEffect(() => {
    if(freightType == FREIGHT_TYPE.LOAD_TYPE) {
        if(state.freight_part_load && !state.freight_full_load) {
            resetAllFullLoad();
        } else if(!state.freight_part_load && state.freight_full_load) {
            resetAllPartLoad();
        }
    }
  }, [state.freight_part_load, state.freight_full_load]);

  return (
    <View style={styles.mainWrapper}>
        <Spacer height={10} />
      <View style={styles.container}>
        <Text style={styles.labelText}>{_getFreightTypeText()}</Text>
      </View>
      <Spacer height={10} />
      <View style={styles.optionContainer}>
        {options.map((option: string, index: number) => (
          <BouncyCheckbox
            key={`${index}`}
            size={25}
            unfillColor="#FFFFFF"
            text={option}
            fillColor={COLOR_BLUE}
            iconStyle={freightType == FREIGHT_TYPE.LOAD_TYPE ? styles.iconStyle : styles.iconStyle2}
            innerIconStyle={freightType == FREIGHT_TYPE.LOAD_TYPE ? styles.innerIconStyle : styles.innerIconStyle2}
            textStyle={styles.textStyle}
            style={styles.style}
            textContainerStyle={styles.textContainerStyle}
            onPress={(isChecked: boolean) => {
              _handleOption(option);
            }}
            isChecked={_getCheckedCompareToOption(option) == option}
            disableBuiltInState={true}
          />
        ))}
      </View>
      {showLoadTypeRequiredErrorView()}
      <Spacer height={10} />
      {isBothLoadType ? <BothChargeInputView freightType={freightType} /> : <SingleChargeInputView freightType={freightType} />}
      <Spacer height={10} />
    </View>
  );
};

export default FreightTypeView;
