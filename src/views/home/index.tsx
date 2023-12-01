import React from 'react';
import {View} from 'react-native';
import Header from '../../common/Header';
import styles from './style';
import Spacer from '../../common/Spacer';
import ClientInfoView from './components/ClientInfoView';
import TaskView from './components/TaskView';
import {TASK_NAME} from './utils';

const HomePageView = () => {
  return (
    <View style={styles.container}>
      <Header canGoBack={true} showDrawerIcon={true} label="Home" />
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
    </View>
  );
};

export default HomePageView;
