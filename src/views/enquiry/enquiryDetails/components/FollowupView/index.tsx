import React, {useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import Spinner from '../../../../../common/Spinner';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import {getFollowupsRequest, getSurveyListRequest} from '../../../../../redux/slices/EnquirySlice';
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

  const listData = taskName == 'FOLLOW UP' ? data : surveyData;

  return (
    <View style={styles.container}>
      {getFollowupsRequesting ? (
        <Spinner show={getFollowupsRequesting || getSurveyListRequesting} />
      ) : (
        <FlatList
          //@ts-ignore
          data={listData}
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
            />
          }
        />
      )}
    </View>
  );
};

export default FollowupView;
