import React, { FC } from "react";
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import { IPlan, ISubscriptionPlan } from "../../interface/subscription/subscription";
import PlanVariant from "./PlanVariant";
import { COLOR_BLACK, COLOR_GRAY6 } from "../../utils/colors";

interface IProps {
    plans:ISubscriptionPlan[],
}

const OtherSubscriptionPlan:FC<IProps> = ({plans}) => {

    return <View style={styles.container}>
        {plans.map((p:ISubscriptionPlan) => {
            return (
              <>
                <View style={styles.labelContainer}>
                  <Text style={styles.planLabel}>
                    Subscription Type:{' '}
                    <Text style={styles.planNameLabel}>
                      {p.subscriptionType.toUpperCase()}
                    </Text>
                  </Text>
                </View>
                {p.plans.map((p:IPlan) => <PlanVariant variant={p} />)}
              </>
            );
        })}
    </View>
}

export default OtherSubscriptionPlan;

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    labelContainer: {
        width: width * 0.9,
        alignSelf: 'center',
        justifyContent: 'flex-start',
        backgroundColor: COLOR_GRAY6,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
    planLabel: {
        color: COLOR_BLACK,
        fontSize: 16,
        fontFamily: 'WorkSans-SemiBold'
    },
    planNameLabel: {
        color: COLOR_BLACK,
        fontSize: 16,
        fontFamily: 'WorkSans-Regular'
    }
});