import React from 'react';
import {View, Text, ScrollView, Dimensions} from 'react-native';
import Header from '../../common/Header';
import SubscriptionPlanCard from '../subscriptionPlan/components/subscriptionPlanCard';
const spinner = require('../../images/loader.json');
import Carousel from 'react-native-reanimated-carousel';
const {width} = Dimensions.get('window');

const SubscriptionView = props => {
  return (
    <View style={{flex: 1}}>
      <Header canGoBack={true} label="Subscription" />

      <Text>Subscription detials goes here</Text>
    </View>
  );
};

export default SubscriptionView;
