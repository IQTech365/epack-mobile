import React, {useReducer} from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import Label from '../../../../../../../../../common/Label';
import Input from '../../../../../../../../../common/Input';
import {COLOR_BLACK} from '../../../../../../../../../utils/colors';
import {FREIGHT_TYPE} from '../../../../utils';
import {
  ACTION,
  initialState,
  invoiceReducer,
} from '../../../../InvoiceReducer2';
import Spacer from '../../../../../../../../../common/Spacer';

interface Props {
  label1: string;
  label2: string;
  freightType: FREIGHT_TYPE;
}

const FreightInputView: React.FC<Props> = ({label1, label2, freightType}) => {
  const [state, dispatch] = useReducer(invoiceReducer, initialState);
  console.log('FreightInputView--', JSON.stringify(state, null, ' '));

  const handleStateUpdate = (text: string, inputAt: number) => {
    switch (freightType) {
      case FREIGHT_TYPE.LOAD_TYPE:
        if (inputAt == 1) {
          dispatchLoadTypeCharge(text);
        } else if (inputAt == 2) {
          dispatchLoadTypeHSNCode(text);
        }
        break;
      default:
        break;
    }
  };

  const dispatchLoadTypeCharge = (charge: string) => {
    dispatch({
      type: ACTION.FREIGHT_CHARGES,
      payload: charge,
    });
  };

  const dispatchLoadTypeHSNCode = (hsnCode: string) => {
    dispatch({
      type: ACTION.FREIGHT_CHARGES_HSN,
      payload: hsnCode,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.compContainer}>
        <Label text={label1} style={styles.label} />
        <Input
          onChangeText={(text: string) => handleStateUpdate(text, 1)}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          selectionColor={COLOR_BLACK}
        />
      </View>
      <Spacer width={8} />
      <View style={styles.compContainer}>
        <Label text={label2} style={styles.label} />
        <Input
          onChangeText={(text: string) => handleStateUpdate(text, 2)}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          selectionColor={COLOR_BLACK}
        />
      </View>
    </View>
  );
};

export default FreightInputView;
