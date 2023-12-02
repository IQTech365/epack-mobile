import React from 'react';
import {View} from 'react-native';
import styles from './style';
import FreightTypeView from './components/FreightTypeView';
import {
  FREIGHT_TYPE,
  doorDeliveryChargeOptions,
  loadTypeOptions,
  pickupChargeOptions,
} from '../../utils';
import Spacer from '../../../../../../../common/Spacer';

interface Props {}

const FreightDetailsView: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <FreightTypeView
        freightType={FREIGHT_TYPE.LOAD_TYPE}
        options={loadTypeOptions}
        label1='Freight Charges'
        label2='HSN Code'
      />
      <Spacer height={20} />
      <FreightTypeView
        freightType={FREIGHT_TYPE.PICKUP_CHARGES}
        options={pickupChargeOptions}
        label1='Amount'
        label2='HSN Code'
      />
      <Spacer height={20} />
      <FreightTypeView
        freightType={FREIGHT_TYPE.DOOR_DELIVERY_CHARGE}
        options={doorDeliveryChargeOptions}
        label1='Amount'
        label2='HSN Code'
      />
    </View>
  );
};

export default FreightDetailsView;
