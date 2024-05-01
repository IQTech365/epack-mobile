import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import {
  BASIC_PLAN_LINEARGRADIENT,
  FREE_PLAN_LINEARGRADIENT,
  PRO_PLAN_LINEARGRADIENT,
  UNLIMITED_PLAN_LINEARGRADIENT,
} from '../../../../utils/colors';
import TickIcon from '../../../../images/icons/tick_icon.svg';
import CloseTickIcon from '../../../../images/icons/close_icon3.svg';
import Spacer from '../../../../common/Spacer';
import {Shadow} from 'react-native-shadow-2';
import {
  IPlan,
  IPlanFeature,
  ISubmoduleFeatureWithActions,
  ISubscriptionPlan,
} from '../../../../interface/subscription/subscription';
import DropdownComponent from '../../../../common/DropdownComponent';
import {TDropdownItem} from '../../../../type/TDropdownItem';

interface ISubscriptionPlanCardProps {
  item: ISubscriptionPlan;
  onPress: (plan: ISubscriptionPlan, amount: number, duration: string) => void;
}

const SubscriptionPlanCard: React.FC<ISubscriptionPlanCardProps> = ({
  item,
  onPress,
}) => {
  const [planDuration, setPlanDuration] = useState<string>('');
  const [planAmount, setPlanAmount] = useState<number>(0);
  const {plans, list, subscriptionType, planFeatures} = item;

  const getTickIcon = (featureName: string) => {
    if (
      subscriptionType.toUpperCase() == 'FREE' &&
      (featureName == 'Staff Management System' ||
        featureName == 'Branch Management System' ||
        featureName == 'Franchise Management System' ||
        featureName == 'Vehicle Management System')
    ) {
      return <CloseTickIcon width={15} height={15} />;
    }
    if (
      subscriptionType.toUpperCase() == 'BASIC' &&
      (featureName == 'Branch Management System' ||
        featureName == 'Franchise Management System' ||
        featureName == 'Vehicle Management System')
    ) {
      return <CloseTickIcon width={15} height={15} />;
    }
    if (
      subscriptionType.toUpperCase() == 'PRO' &&
      featureName == 'Franchise Management System'
    ) {
      return <CloseTickIcon width={15} height={15} />;
    }
    return <TickIcon width={15} height={15} />;
  };

  const getPlanGradientColors = () => {
    let gradientColors = FREE_PLAN_LINEARGRADIENT;
    if (subscriptionType.toUpperCase() == 'FREE') {
      gradientColors = FREE_PLAN_LINEARGRADIENT;
    } else if (subscriptionType.toUpperCase() == 'PLUS') {
      gradientColors = BASIC_PLAN_LINEARGRADIENT;
    } else if (subscriptionType.toUpperCase() == 'PRO') {
      gradientColors = PRO_PLAN_LINEARGRADIENT;
    } else if (subscriptionType.toUpperCase() == 'UNLIMITED') {
      gradientColors = UNLIMITED_PLAN_LINEARGRADIENT;
    }
    return gradientColors;
  };

  const preparePlanDurationData = () => {
    const planDurations: TDropdownItem[] = plans.map((p: IPlan) => {
      const plan: TDropdownItem = {
        label: `₹ ${p.amount}.00 / ${p.duration}`.toUpperCase(),
        value: `${p.amount}|${p.duration}`,
      };
      return plan;
    });
    return planDurations;
  };

  const handlePlanDuration = (item: TDropdownItem) => {
    const splitValue = item.value.split('|');
    const amount = splitValue[0];
    const duration = splitValue[1];
    setPlanAmount(parseInt(amount));
    setPlanDuration(duration);
  };
  return (
    <Shadow distance={2}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <LinearGradient
            colors={getPlanGradientColors()}
            style={styles.planNameAndPriceContainer}
            useAngle={true}
            angle={45}>
            <Text style={styles.planTypeText}>
              {subscriptionType.toUpperCase()}
            </Text>
            {subscriptionType !== "free" ? <View style={styles.planDurationContainer}>
              <DropdownComponent
                data={preparePlanDurationData()}
                onSelect={handlePlanDuration}
                dropDownStyle={styles.dropDownStyle}
                container={styles.dropDownContainer}
                containerStyle={{width: '79%', marginTop: -100, marginLeft: -16}}
                selectedTextStyle={styles.selectedTextStyle}
              />
            </View>: <Spacer height={6} />}
          </LinearGradient>
          <ScrollView style={{width: '95%'}}>
            {planFeatures.map((planFeature: IPlanFeature, index: number) => {
              return (
                <View key={`${index}`}>
                  <Spacer height={5} />
                  <View style={styles.featureWrapper}>
                    <View style={styles.planFeatureContainer}>
                      {getTickIcon(planFeature.moduleName)}
                      <Text style={styles.featureTitleText}>
                        {planFeature.moduleName}
                      </Text>
                    </View>
                    {planFeature.moduleFeatures.map(
                      (
                        subSubFeature: ISubmoduleFeatureWithActions,
                        indx: number,
                      ) => {
                        return (
                          <View key={`${indx}`}>
                            <View style={styles.featureValuesContainer}>
                              <TickIcon width={10} height={10} />
                              <Text style={styles.featuresText2}>
                                {subSubFeature.moduleFeature}
                              </Text>
                            </View>
                            <View style={styles.featureValuesContainer2}>
                              <View style={styles.dot} />
                              <Text style={styles.featuresText}>
                                {subSubFeature.actions.join('/')}
                              </Text>
                            </View>
                          </View>
                        );
                      },
                    )}
                  </View>
                </View>
              );
            })}
          </ScrollView>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              if (!planAmount && !planDuration) {
                const planOptions:TDropdownItem[] = preparePlanDurationData();
                if(planOptions.length > 0) {
                  const firstPlanOption:TDropdownItem = planOptions[0];
                  const splitValue = firstPlanOption.value.split('|');
                  const amount = splitValue[0];
                  const duration = splitValue[1];
                  onPress(item, parseInt(amount), duration);
                }
              } else {
                onPress(item, planAmount, planDuration);
              }
            }}>
            <LinearGradient
              colors={getPlanGradientColors()}
              style={styles.buttonContainer}
              useAngle={true}
              angle={45}>
              <Text style={styles.planPriceText}>BUY NOW</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Shadow>
  );
};

export default SubscriptionPlanCard;
