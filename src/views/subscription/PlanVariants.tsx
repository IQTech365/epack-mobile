import React, { FC } from "react";
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import { IPlan, IPurchasedSubscription } from "../../interface/subscription/subscription";
import PlanVariant from "./PlanVariant";

interface IProps {
    variants:IPlan[],
    currentPlan: IPurchasedSubscription,
}

const PlanVariants:FC<IProps> = ({variants, currentPlan}) => {

    return <View style={styles.container}>
        {variants.map((v:IPlan) => <PlanVariant variant={v} />)}
    </View>
}

export default PlanVariants;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    }
});