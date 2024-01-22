import React, {useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import Header from '../../common/Header';
import styles from './style';
import Spacer from '../../common/Spacer';
import ClientInfoView from './components/ClientInfoView';
import TaskView from './components/TaskView';
import {FEATURE_TYPE, TASK_NAME} from './utils';
import BannerView from './components/BannerView';
import FeatureView from './components/FeatureView';
import {useNavigation} from '@react-navigation/native';
import {getCurrentCompanyId} from '../../utils/storage';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {getSavedDocumentTemplateIdListRequest} from '../../redux/slices/TemplateSettingSlice';
import {
  getAppSettingsRequest,
  getDashboardDataRequest,
  getFloorsRequest,
  getInsurancePercentagesRequest,
} from '../../redux/slices/CommonSlice';
import {IDashboardData} from '../../interface/common/common';
import { getCompaniesRequest } from '../../redux/slices/CompanySlice';
import useAuthId from '../../hooks/useAuthId';

const HomePageView = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const authId = useAuthId();
  const {getDashboardDataRequesting, dashboard} = useAppSelector(
    state => state.Common,
  );
  const handleFeatureClick = (featureType: FEATURE_TYPE) => {
    if (featureType == FEATURE_TYPE.BRANCHES) {
      //@ts-ignore
      navigation.navigate('Branch Management');
    } else if (featureType == FEATURE_TYPE.VEHICLE_MANAGEMENT) {
      //@ts-ignore
      navigation.navigate('Vehicle Management');
    } else if (featureType == FEATURE_TYPE.FRANCHIES) {
      //@ts-ignore
      navigation.navigate('Franchise Management');
    }
  };

  const _getAppSettingsRequest = () => {
    getCurrentCompanyId()
      .then(id => {
        dispatch(getAppSettingsRequest(id as string));
      })
      .catch(err => console.log(err));
  };

  const _getSavedTemplateId = () => {
    getCurrentCompanyId()
      .then(id => {
        dispatch(getSavedDocumentTemplateIdListRequest(id as string));
      })
      .catch(err => console.log(err));
  };

  const _getTaskCountDataObj = () => {
    let taskCountData: IDashboardData | null = null;
    const {data} = dashboard || {};
    if (data) {
      taskCountData = data as IDashboardData;
    }
    return taskCountData;
  };

  useEffect(() => {
    _getAppSettingsRequest();
    _getSavedTemplateId();
    
    dispatch(getDashboardDataRequest());
    dispatch(getInsurancePercentagesRequest());
    dispatch(getFloorsRequest());
  }, []);

  useEffect(() => {
    if(authId) {
      dispatch(getCompaniesRequest(authId));
    }
  }, [authId]);

  return (
    <View style={styles.container}>
      <Header canGoBack={true} showDrawerIcon={true} label="Home" />
      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        <Spacer height={10} />
        <ClientInfoView />
        <Spacer height={20} />
        <View style={styles.taskContainer}>
          <TaskView
            taskName={TASK_NAME.NEW_ENQUIRIES}
            count={_getTaskCountDataObj()?.newEnquiry as number}
          />
          <TaskView
            taskName={TASK_NAME.TODAY_FOLLOW_UPS}
            count={_getTaskCountDataObj()?.todayFollowup as number}
          />
          <TaskView
            taskName={TASK_NAME.TODAY_SURVEY}
            count={_getTaskCountDataObj()?.todaySurvey as number}
          />
          <TaskView
            taskName={TASK_NAME.NEW_ORDERS}
            count={_getTaskCountDataObj()?.newOrder as number}
          />
          <TaskView
            taskName={TASK_NAME.DELIVERED_ORDERS}
            count={_getTaskCountDataObj()?.deliveredOrder as number}
          />
          <TaskView
            taskName={TASK_NAME.TOTAL_CUSTOMERS}
            count={_getTaskCountDataObj()?.totalCustomer as number}
          />
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
