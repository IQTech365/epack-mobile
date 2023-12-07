import React from "react";
import {View, Text} from 'react-native';
import styles from './style';
import CollapsibleView from "../../../../../common/CollapsibleView";
import FreightTypeView from "./components/FreightTypeView";
import { FREIGHT_TYPE, loadOptions, options } from "./components/utils";
import Spacer from "../../../../../common/Spacer";

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
        </View>
    </CollapsibleView>
}

export default FreightDetailsView;