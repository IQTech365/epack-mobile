import React, {useReducer} from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import {FREIGHT_TYPE} from '../../../../utils';
import {COLOR_BLUE} from '../../../../../../../../../utils/colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {
  ACTION,
  initialState,
  invoiceReducer,
} from '../../../../InvoiceReducer2';
import Spacer from '../../../../../../../../../common/Spacer';
import FreightInputView from '../FreightInputView';

interface Props {
  freightType: FREIGHT_TYPE;
  options: string[];
}

const FreightTypeView: React.FC<Props> = ({freightType, options}) => {
  const [state, dispatch] = useReducer(invoiceReducer, initialState);

  const _getFreightTypeText = () => {
    let text: string = '';
    switch (freightType) {
      case FREIGHT_TYPE.LOAD_TYPE:
        text = 'Load Type';
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
      default:
        break;
    }
    return option;
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
              dispatch({
                type: ACTION.FREIGHT_LOAD_TYPE,
                payload: option,
              });
            }}
            isChecked={_getCheckedCompareToOption() == option}
            disableBuiltInState={true}
          />
        ))}
      </View>
      <Spacer height={10} />
      <FreightInputView
        freightType={freightType}
        label1="Freight Charges"
        label2="HSN"
      />
    </View>
  );
};

export default FreightTypeView;
