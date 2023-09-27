import React, {useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import Spinner from '../../../../../common/Spinner';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import {getFollowupsRequest} from '../../../../../redux/slices/EnquirySlice';
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
  const {followups, getFollowupsRequesting} = useAppSelector(
    state => state.Enquiry,
  );
  const {data} = followups || {};

  useEffect(() => {
    dispatch(getFollowupsRequest(enquiryId));
  }, []);

  return (
    <View style={styles.container}>
      {getFollowupsRequesting ? (
        <Spinner show={getFollowupsRequesting} />
      ) : (
        <FlatList
          //@ts-ignore
          data={data}
          renderItem={({item, index}) => (
            <FollowupListItem
              comment={item?.comment}
              date={new Date(item?.followUpDate)}
              enquiryManager=""
            />
          )}
          ListEmptyComponent={() => (
            <View style={styles.emptyView}>
              <Text>No Followups found!</Text>
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
