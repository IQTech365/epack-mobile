import React, {FC} from 'react';
import {Text, View} from 'react-native';
import styles from './style';
import Spacer from '../../common/Spacer';
import {IPurchasedSubscription} from '../../interface/subscription/subscription';
import {formatDate5, getDaysDifference} from '../../utils/formatter';
import LinearGradient from 'react-native-linear-gradient';

interface IProps {
  data: IPurchasedSubscription | null;
}

const CurrentPlanCard: FC<IProps> = ({data}) => {

  const _showDaysLeftView = () => {
    if(data?.subscriptionPlan == 'free') return null;
    return (
      <>
        <Spacer height={10} />
        <Text style={styles.planDaysText}>{getDaysDifference(new Date(data?.expiryDate as string))}</Text>
        <Spacer height={10} />
      </>
    );
  };

  const _showExpirationMessage = () => {
    let expirationMessage:string = '';
    if(data?.subscriptionPlan == 'free') {
        expirationMessage = `Limited FEATURES and DOCUMENTS.\nTry Premium and get MORE benefits`
    } else {
        expirationMessage = `Your Basic Plan will expire on\n ${formatDate5(
            new Date(data?.expiryDate as string),
          )}`
    }
    return <Text style={styles.planExpireText}>{expirationMessage}</Text>;
  }
  return (
    <>
      <LinearGradient
        colors={['#051937', '#004d7a', '#008793', '#00bf72', '#a8eb12']}
        style={styles.gradientContainer}
        useAngle={true}
        angle={45}>
        <View style={styles.currentPlanContainer}>
          <Text style={styles.planNameText}>
            {data?.subscriptionPlan.toUpperCase()}
          </Text>
          {_showDaysLeftView()}
          {_showExpirationMessage()}
          <Spacer height={10} />
        </View>
      </LinearGradient>
      <Spacer height={40} />
      <View style={styles.dividerLineContainer}>
        <View style={styles.line} />
        <View style={styles.plansBoxContainer}>
          <Text style={styles.plansText}>MORE PLANS</Text>
        </View>
      </View>
    </>
  );
};

export default CurrentPlanCard;
