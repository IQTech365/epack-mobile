import React from "react";
import {View, ScrollView, Dimensions} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Header from "../../common/Header";
import SubscriptionPlanCard from "./components/subscriptionPlanCard";
const {width} = Dimensions.get('window');
import subscriptionplans from '../../data/subscrptionplans.json';
import { COLOR_GRAY4, COLOR_GRAY5, COLOR_WHITE } from "../../utils/colors";


const SubscriptionPlanView = () => {
    const handleByPlan = (planType: string) => {
        // TODO: Process Payment and the move user to Dashboard
    }

    return (
      <View style={{flex: 1, backgroundColor: COLOR_GRAY5}}>
        <Header canGoBack={true} label="Choose Subscription Plan" />
        <Carousel
          loop
          width={width}
          mode="parallax"
          // autoPlay={true}
          data={subscriptionplans}
          scrollAnimationDuration={1000}
          panGestureHandlerProps={{
              activeOffsetX: [-10, 10],
          }}
          onSnapToItem={index => console.log('current index:', index)}
          renderItem={({item, index}) => {
            return (
              <ScrollView showsVerticalScrollIndicator={false}>
                <SubscriptionPlanCard  item={item} onPress={handleByPlan}/>
              </ScrollView>
            );
          }}
        />
      </View>
    );
  };
  
  export default SubscriptionPlanView;