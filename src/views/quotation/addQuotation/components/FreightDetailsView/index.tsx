import React from "react";
import {View, Text} from 'react-native';
import styles from './style';
import CollapsibleView from "../../../../../common/CollapsibleView";
import FreightTypeView from "./components/FreightTypeView";
import { FREIGHT_TYPE, loadOptions, options } from "./components/utils";
import Spacer from "../../../../../common/Spacer";
import OtherChargeView from "./components/OtherChargeView";
import AdvanceAmountView from "./components/AdvanceAmountView";
import SurchargeView from "./components/SurchargeView";
import DiscountView from "./components/DiscountView";
import GstView from "./components/GstView";

interface Props {
    //
}

const FreightDetailsView:React.FC<Props> = ({}) => {

    return <CollapsibleView title="FREIGHT DETAILS" collapsed={true}>
        <View style={{alignItems: 'center'}}>
            <FreightTypeView options={loadOptions} freightType={FREIGHT_TYPE.LOAD_TYPE} />
            <Spacer height={4} />
            <FreightTypeView options={options} freightType={FREIGHT_TYPE.PACKING_CHARGE} />
            <Spacer height={4} />
            <FreightTypeView options={options} freightType={FREIGHT_TYPE.PACKING_MATERIAL_CHARGE} />
            <Spacer height={4} />
            <FreightTypeView options={options} freightType={FREIGHT_TYPE.LOADING_CHARGE} />
            <Spacer height={4} />
            <FreightTypeView options={options} freightType={FREIGHT_TYPE.UNLOADING_CHARGE} />
            <Spacer height={4} />
            <FreightTypeView options={options} freightType={FREIGHT_TYPE.UNPACKING_CHARGE} />
            <Spacer height={4} />
            <OtherChargeView />
            <Spacer height={4} />
            <AdvanceAmountView />
            <Spacer height={4} />
            <SurchargeView />
            <Spacer height={4} />
            <DiscountView />
            <Spacer height={4} />
            <GstView />
            <Spacer height={2} />
        </View>
    </CollapsibleView>
}

export default FreightDetailsView;