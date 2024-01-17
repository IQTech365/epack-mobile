import React from 'react';
import {View, Text, ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import Header from '../../common/Header';
import styles from './style';
import Spacer from '../../common/Spacer';
import {Shadow} from 'react-native-shadow-2';
const {width} = Dimensions.get('window');

const SubscriptionView = props => {
  return (
    <View style={styles.container}>
      <Header canGoBack={true} label="Subscription" />
      <Spacer height={10} />
      <View style={styles.currentPlanContainer}>
        <Text style={styles.planNameText}>BASIC PLAN</Text>
        <Spacer height={20} />
        <Text style={styles.planDaysText}>15 Days Left!</Text>
        <Spacer height={10} />
        <Text
          style={
            styles.planExpireText
          }>{`Your Basic Plan will expire on\n June 20th 2024`}</Text>
      </View>
      <Spacer height={40} />
      <View style={styles.dividerLineContainer}>
        <View style={styles.line} />
        <View style={styles.plansBoxContainer}>
          <Text style={styles.plansText}>PLANS</Text>
        </View>
      </View>
      <Spacer height={40} />
      <View style={styles.cardWrapper}>
        <Shadow distance={4}>
          <View style={styles.otherPlanContainer}>
            <View style={styles.iconContainer}>
              <View style={styles.logoContainer} />
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.otherPlanNameText}>Pro</Text>
              <Spacer height={10} />
              <Text style={styles.otherPlanDurationText}>₹ 300.00/Monthly</Text>
              <Spacer height={10} />
              <TouchableOpacity style={styles.subscribeContainer}>
                <Text style={styles.subscribeText}>Subscribe</Text>
              </TouchableOpacity>
              <Spacer height={5} />
            </View>
          </View>
        </Shadow>
      </View>
      <Spacer height={40} />
      <View style={styles.cardWrapper}>
        <Shadow distance={4}>
          <View style={styles.otherPlanContainer}>
            <View style={styles.iconContainer}>
              <View style={styles.logoContainer} />
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.otherPlanNameText}>Unlimited</Text>
              <Spacer height={10} />
              <Text style={styles.otherPlanDurationText}>₹ 1100.00/Monthly</Text>
              <Spacer height={10} />
              <TouchableOpacity style={styles.subscribeContainer}>
                <Text style={styles.subscribeText}>Subscribe</Text>
              </TouchableOpacity>
              <Spacer height={5} />
            </View>
          </View>
        </Shadow>
      </View>
    </View>
  );
};

export default SubscriptionView;
