import React, { useEffect } from 'react';
import {View, ScrollView} from 'react-native';
import Header from '../../common/Header';
import styles from './style';
import Spacer from '../../common/Spacer';
import ClientInfoView from './components/ClientInfoView';
import TaskView from './components/TaskView';
import {FEATURE_TYPE, TASK_NAME} from './utils';
import BannerView from './components/BannerView';
import FeatureView from './components/FeatureView';
import { useNavigation } from '@react-navigation/native';
import { getCurrentCompanyId } from '../../utils/storage';
import { useAppDispatch } from '../../redux/hooks';
import { getSavedDocumentTemplateIdListRequest } from '../../redux/slices/TemplateSettingSlice';
import { getAppSettingsRequest } from '../../redux/slices/CommonSlice';

const HomePageView = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const handleFeatureClick = (featureType: FEATURE_TYPE) => {
    if(featureType == FEATURE_TYPE.BRANCHES) {
      //@ts-ignore
      navigation.navigate('Branch Management');
    } else if(featureType == FEATURE_TYPE.VEHICLE_MANAGEMENT) {
      //@ts-ignore
      navigation.navigate('Vehicle Management');
    } else if(featureType == FEATURE_TYPE.FRANCHIES) {
      //@ts-ignore
      navigation.navigate('Franchise Management');
    }
  }

  const _getAppSettingsRequest = () => {
    getCurrentCompanyId().then(id => {
      dispatch(getAppSettingsRequest(id as string));
    }).catch(err => console.log(err));
  }

  const _getSavedTemplateId = () => {
    getCurrentCompanyId().then(id => {
      dispatch(getSavedDocumentTemplateIdListRequest(id as string));
    }).catch(err => console.log(err));
  }

  useEffect(() => {
    _getAppSettingsRequest();
    _getSavedTemplateId();
  }, []);

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
        <BannerView />
        <Spacer height={20} />
        <View style={styles.featureContainer}>
          <FeatureView
            featureName="Branches"
            featureType={FEATURE_TYPE.BRANCHES}
            onPress={handleFeatureClick}
          />
          <FeatureView
            featureName={`Vehicle\nManagement`}
            featureType={FEATURE_TYPE.VEHICLE_MANAGEMENT}
            onPress={handleFeatureClick}
          />
          <FeatureView
            featureName="Franchies"
            featureType={FEATURE_TYPE.FRANCHIES}
            onPress={handleFeatureClick}
          />
        </View>
        <Spacer height={10} />
      </ScrollView>
    </View>
  );
};

export default HomePageView;
