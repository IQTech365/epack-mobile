import React, {useEffect, useRef} from 'react';
import {View} from 'react-native';
import styles from './style';
import Label from '../../../../../../../common/Label';
import Input from '../../../../../../../common/Input';
import {COLOR_BLACK} from '../../../../../../../utils/colors';
import {useQuotationFormContextHook} from '../../../../../../../provider/QuotationFormContextProvider';
import { IQuotationFreight, ISingleQuotationData } from '../../../../../../../interface/quotation/IGetSingleQuotationResponse';
import { IGetQuotationData } from '../../../../../../../interface/quotation/IGetQuotationsResponse';

interface Props {
  isEdit?:boolean;
  item?:IGetQuotationData;
  quotationData?:ISingleQuotationData;
}

const AdvanceAmountView: React.FC<Props> = ({isEdit, item, quotationData}) => {
  const {state, setAdvanceAmount} = useQuotationFormContextHook();
  const advanceAmountCompRef = useRef(null);

  useEffect(() => {
    if(isEdit && quotationData) {
        setAdvanceAmount(quotationData.advanceAmount);
    }
  }, [isEdit, quotationData]);

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
