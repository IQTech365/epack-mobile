import React from 'react';
import {View, Text, FlatList} from 'react-native';
import FollowupListHeaderComponent from '../FollowupListHeaderComponent';
import FollowupListItem from '../FollowupListItem';
import styles from './style';

interface IFollowupViewProps {
  taskName: string;
  assigneeRole: string;
}

const FollowupView: React.FC<IFollowupViewProps> = ({taskName, assigneeRole}) => {
  const comments = [1, 2, 3];

  return (
    <View style={styles.container}>
      <FlatList
        data={comments}
        renderItem={({item, index}) => <FollowupListItem />}
        ListHeaderComponent={<FollowupListHeaderComponent taskName={taskName} assigneeRole={assigneeRole} />}
      />
    </View>
  );
};

export default FollowupView;
