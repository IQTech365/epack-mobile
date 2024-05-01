import React, {FC} from 'react';
import {Text, View} from 'react-native';
import styles from './style';
import Spacer from '../../common/Spacer';
import {
  IPurchasedSubscription,
  ISubscription,
} from '../../interface/subscription/subscription';
import {
  formatDate,
  formatDate5,
  formatDate6,
  getDaysDifference,
} from '../../utils/formatter';
import LinearGradient from 'react-native-linear-gradient';
import _ from 'underscore';
interface IProps {
  data: IPurchasedSubscription | null;
}

const CurrentPlanCard: FC<IProps> = ({data}) => {
  const _showDaysLeftView = () => {
    if (data?.subscriptionPlan == 'free') return null;
    return (
      <>
        <Spacer height={10} />
        <Text style={styles.daysLabel}>
          {`Remaining: `}
          <Text style={styles.planDaysText}>
            {getDaysDifference(new Date(data?.expiryDate as string))} Days
          </Text>
        </Text>
        <Spacer height={10} />
      </>
    );
  };

  const _getCurrentPlanInfo = () => {
    let planName: string = '';
    const {subscription} = data || {};
    if (_.isObject(data)) {
      if (_?.isArray(subscription) && subscription.length > 0) {
        const firstSubscription: ISubscription = subscription[0];
        if (_.isObject(firstSubscription)) {
          planName = `${data.subscriptionPlan}-${firstSubscription.subscriptionType}`;
        }
      }
    }
    return planName;
  };

  const _showExpirationMessage = () => {
    let expirationMessage: string = '';
    if (data?.subscriptionPlan == 'free') {
      return (
        <Text
          style={
            styles.planExpireText
          }>{`Limited FEATURES and DOCUMENTS.\nTry Premium and get MORE benefits`}</Text>
      );
    } else {
      return (
        <Text style={styles.daysLabel}>
          {`Eexpires On: `}
          <Text style={styles.planExpireText}>
            {formatDate6(new Date(data?.expiryDate as string))}
          </Text>
        </Text>
      );
    }
  };

  return (
    <>
      <LinearGradient
        colors={['#051937', '#004d7a', '#008793', '#00bf72', '#a8eb12']}
        style={styles.gradientContainer}
        useAngle={true}
        angle={45}>
        <View style={styles.currentPlanContainer}>
          <Text style={styles.planNameText}>
            {_getCurrentPlanInfo().toUpperCase() || 'NA'}
          </Text>
          {_showDaysLeftView()}
          {_showExpirationMessage()}
          <Spacer height={10} />
        </View>
      </LinearGradient>
    </>
  );
};

export default CurrentPlanCard;
