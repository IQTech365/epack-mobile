import React from 'react';
import {View} from 'react-native';
import styles from './style';
import FreightTypeView from './components/FreightTypeView';
import {
  FREIGHT_TYPE,
  doorDeliveryChargeOptions,
  loadTypeOptions,
  loadingChargeOptions,
  pickupChargeOptions,
  unloadingChargeOptions,
} from '../../utils';
import Spacer from '../../../../../../../common/Spacer';
import FreightOtherChargesView from './components/FreightOtherChargesView';
import FreightSurchargeView from './components/FreightSurchargeView';
import FreightDiscountView from './components/FreightDiscountView';
import FreightGSTView from './components/FreightGSTView';
import { IInvoice } from '../../../../../../../interface/order/IGetInvoiceListResponse';

interface Props {
  isEdit?:boolean;
  invoiceData?:IInvoice;
}

const FreightDetailsView: React.FC<Props> = ({isEdit, invoiceData}) => {
  return (
    <View style={styles.container}>
      <FreightTypeView
        freightType={FREIGHT_TYPE.LOAD_TYPE}
        options={loadTypeOptions}
        label1='Freight Charges'
        label2='HSN Code'
      />
      <FreightTypeView
        freightType={FREIGHT_TYPE.FREIGHT_CHARGES}
        options={[]}
        label1='Amount'
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
      <Spacer height={20} />
      <FreightTypeView
        freightType={FREIGHT_TYPE.PACKING_CHARGES}
        options={doorDeliveryChargeOptions}
        label1='Amount'
        label2='HSN Code'
      />
      <Spacer height={20} />
      <FreightTypeView
        freightType={FREIGHT_TYPE.PACKING_MATERIAL_CHARGES}
        options={doorDeliveryChargeOptions}
        label1='Amount'
        label2='HSN Code'
      />
      <Spacer height={20} />
      <FreightTypeView
        freightType={FREIGHT_TYPE.LOADING_CHARGES}
        options={loadingChargeOptions}
        label1='Amount'
        label2='HSN Code'
      />
      <Spacer height={20} />
      <FreightTypeView
        freightType={FREIGHT_TYPE.UNLOADING_CHARGES}
        options={unloadingChargeOptions}
        label1='Amount'
        label2='HSN Code'
      />
      <Spacer height={20} />
      <FreightTypeView
        freightType={FREIGHT_TYPE.UNPACKING_CHARGES}
        options={doorDeliveryChargeOptions}
        label1='Amount'
        label2='HSN Code'
      />
      <Spacer height={20} />
      <FreightOtherChargesView isEdit={isEdit} invoiceData={invoiceData}/>
      <Spacer height={20} />
      <FreightSurchargeView />
      <Spacer height={20} />
      <FreightDiscountView />
      <Spacer height={20} />
      <FreightGSTView />
    </View>
  );
};

export default FreightDetailsView;
