import React, {useEffect, useState} from 'react';
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
import {getSavedDocumentTemplateIdListRequest, getTemplateListRequest, saveDocumentTemplateIdRequest} from '../../redux/slices/TemplateSettingSlice';
import {
  getAppSettingsRequest,
  getDashboardDataRequest,
  getFloorsRequest,
  getInsurancePercentagesRequest,
  getSubmoduleRequest,
} from '../../redux/slices/CommonSlice';
import {IDashboardData, IDashboardPaylod, ISubmodule} from '../../interface/common/common';
import { getCompaniesRequest } from '../../redux/slices/CompanySlice';
import useAuthId from '../../hooks/useAuthId';
import { IGetPurchasedSubscriptionParams } from '../../interface/subscription/subscription';
import { getPurchasedSubscriptionRequest } from '../../redux/slices/SubscriptionSlice';
import { EventRegister } from 'react-native-event-listeners';
import { ISaveDocumentTemplateIdPayload, ITemplate, ITemplateData } from '../../interface/setting/template/template';

const HomePageView = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const authId = useAuthId();
  const {dashboard, submodules} = useAppSelector(state => state.Common);
  const {templates} = useAppSelector(state => state.Template);
  const [initDefaultTemplates, setInitDefaultTemplates] = useState<boolean>(true);

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

  const _getPurchasedSubscription = () => {
    getCurrentCompanyId().then(id => {
      const payload: IGetPurchasedSubscriptionParams = {
        authId: authId,
        companyId: id as string,
      };
      dispatch(getPurchasedSubscriptionRequest(payload));
    }).catch(err => console.log('storage-fetch-error--', err));
  }

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

  const _getDashboardData = () => {
    getCurrentCompanyId().then(id => {
      const payload:IDashboardPaylod = {
        companyId: id as string,
      }
      dispatch(getDashboardDataRequest(payload));
    }).catch(err => console.log('local-storage-error', err));
    
  }

  const _getSubmodules = (): ISubmodule[] => {
    let items: ISubmodule[] = [];
    const {data} = submodules || {};
    if (data && Array.isArray(data) && data.length > 0) {
      items = data;
    }
    return items.filter((d:ISubmodule) => d.availableOnDocument);
  };

  const _getTemplatesByModuleId = (moduleId:string) => {
    let list: ITemplate[] = [];
    const {data} = templates || {};
    if (data && Array.isArray(data) && data.length > 0) {
      const item: ITemplateData = data.find(
        (d: ITemplateData) => d._id == moduleId
      );
      if (item) {
        list = item.rows;
      }
    }
    return list;
  };

  const _setTemplateId = async (template:ITemplate) => {
    const companyId = await getCurrentCompanyId();
    if(companyId && template) {
      const payload:ISaveDocumentTemplateIdPayload = {
        params: {
          templateId: template._id,
        },
        payload: {
          companyId: companyId,
          moduleId: template.moduleId,
        }
      }
      dispatch(saveDocumentTemplateIdRequest(payload));
    }
  }

  const _setDocumentDefaultTemplateId = async () => {
    const docSubmodules:ISubmodule[] = _getSubmodules();
    if(docSubmodules && docSubmodules.length > 0) {
      docSubmodules.forEach((sm:ISubmodule) => {
        const docTemplates:ITemplate[] = _getTemplatesByModuleId(sm._id);
        if(docTemplates && docTemplates.length > 0) {
          const firstTemplate:ITemplate = docTemplates[0];
          _setTemplateId(firstTemplate);
        }
      });
      setInitDefaultTemplates(false);
    }
  }
  
  useEffect(() => {
    EventRegister.addEventListener('onUpdateEvent', () => {
      _getDashboardData();
    });
  }, []);

  useEffect(() => {
    _getAppSettingsRequest();
    _getSavedTemplateId();
    _getDashboardData();
    dispatch(getInsurancePercentagesRequest());
    dispatch(getFloorsRequest());
    _getPurchasedSubscription();
    dispatch(getSubmoduleRequest());
    dispatch(getTemplateListRequest());
  }, []);

  useEffect(() => {
    if(authId) {
      dispatch(getCompaniesRequest(authId));
    }
  }, [authId]);

  useEffect(()=> {
    if(initDefaultTemplates && templates && submodules) {
      _setDocumentDefaultTemplateId();
    }
  }, [templates, submodules]);

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
