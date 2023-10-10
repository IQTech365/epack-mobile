import React, {useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import Spinner from '../../../../../common/Spinner';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import {getFollowupsRequest, getSurveyListRequest} from '../../../../../redux/slices/EnquirySlice';
import { formatDate, formatDate3 } from '../../../../../utils/formatter';
import FollowupListHeaderComponent from '../FollowupListHeaderComponent';
import FollowupListItem from '../FollowupListItem';
import styles from './style';
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
  const {followups, getFollowupsRequesting} = useAppSelector(state => state.Enquiry,);
  const {data} = followups || {};
  const {surveyList, getSurveyListRequesting} = useAppSelector(state => state.Enquiry);
  const {data: surveyData} = surveyList || {};

  useEffect(() => {
    if(taskName == 'FOLLOW UP') {
      dispatch(getFollowupsRequest(enquiryId));
    } else if(taskName == 'SURVEY') {
      dispatch(getSurveyListRequest(enquiryId));
    }
  }, [taskName]);

  const getDataSet = () => {
    let listData = [];
    if(taskName == 'FOLLOW UP' && data && Array.isArray(data) && data.length > 0) {
      listData = data;
    } else if(taskName == 'SURVEY' && surveyData && Array.isArray(surveyData) && surveyData.length > 0) {
      listData = surveyData;
    }
    return [...listData].reverse();
  }

  const listData = taskName == 'FOLLOW UP' ? data : surveyData;

  const getNextFollowupOrSurveyDate = () => {
    let date = 'NA';
    if(getDataSet().length > 0) {
      const firstItem = getDataSet()[0];
      if(taskName == 'FOLLOW UP') {
        date = formatDate3(firstItem.followUpDate)
      } else if(taskName == 'FOLLOW UP') {
        date = formatDate3(firstItem.surveyDate)
      }
    }
    return date;
  }

  return (
    <View style={styles.container}>
      {getFollowupsRequesting ? (
        <Spinner show={getFollowupsRequesting || getSurveyListRequesting} />
      ) : (
        <View style={styles.listWrapper}>
          <FlatList
          //@ts-ignore
          data={getDataSet()}
          renderItem={({item, index}) => (
            <FollowupListItem
              comment={item?.comment}
              date={new Date(item?.followUpDate || item?.surveyDate)}
              enquiryManager=""
            />
          )}
          ListEmptyComponent={() => (
            <View style={styles.emptyView}>
              <Text>{taskName == 'FOLLOW UP' ? 'No Followups found!' : 'No Survey found!'}</Text>
            </View>
          )}
          ListHeaderComponent={
            <FollowupListHeaderComponent
              taskName={taskName}
              assigneeRole={assigneeRole}
              enquiryId={enquiryId}
              nextFollowupOrSurveyDate={getNextFollowupOrSurveyDate()}
            />
          }
        />
        </View>
      )}
    </View>
  );
};

export default FollowupView;
