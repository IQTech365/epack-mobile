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

      <Carousel
        loop
        width={width}
        // autoPlay={true}
        data={[...new Array(6).keys()]}
        scrollAnimationDuration={1000}
        panGestureHandlerProps={{
            activeOffsetX: [-30, 30],
        }}
        onSnapToItem={index => console.log('current index:', index)}
        renderItem={({index}) => {
          return (
            <ScrollView>
              <SubscriptionPlanCard />
            </ScrollView>
          );
        }}
      />
    </View>
  );
};

export default SubscriptionView;
