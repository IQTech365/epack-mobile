import React, {useEffect, useRef} from 'react';
import {View} from 'react-native';
import styles from './style';
import Label from '../../../../../../../common/Label';
import Input from '../../../../../../../common/Input';
import {COLOR_BLACK} from '../../../../../../../utils/colors';
import {useQuotationFormContextHook} from '../../../../../../../provider/QuotationFormContextProvider';
import { IQuotationFreight } from '../../../../../../../interface/quotation/IGetSingleQuotationResponse';

interface Props {}

const AdvanceAmountView: React.FC<Props> = ({}) => {
  const {state, setAdvanceAmount} = useQuotationFormContextHook();
  const advanceAmountCompRef = useRef(null);

  useEffect(() => {
    if(state.editQuotation && state.item) {
      const {item} = state;
      if(item) {
        setAdvanceAmount(item.advanceAmount);
      }
    }
  }, [state.editQuotation, state.item]);

  return (
    <View style={styles.fullWidthContainer}>
      <Label text="Advance Amount" style={styles.label} />
      <Input
        onChangeText={setAdvanceAmount}
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        selectionColor={COLOR_BLACK}
        placeholder='Enter amount'
        value={state.advance_amount}
        //@ts-ignore
        ref={advanceAmountCompRef}
        inputType="numeric"
      />
    </View>
  );
};

export default AdvanceAmountView;
