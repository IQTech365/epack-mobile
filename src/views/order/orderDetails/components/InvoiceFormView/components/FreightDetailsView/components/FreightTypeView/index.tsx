import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import {FREIGHT_TYPE} from '../../../../utils';
import {COLOR_BLUE} from '../../../../../../../../../utils/colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Spacer from '../../../../../../../../../common/Spacer';
import FreightInputView from '../FreightInputView';
import {useInvoiceFormContextHook} from '../../../../../../../../../provider/InvoiceFormContextProvider';

interface Props {
  freightType: FREIGHT_TYPE;
  options: string[];
  label1: string;
  label2: string;
}

const FreightTypeView: React.FC<Props> = ({
  freightType,
  options,
  label1,
  label2,
}) => {
  const {state, setLoadType, setPickupCharge} = useInvoiceFormContextHook();

  const _getFreightTypeText = () => {
    let text: string = '';
    switch (freightType) {
      case FREIGHT_TYPE.LOAD_TYPE:
        text = 'Load Type';
        break;
      case FREIGHT_TYPE.PICKUP_CHARGES:
        text = 'Pickup Charges';
        break;
      case FREIGHT_TYPE.DOOR_DELIVERY_CHARGE:
        text = 'Door Delivery Charges';
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
      case FREIGHT_TYPE.PICKUP_CHARGES:
        option = state.pickup_charge;
        break;
      default:
        break;
    }
    return option;
  };

  const _handleOptionChange = (option: string) => {
    switch (freightType) {
      case FREIGHT_TYPE.LOAD_TYPE:
        setLoadType(option);
        break;
      case FREIGHT_TYPE.PICKUP_CHARGES:
        setPickupCharge(option);
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.mainWrapper}>
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
            iconStyle={styles.iconStyle}
            innerIconStyle={styles.innerIconStyle}
            textStyle={styles.textStyle}
            style={styles.style}
            textContainerStyle={styles.textContainerStyle}
            onPress={(isChecked: boolean) => {
              _handleOptionChange(option);
            }}
            isChecked={_getCheckedCompareToOption() == option}
            disableBuiltInState={true}
          />
        ))}
      </View>
      <Spacer height={10} />
      <FreightInputView
        freightType={freightType}
        label1={label1}
        label2={label2}
      />
    </View>
  );
};

export default FreightTypeView;
