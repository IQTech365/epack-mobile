import React from 'react';
import {View} from 'react-native';
import styles from './style';
import Label from '../../../../../../../../../common/Label';
import Input from '../../../../../../../../../common/Input';
import {COLOR_BLACK, COLOR_GRAY4} from '../../../../../../../../../utils/colors';
import {FREIGHT_TYPE} from '../../../../utils';
import {useInvoiceFormContextHook} from '../../../../../../../../../provider/InvoiceFormContextProvider';

interface Props {
  label1: string;
  label2: string;
  freightType: FREIGHT_TYPE;
}

const FreightInputView: React.FC<Props> = ({label1, label2, freightType}) => {
  const {
    setFreightCharges,
    setFreightHSN,
    setPickupChargeAmount,
    setPickupChargeHSN,
    setDoorDeliveryAmount,
    setDoorDeliveryHSN,
    setPackingAmount,
    setPackingHSN,
    setPackingMaterialAmount,
    setPackingMaterialHSN,
    setLoadingAmount,
    setLoadingHSN,
    setUnloadingAmount,
    setUnloadingHSN,
    setUnpackingAmount,
    setUnpackingHSN,
  } = useInvoiceFormContextHook();

  const handleStateUpdate = (text: string, inputAt: number) => {
    switch (freightType) {
      case FREIGHT_TYPE.FREIGHT_CHARGES:
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
      case FREIGHT_TYPE.DOOR_DELIVERY_CHARGE:
        if (inputAt == 1) {
          setDoorDeliveryAmount(text);
        } else if (inputAt == 2) {
          setDoorDeliveryHSN(text);
        }
        break;
      case FREIGHT_TYPE.PACKING_CHARGES:
        if (inputAt == 1) {
          setPackingAmount(text);
        } else if (inputAt == 2) {
          setPackingHSN(text);
        }
        break;
      case FREIGHT_TYPE.PACKING_MATERIAL_CHARGES:
        if (inputAt == 1) {
          setPackingMaterialAmount(text);
        } else if (inputAt == 2) {
          setPackingMaterialHSN(text);
        }
        break;
      case FREIGHT_TYPE.LOADING_CHARGES:
        if (inputAt == 1) {
          setLoadingAmount(text);
        } else if (inputAt == 2) {
          setLoadingHSN(text);
        }
        break;
      case FREIGHT_TYPE.UNLOADING_CHARGES:
        if (inputAt == 1) {
          setUnloadingAmount(text);
        } else if (inputAt == 2) {
          setUnloadingHSN(text);
        }
        break;
      case FREIGHT_TYPE.UNPACKING_CHARGES:
        if (inputAt == 1) {
          setUnpackingAmount(text);
        } else if (inputAt == 2) {
          setUnpackingHSN(text);
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
          inputType="numeric"
          placeholder='Enter amount'
          placeholderTextColor={COLOR_GRAY4}
        />
      </View>
      <View style={styles.compContainer}>
        <Label text={label2} style={styles.label} />
        <Input
          onChangeText={(text: string) => handleStateUpdate(text, 2)}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          selectionColor={COLOR_BLACK}
          placeholder='Enter HSN code'
          placeholderTextColor={COLOR_GRAY4}
        />
      </View>
    </View>
  );
};

export default FreightInputView;
