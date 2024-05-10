import React from 'react';
import {View, Text} from 'react-native';
import CollapsibleView from '../../../../../common/CollapsibleView';
import FreightTypeView from './components/FreightTypeView';
import {
  FREIGHT_TYPE,
  loadOptions,
  loadOptions2,
  loadingChargeOptions,
  options,
  unloadingChargeOptions,
} from './components/utils';
import Spacer from '../../../../../common/Spacer';
import OtherChargeView from './components/OtherChargeView';
import AdvanceAmountView from './components/AdvanceAmountView';
import SurchargeView from './components/SurchargeView';
import DiscountView from './components/DiscountView';
import GstView from './components/GstView';
import VehicleLoadSizeView from '../VehicleLoadSizeView';
import {useQuotationFormContextHook} from '../../../../../provider/QuotationFormContextProvider';
import shiftingLuggages from '../../../../../data/shiftingLuggage.json';
import { IGetQuotationData } from '../../../../../interface/quotation/IGetQuotationsResponse';
import { ISingleQuotationData } from '../../../../../interface/quotation/IGetSingleQuotationResponse';
interface Props {
  isEdit?:boolean;
  item?:IGetQuotationData;
  quotationData?:ISingleQuotationData;
}

const FreightDetailsView: React.FC<Props> = ({isEdit, item, quotationData}) => {
  const {state} = useQuotationFormContextHook();  

  return (
    <CollapsibleView title="FREIGHT DETAILS" collapsed={true}>
      <View style={{alignItems: 'center'}}>
        <FreightTypeView
          options={
            state.shifting_luggage == shiftingLuggages[3].label
              ? loadOptions2
              : loadOptions
          }
          freightType={FREIGHT_TYPE.LOAD_TYPE}
          isEdit={isEdit} 
          item={item}
          quotationData={quotationData}
        />
        <VehicleLoadSizeView isEdit={isEdit} item={item} quotationData={quotationData} />
        <Spacer height={4} />
        <FreightTypeView
          options={options}
          freightType={FREIGHT_TYPE.PACKING_CHARGE}
          isEdit={isEdit} 
          item={item}
          quotationData={quotationData}
        />
        <Spacer height={4} />
        <FreightTypeView
          options={options}
          freightType={FREIGHT_TYPE.PACKING_MATERIAL_CHARGE}
          isEdit={isEdit} 
          item={item}
          quotationData={quotationData}
        />
        <Spacer height={4} />
        <FreightTypeView
          options={loadingChargeOptions}
          freightType={FREIGHT_TYPE.LOADING_CHARGE}
          isEdit={isEdit} 
          item={item}
          quotationData={quotationData}
        />
        <Spacer height={4} />
        <FreightTypeView
          options={unloadingChargeOptions}
          freightType={FREIGHT_TYPE.UNLOADING_CHARGE}
          isEdit={isEdit} 
          item={item}
          quotationData={quotationData}
        />
        <Spacer height={4} />
        <FreightTypeView
          options={options}
          freightType={FREIGHT_TYPE.UNPACKING_CHARGE}
          isEdit={isEdit} 
          item={item}
          quotationData={quotationData}
        />
        <Spacer height={4} />
        <OtherChargeView isEdit={isEdit} item={item} quotationData={quotationData} />
        <Spacer height={4} />
        <AdvanceAmountView isEdit={isEdit} item={item} quotationData={quotationData} />
        <Spacer height={4} />
        <SurchargeView isEdit={isEdit} item={item} quotationData={quotationData} />
        <Spacer height={4} />
        <DiscountView isEdit={isEdit} item={item} quotationData={quotationData}/>
        <Spacer height={4} />
        <GstView isEdit={isEdit} item={item} quotationData={quotationData} />
        <Spacer height={2} />
      </View>
    </CollapsibleView>
  );
};

export default FreightDetailsView;
