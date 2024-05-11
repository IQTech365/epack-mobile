import React, {useEffect} from 'react';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import styles from './style';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {COLOR_BLUE, COLOR_GRAY2} from '../../../../utils/colors';
import {Circle, Svg} from 'react-native-svg';
import HeadsetIcon from '../../../../images/icons/headset_icon.svg';
import FollowupsIcon from '../../../../images/icons/followups.svg';
import SurveyIcon from '../../../../images/icons/today_survey_icon.svg';
import DeliveredOrdrsIcon from '../../../../images/icons/delivered_orders_icon.svg';
import CustomersIcon from '../../../../images/icons/total_customers_icon.svg';
import NewOrdersIcon from '../../../../images/icons/new_orders.svg';
import {TASK_NAME} from '../../utils';
import {Shadow} from 'react-native-shadow-2';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {HomeStackRoute, TabRoute} from '../../../../utils/constants';

const CIRCLE_LENGTH = 200;
const RADIUS = CIRCLE_LENGTH / (2 * Math.PI);
const BACKGROUND_STROKE_COLOR = COLOR_GRAY2;
const STROKE_COLOR = COLOR_BLUE;
const {width} = Dimensions.get('window');
const cx = (width * 0.28) / 2;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface Props {
  taskName: TASK_NAME;
  count: number;
  navigation: NavigationProp<any, any>;
}

const TaskView: React.FC<Props> = ({taskName, count, navigation}) => {
  const progress = useSharedValue(0);
  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1.9 - progress.value),
  }));

  useEffect(() => {
    progress.value = withTiming(4.5, {duration: 2000});
  }, []);

  const _getTaskNameText = () => {
    let name: string = 'New Enquiries';
    switch (taskName) {
      case TASK_NAME.NEW_ENQUIRIES:
        name = `New\nEnquiries`;
        break;
      case TASK_NAME.TODAY_FOLLOW_UPS:
        name = `Today\nFollow-ups`;
        break;
      case TASK_NAME.TODAY_SURVEY:
        name = `Today\nSruvey`;
        break;
      case TASK_NAME.NEW_ORDERS:
        name = `New\nOrders`;
        break;
      case TASK_NAME.DELIVERED_ORDERS:
        name = `Today\nShiftings`;
        break;
      case TASK_NAME.TOTAL_CUSTOMERS:
        name = `Total\nCustomers`;
        break;
      default:
        break;
    }
    return name;
  };

  const _getTaskIcon = () => {
    switch (taskName) {
      case TASK_NAME.NEW_ENQUIRIES:
        return <HeadsetIcon width={40} height={40} />;
      case TASK_NAME.TODAY_FOLLOW_UPS:
        return <FollowupsIcon width={40} height={40} />;
      case TASK_NAME.TODAY_SURVEY:
        return <SurveyIcon width={40} height={40} />;
      case TASK_NAME.NEW_ORDERS:
        return <NewOrdersIcon width={40} height={40} />;
      case TASK_NAME.DELIVERED_ORDERS:
        return <DeliveredOrdrsIcon width={40} height={40} />;
      case TASK_NAME.TOTAL_CUSTOMERS:
        return <CustomersIcon width={40} height={40} />;
      default:
        return <HeadsetIcon width={40} height={40} />;
    }
  };

  const taskItemClickListener = () => {
    if (taskName == TASK_NAME.TODAY_FOLLOW_UPS) {
      //@ts-ignore
      navigation.navigate(HomeStackRoute.TodayFollowup);
    } else if (taskName == TASK_NAME.TODAY_SURVEY) {
      //@ts-ignore
      navigation.navigate(HomeStackRoute.TodaySurvey);
    } else if (taskName == TASK_NAME.DELIVERED_ORDERS) {
      //@ts-ignore
      navigation.navigate(HomeStackRoute.TodayShiftings);
    } else if (taskName == TASK_NAME.NEW_ORDERS) {
      //@ts-ignore
      navigation.jumpTo(TabRoute.OrderStack, {
        screen: 'OrderRoot',
      });
    } else if (taskName == TASK_NAME.NEW_ENQUIRIES) {
      //@ts-ignore
      navigation.jumpTo(TabRoute.EnquiryStack, {
        screen: 'EnquiryRoot',
      });
    }else if (taskName == TASK_NAME.TOTAL_CUSTOMERS) {
      //@ts-ignore
      navigation.jumpTo(TabRoute.ClientStack, {
        screen: 'ClientRoot',
      });
    }
  };

  return (
    <TouchableOpacity onPress={taskItemClickListener}>
      <Shadow distance={6}>
        <View style={styles.container}>
          <View style={styles.countContainer}>
            <Text style={styles.countText}>{count ?? 0}</Text>
          </View>
          <Svg style={{position: 'absolute'}} fill="none">
            <Circle
              cx={cx}
              cy={cx}
              r={RADIUS}
              stroke={BACKGROUND_STROKE_COLOR}
              strokeWidth={5}
            />
            <AnimatedCircle
              cx={cx}
              cy={cx}
              r={RADIUS}
              stroke={STROKE_COLOR}
              strokeWidth={5}
              strokeDasharray={CIRCLE_LENGTH}
              animatedProps={animatedProps}
              strokeLinecap="round"
            />
          </Svg>
          <View style={styles.iconContainer}>{_getTaskIcon()}</View>
          <View style={styles.taskNameContainer}>
            <Text style={styles.taskNameText}>{_getTaskNameText()}</Text>
          </View>
        </View>
      </Shadow>
    </TouchableOpacity>
  );
};

export default TaskView;
