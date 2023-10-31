import React, { useEffect } from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../common/Header';
import Spacer from '../../common/Spacer';
import {
  BASIC_PLAN_LINEARGRADIENT,
  FREE_PLAN_LINEARGRADIENT,
  PRO_PLAN_LINEARGRADIENT,
  UNLIMITED_PLAN_LINEARGRADIENT,
} from '../../utils/colors';
import styles from './style';
// import PhonePePaymentSDK from 'react-native-phonepe-pg' 

const PaymentMethodView: React.FC<{}> = () => {
  let plan_type = 'Basic';
  const plan_price = 'Rs 1500.00';
  const plan_duration = 'PER YEAR';

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

  useEffect(() => {
      
  }, []);

  return (
    <View style={styles.container}>
      <Header label="Select Payment Method" />
      <Spacer height={10} />
      <LinearGradient
        colors={getPlanGradientColors()}
        style={styles.planInfoContainer}
        useAngle={true}
        angle={45}>
        <Text style={styles.planTypeText}>{plan_type}</Text>
        <Text style={styles.planPriceText}>{plan_price}</Text>
        <Text style={styles.planDurationText}>{plan_duration}</Text>
      </LinearGradient>
      <Spacer height={10} />
      <TouchableOpacity style={styles.paymentMethodContainer}>
          <Text style={styles.paymentText}>Pay via PhonePe</Text>
      </TouchableOpacity>
      <Spacer height={10} />
      <TouchableOpacity style={styles.paymentMethodContainer}>
          <Text style={styles.paymentText}>Pay via PayU</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentMethodView;
