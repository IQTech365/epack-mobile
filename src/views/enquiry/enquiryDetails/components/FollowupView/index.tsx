import React from 'react';
import {View, Text, FlatList} from 'react-native';
import FollowupListHeaderComponent from '../FollowupListHeaderComponent';
import FollowupListItem from '../FollowupListItem';
import styles from './style';

interface IFollowupViewProps {}

const FollowupView: React.FC<IFollowupViewProps> = ({}) => {
  const comments = [1, 2, 3];

  return (
    <View style={styles.container}>
      <FlatList
        data={comments}
        renderItem={({item, index}) => <FollowupListItem />}
        ListHeaderComponent={<FollowupListHeaderComponent />}
      />
    </View>
  );
};

export default FollowupView;
