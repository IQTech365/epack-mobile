import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import Spinner from '../../../../../common/Spinner';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import {
  getFollowupsRequest,
  getSurveyItemListRequest,
  getSurveyListRequest,
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
interface IFollowupViewProps {
  taskName: string;
  assigneeRole: string;
  enquiryId: string;
}

const FollowupView: React.FC<IFollowupViewProps> = ({
  taskName,
  assigneeRole,
  enquiryId,
}) => {
  const dispatch = useAppDispatch();
  const {followups, getFollowupsRequesting, surveyItemList} = useAppSelector(
    state => state.Enquiry,
  );
  const {data} = followups || {};
  const {data: surveyItemData} = surveyItemList || {};
  const {surveyList, getSurveyListRequesting} = useAppSelector(
    state => state.Enquiry,
  );
  const {data: surveyData} = surveyList || {};
  const [taskData, setTaskData] = useState<string>('');

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
                <SurveyItemListView item={item} index={index} enquiryId={enquiryId} />
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
              <FollowupListHeaderComponent
                taskName={taskName}
                assigneeRole={assigneeRole}
                enquiryId={enquiryId}
                nextFollowupOrSurveyDate={getNextFollowupOrSurveyDate()}
                taskNameCallback={taskNameCallback}
              />
            }
          />
        </View>
      )}
    </View>
  );
};

export default FollowupView;
