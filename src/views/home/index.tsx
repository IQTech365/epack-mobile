import React, {FC, useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import Header from '../../common/Header';
import styles from './style';
import Spacer from '../../common/Spacer';
import ClientInfoView from './components/ClientInfoView';
import TaskView from './components/TaskView';
import {FEATURE_TYPE, TASK_NAME} from './utils';
import BannerView from './components/BannerView';
import FeatureView from './components/FeatureView';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {getCurrentCompanyId, isIntroVideoWatched, setIntroVideoWatched} from '../../utils/storage';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {getSavedDocumentTemplateIdListRequest, getTemplateListRequest, resetSaveDocumentTemplateIdRequest, saveDocumentTemplateIdRequest} from '../../redux/slices/TemplateSettingSlice';
import {
  getAppSettingsRequest,
  getDashboardDataRequest,
  getFloorsRequest,
  getImportantLinksRequest,
  getInsurancePercentagesRequest,
  getSubmoduleRequest,
} from '../../redux/slices/CommonSlice';
import {IDashboardData, IDashboardPaylod, ISubmodule} from '../../interface/common/common';
import { getCompaniesRequest } from '../../redux/slices/CompanySlice';
import useAuthId from '../../hooks/useAuthId';
import { IGetPurchasedSubscriptionParams } from '../../interface/subscription/subscription';
import { getPurchasedSubscriptionRequest } from '../../redux/slices/SubscriptionSlice';
import { EventRegister } from 'react-native-event-listeners';
import { ISaveDocumentTemplateIdPayload, ISavedDocumentTemplateId, ITemplate, ITemplateData } from '../../interface/setting/template/template';
import IntroVideoModal from '../../common/IntroVideoModal';
import UpcomingEventView from './components/UpcomingEventView';

interface IProps {
  navigation: NavigationProp<any, any>;
}

const HomePageView:FC<IProps> = ({navigation}) => {
  // const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const authId = useAuthId();
  const {dashboard, submodules} = useAppSelector(state => state.Common);
  const {templates, savedDocumentTemplateIds, saveDocTemplateIdRequesting, saveDocTemplateIdSuccess, saveDocTemplateIdFailure} = useAppSelector(state => state.Template);
  const [initDefaultTemplates, setInitDefaultTemplates] = useState<boolean>(true);
  const [showIntroVideoModal, setShowIntroVideoModal] = useState<boolean>(false);

  const closeIntroVideoModal = async () => {
    setShowIntroVideoModal(false);
    await setIntroVideoWatched();
  }

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

  const _getPreviousSavedTemplateIdBySubModuleId = (id:string):ITemplate|null => {
    let template:ITemplate|null = null;
    const {data} = savedDocumentTemplateIds || {};
    if(data && Array.isArray(data) && data.length > 0) {
      const savedTemplate:ISavedDocumentTemplateId = data.find((d:ISavedDocumentTemplateId) => d.moduleId == id);
      if(savedTemplate) {
        template = savedTemplate.template;
      }
    }
    return template;
  }

  const _setDocumentDefaultTemplateId = async () => {
    const docSubmodules:ISubmodule[] = _getSubmodules();
    if(docSubmodules && docSubmodules.length > 0) {
      docSubmodules.forEach((sm:ISubmodule) => {
        const previousTemplate:ITemplate|null = _getPreviousSavedTemplateIdBySubModuleId(sm._id);
        if(previousTemplate !== null) {
          _setTemplateId(previousTemplate);
        } else {
          const docTemplates:ITemplate[] = _getTemplatesByModuleId(sm._id);
          if(docTemplates && docTemplates.length > 0) {
            const firstTemplate:ITemplate = docTemplates[0];
            _setTemplateId(firstTemplate);
          }
        }
      });
      setInitDefaultTemplates(false);
    }
  }

  const checkIntroVideoWatchStatus = async () => {
    const watched = await isIntroVideoWatched();
    if(watched === 'true') {
      setShowIntroVideoModal(false);
    } else {
      setShowIntroVideoModal(true);
    }
  }
  
  useEffect(() => {
    EventRegister.addEventListener('onUpdateEvent', () => {
      _getDashboardData();
    });
    EventRegister.addEventListener('onUpdateSubscription', () => {
      _getPurchasedSubscription();
    });
    checkIntroVideoWatchStatus();
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
    dispatch(getImportantLinksRequest());
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

  useEffect(() => {
    if(!saveDocTemplateIdRequesting && saveDocTemplateIdSuccess) {
      dispatch(resetSaveDocumentTemplateIdRequest());
      _getSavedTemplateId();
    } else if(!saveDocTemplateIdRequesting && saveDocTemplateIdFailure) {
      dispatch(resetSaveDocumentTemplateIdRequest());
    }
  }, [saveDocTemplateIdRequesting, saveDocTemplateIdSuccess, saveDocTemplateIdFailure]);

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
            navigation={navigation}
          />
          <TaskView
            taskName={TASK_NAME.TODAY_FOLLOW_UPS}
            count={_getTaskCountDataObj()?.todayfollowup as number}
            navigation={navigation}
          />
          <TaskView
            taskName={TASK_NAME.TODAY_SURVEY}
            count={_getTaskCountDataObj()?.todaySurvey as number}
            navigation={navigation}
          />
          <TaskView
            taskName={TASK_NAME.NEW_ORDERS}
            count={_getTaskCountDataObj()?.newOrder as number}
            navigation={navigation}
          />
          <TaskView
            taskName={TASK_NAME.DELIVERED_ORDERS}
            count={_getTaskCountDataObj()?.todayShifting as number}
            navigation={navigation}
          />
          <TaskView
            taskName={TASK_NAME.TOTAL_CUSTOMERS}
            count={_getTaskCountDataObj()?.totalCustomer as number}
            navigation={navigation}
          />
        </View>
        <BannerView />
        <Spacer height={20} />
        <UpcomingEventView />
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
        <IntroVideoModal visible={showIntroVideoModal} onClose={closeIntroVideoModal} />
        <Spacer height={10} />
      </ScrollView>
    </View>
  );
};

export default HomePageView;
