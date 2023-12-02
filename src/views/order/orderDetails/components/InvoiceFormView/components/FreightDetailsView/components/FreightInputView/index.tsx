import React from 'react';
import {View} from 'react-native';
import styles from './style';
import Label from '../../../../../../../../../common/Label';
import Input from '../../../../../../../../../common/Input';
import {COLOR_BLACK} from '../../../../../../../../../utils/colors';
import {FREIGHT_TYPE} from '../../../../utils';
import Spacer from '../../../../../../../../../common/Spacer';
import {useInvoiceFormContextHook} from '../../../../../../../../../provider/InvoiceFormContextProvider';

interface Props {
  label1: string;
  label2: string;
  freightType: FREIGHT_TYPE;
}

const FreightInputView: React.FC<Props> = ({label1, label2, freightType}) => {
  const {
    state,
    setFreightCharges,
    setFreightHSN,
    setPickupChargeAmount,
    setPickupChargeHSN,
  } = useInvoiceFormContextHook();

  const handleStateUpdate = (text: string, inputAt: number) => {
    switch (freightType) {
      case FREIGHT_TYPE.LOAD_TYPE:
        if (inputAt == 1) {
          setFreightCharges(text);
        } else if (inputAt == 2) {
          setFreightHSN(text);
        }
        break;
      case FREIGHT_TYPE.PICKUP_CHARGES:
        if (inputAt == 1) {
          setPickupChargeAmount(text);
        } else if (inputAt == 2) {
          setPickupChargeHSN(text);
        }
        break;
      default:
        break;
    }
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
