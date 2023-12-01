import React from 'react';
import {View, ScrollView} from 'react-native';
import Header from '../../common/Header';
import styles from './style';
import Spacer from '../../common/Spacer';
import ClientInfoView from './components/ClientInfoView';
import TaskView from './components/TaskView';
import {FEATURE_TYPE, TASK_NAME} from './utils';
import BannerView from './components/BannerView';
import FeatureView from './components/FeatureView';

const HomePageView = () => {
  return (
    <View style={styles.container}>
      <Header canGoBack={true} showDrawerIcon={true} label="Home" />
      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        <Spacer height={10} />
        <ClientInfoView />
        <Spacer height={20} />
        <View style={styles.taskContainer}>
          <TaskView taskName={TASK_NAME.NEW_ENQUIRIES} count={15} />
          <TaskView taskName={TASK_NAME.TODAY_FOLLOW_UPS} count={35} />
          <TaskView taskName={TASK_NAME.TODAY_SURVEY} count={5} />
          <TaskView taskName={TASK_NAME.NEW_ORDERS} count={10} />
          <TaskView taskName={TASK_NAME.DELIVERED_ORDERS} count={25} />
          <TaskView taskName={TASK_NAME.TOTAL_CUSTOMERS} count={90} />
        </View>
        <Spacer height={5} />
        <BannerView />
        <Spacer height={15} />
        <View style={styles.featureContainer}>
          <FeatureView
            featureName="Branches"
            featureType={FEATURE_TYPE.BRANCHES}
          />
          <FeatureView
            featureName={`Vehicle\nManagement`}
            featureType={FEATURE_TYPE.VEHICLE_MANAGEMENT}
          />
          <FeatureView
            featureName="Franchies"
            featureType={FEATURE_TYPE.FRANCHIES}
          />
        </View>
        <Spacer height={10} />
      </ScrollView>
    </View>
  );
};

export default HomePageView;
