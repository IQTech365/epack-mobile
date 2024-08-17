import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import Spinner from '../../../../../common/Spinner';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import {
  getFollowupsRequest,
  getSurveyItemListRequest,
  getSurveyListRequest,
  getSurveyListTemplateRequest,
  resetGetSurveyListTemplateRequest,
} from '../../../../../redux/slices/EnquirySlice';
import {formatDate3} from '../../../../../utils/formatter';
import FollowupListHeaderComponent from '../FollowupListHeaderComponent';
import FollowupListItem from '../FollowupListItem';
import styles from './style';
import SurveyItemListView from '../SurveyItemListView';
import Button from '../../../../../common/Button';
import Spacer from '../../../../../common/Spacer';
import { getCurrentCompanyId } from '../../../../../utils/storage';
import { IGetSurvyeItemListRequestPayload } from '../../../../../interface/enquiry/IGetSurveyItemListResponse';
import { ISurveyListTemlatePayload } from '../../../../../interface/enquiry/enquiry';
import TemplateViewer from '../../../../../common/TemplateViewer';
import ModalHOC from '../../../../../common/ModalHOC';
import useTemplateIdHook from '../../../../../hooks/useTemplateIdHook';
import { ToastType, showToast, startShare } from '../../../../../utils/utility';
interface IFollowupViewProps {
  taskName: string;
  assigneeRole: string;
  enquiryId: string;
  isOrder:boolean;
}

const FollowupView: React.FC<IFollowupViewProps> = ({
  taskName,
  assigneeRole,
  enquiryId,
  isOrder = false,
}) => {
  const dispatch = useAppDispatch();
  const {
    followups,
    getFollowupsRequesting,
    surveyItemList,
    getSurveyListTemplateRequesting,
    getSurveyListTemplateSuccess,
    getSurveyListTemplateFailure,
    surveyListTemplate,
  } = useAppSelector(state => state.Enquiry);
  const {data} = followups || {};
  const {data: surveyItemData} = surveyItemList || {};
  
  const {surveyList, getSurveyListRequesting} = useAppSelector(
    state => state.Enquiry,
  );
  const {data: surveyData} = surveyList || {};
  const [taskData, setTaskData] = useState<string>(!isOrder ? '' : 'SURVEY ITEM');
  const [showTemplate, setShowTemplate] = useState<boolean>(false);
  const [shouldShare, setShouldShare] = useState<boolean>(false);
  const templateId = useTemplateIdHook('658d3d2f585e3dde644da9b2');
  // const templateId = "65d48f14ad0f8972472d49ca";
  const _getSurveyItemListRequest = () => {
    getCurrentCompanyId().then(id => {
      const payload :IGetSurvyeItemListRequestPayload= {
        enquiryId:enquiryId,
        // id: id as string,
      }
      dispatch(getSurveyItemListRequest(payload));
    }).catch(err => console.log(err));
  }

  useEffect(() => {
    if (taskName == 'FOLLOW UP') {
      dispatch(getFollowupsRequest(enquiryId));
    } else if (taskName == 'SURVEY') {
      dispatch(getSurveyListRequest(enquiryId));
    }
    if (taskData == 'SURVEY ITEM') {
      _getSurveyItemListRequest();
    }
  }, [taskName, taskData]);

  const taskNameCallback = (event: string) => {
    setTaskData(event);
  };

  const getDataSet = () => {
    let listData = [];
    if (
      taskName == 'FOLLOW UP' &&
      data &&
      Array.isArray(data) &&
      data.length > 0
    ) {
      listData = data;
    } else if (
      taskName == 'SURVEY' &&
      taskData == '' &&
      surveyData &&
      Array.isArray(surveyData) &&
      surveyData.length > 0
    ) {
      listData = surveyData;
    } else if (
      taskData == 'SURVEY ITEM' &&
      surveyItemData &&
      Array.isArray(surveyItemData) &&
      surveyItemData.length > 0
    ) {
      listData = surveyItemData;
    }
    console.log('listData-----', JSON.stringify(listData));
    return [...listData].reverse();
  };

  const getNextFollowupOrSurveyDate = () => {
    let date = 'NA';
    if (getDataSet().length > 0) {
      const firstItem = getDataSet()[0];
      if (taskName == 'FOLLOW UP') {
        date = formatDate3(firstItem.followUpDate);
      } else if (taskName == 'SURVEY') {
        date = formatDate3(firstItem.surveyDate);
      }
    }
    return date;
  };

  const _showSurveyListItemTemplate = (surveyListId:string) => {
    setShouldShare(false);
    if(templateId) {
      getCurrentCompanyId().then(id => {
        const payload:ISurveyListTemlatePayload = {
          companyId: id as string,
          surveyListId: surveyListId,
          templateId: templateId,
          enquiryId: enquiryId,
        }
        dispatch(getSurveyListTemplateRequest(payload));
      }).catch(err => console.log('error getting company id from storage'));
    } else {
      showToast("Template Not Selected!", ToastType.ERROR);
    }
  }

  const _shareSurveyList = (surveyListId:string) => {
    if(templateId) {
      setShouldShare(true);
      getCurrentCompanyId().then(id => {
        const payload:ISurveyListTemlatePayload = {
          companyId: id as string,
          surveyListId: surveyListId,
          templateId: templateId,
          enquiryId: enquiryId,
        }
        dispatch(getSurveyListTemplateRequest(payload));
      }).catch(err => console.log('error getting company id from storage'));
    } else {
      showToast("Template Not Selected!", ToastType.ERROR);
    }
  }

  const _hanldeCloseShowPreviewModal = () => {
    dispatch(resetGetSurveyListTemplateRequest());
    setShowTemplate(false);
    setShouldShare(false);
  }

  useEffect(() => {
    if(!getSurveyListTemplateRequesting && getSurveyListTemplateSuccess) {
      if(shouldShare) {
        startShare(
          surveyListTemplate,
          'SurveyList',
          dispatch(resetGetSurveyListTemplateRequest()),
        );
      } else {
        setShowTemplate(true);
      }
    } else if(!getSurveyListTemplateRequesting && getSurveyListTemplateFailure) {
      setShowTemplate(false);
      dispatch(resetGetSurveyListTemplateRequest());
    }
  }, [getSurveyListTemplateRequesting, getSurveyListTemplateSuccess, getSurveyListTemplateFailure]);

  return (
    <View style={styles.container}>
      {getFollowupsRequesting ? (
        <Spinner show={getFollowupsRequesting || getSurveyListRequesting} />
      ) : (
        <View style={styles.listWrapper}>
          <FlatList
            //@ts-ignore
            data={getDataSet()}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) =>
              taskData == 'SURVEY ITEM' ? (
                <SurveyItemListView
                  item={item}
                  index={index}
                  enquiryId={enquiryId}
                  onShowPreview={_showSurveyListItemTemplate}
                  onShare={_shareSurveyList}
                  isOrder={isOrder}
                />
              ) : (
                <FollowupListItem
                  comment={item?.comment}
                  date={new Date(item?.followUpDate || item?.surveyDate)}
                  enquiryManager=""
                  assigneeRole={assigneeRole}
                />
              )
            }
            ListEmptyComponent={() => (
              <View style={styles.emptyView}>
                <Text style={styles.label}>
                  {taskName == 'FOLLOW UP'
                    ? 'No Followups found!'
                    : taskData == 'SURVEY ITEM'
                    ? 'No Survey List Items found!'
                    : 'No Survey found!'}
                </Text>
              </View>
            )}
            ListHeaderComponent={
             !isOrder ? <FollowupListHeaderComponent
                taskName={taskName}
                assigneeRole={assigneeRole}
                enquiryId={enquiryId}
                nextFollowupOrSurveyDate={getNextFollowupOrSurveyDate()}
                taskNameCallback={taskNameCallback}
                isOrder={isOrder}
              />
            : null}
            extraData={getDataSet()}
          />
        </View>
      )}
      <Spinner show={getSurveyListTemplateRequesting} />
      <ModalHOC
        visible={showTemplate}
        onClose={_hanldeCloseShowPreviewModal}
        modalStyle={styles.modalStyle}
        headerStyle={styles.headerStyle}
        title="Preview">
        <View style={{flex: 1}}>
          <TemplateViewer html={surveyListTemplate} />
        </View>
      </ModalHOC>
    </View>
  );
};

export default FollowupView;
