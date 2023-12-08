import React, {useRef} from 'react';
import {View} from 'react-native';
import styles from './style';
import Label from '../../../../../../../common/Label';
import Input from '../../../../../../../common/Input';
import {COLOR_BLACK} from '../../../../../../../utils/colors';
import {useQuotationFormContextHook} from '../../../../../../../provider/QuotationFormContextProvider';

interface Props {}

const AdvanceAmountView: React.FC<Props> = ({}) => {
  const {state, setAdvanceAmount} = useQuotationFormContextHook();
  const advanceAmountCompRef = useRef(null);
  return (
    <View style={styles.fullWidthContainer}>
      <Label text="Advance Amount" style={styles.label} />
      <Input
        onChangeText={setAdvanceAmount}
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        selectionColor={COLOR_BLACK}
        value={state.advance_amount}
        //@ts-ignore
        ref={advanceAmountCompRef}
      />
    </View>
  );
};

export default AdvanceAmountView;
