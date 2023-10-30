import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
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

interface ISubscriptionPlanCardProps {
  item: any;
  onPress: (planType: string) => void;
}

const SubscriptionPlanCard: React.FC<ISubscriptionPlanCardProps> = ({
  item,
  onPress,
}) => {
  const {plan_type, plan_price, plan_duration, features} = item;

  const getTickIcon = (featureName: string) => {
    if (
      plan_type == 'Free' &&
      (featureName == 'Staff Management System' ||
        featureName == 'Branch Management System' ||
        featureName == 'Franchise Management System' ||
        featureName == 'Vehicle Management System')
    ) {
      return <CloseTickIcon width={15} height={15} />;
    }
    if (
      plan_type == 'Basic' &&
      (featureName == 'Branch Management System' ||
        featureName == 'Franchise Management System' ||
        featureName == 'Vehicle Management System')
    ) {
      return <CloseTickIcon width={15} height={15} />;
    }
    if (plan_type == 'Pro' && featureName == 'Franchise Management System') {
      return <CloseTickIcon width={15} height={15} />;
    }
    return <TickIcon width={15} height={15} />;
  };

  const getPlanGradientColors = () => {
    let gradientColors = FREE_PLAN_LINEARGRADIENT;
    if (plan_type == 'Free') {
      gradientColors = FREE_PLAN_LINEARGRADIENT;
    } else if (plan_type == 'Basic') {
      gradientColors = BASIC_PLAN_LINEARGRADIENT;
    } else if (plan_type == 'Pro') {
      gradientColors = PRO_PLAN_LINEARGRADIENT;
    } else if (plan_type == 'Unlimited') {
      gradientColors = UNLIMITED_PLAN_LINEARGRADIENT;
    }
    return gradientColors;
  };
  const {} = features;
  return (
    <Shadow style={styles.cardWrapper} distance={2}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <LinearGradient
            colors={getPlanGradientColors()}
            style={styles.planNameAndPriceContainer}
            useAngle={true}
            angle={45}>
            <Text style={styles.planTypeText}>{plan_type}</Text>
            <Text style={styles.planPriceText}>{plan_price}</Text>
            <Text style={styles.planDurationText}>{plan_duration}</Text>
          </LinearGradient>

          {features.map((feature: any, index: number) => {
            return (
              <>
                <Spacer height={5} />
                <View style={styles.featureWrapper}>
                  <View style={styles.planFeatureContainer}>
                    {getTickIcon(feature.feature_name)}
                    <Text style={styles.featureTitleText}>
                      {feature.feature_name}
                    </Text>
                  </View>
                  {feature.feature_sublist.map(
                    (subFeature: any, indx: number) => {
                      return (
                        <View
                          style={styles.featureValuesContainer}
                          key={`${indx}`}>
                          <View style={styles.dot} />
                          <Text style={styles.featuresText}>{subFeature}</Text>
                        </View>
                      );
                    },
                  )}
                  {feature.feature_subfeature.map(
                    (subSubFeature: any, indx: number) => {
                      return (
                        <>
                          <View style={styles.featureValuesContainer}>
                            <TickIcon width={10} height={10} />
                            <Text style={styles.featuresText2}>
                              {subSubFeature.subfeature_name}
                            </Text>
                          </View>
                          {subSubFeature.subfeature_sublist.map(
                            (subSubSubFeature: any, i: number) => {
                              return (
                                <View style={styles.featureValuesContainer2}>
                                  <View style={styles.dot} />
                                  <Text style={styles.featuresText}>
                                    {subSubSubFeature}
                                  </Text>
                                </View>
                              );
                            },
                          )}
                        </>
                      );
                    },
                  )}
                </View>
              </>
            );
          })}
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => onPress(plan_type)}>
            <LinearGradient
              colors={getPlanGradientColors()}
              style={styles.buttonContainer}
              useAngle={true}
              angle={45}>
              <Text style={styles.planPriceText}>BY NOW</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Shadow>
  );
};

export default SubscriptionPlanCard;
