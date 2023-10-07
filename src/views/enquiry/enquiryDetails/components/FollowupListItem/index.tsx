import React from 'react';
import {View, Text} from 'react-native';
import Spacer from '../../../../../common/Spacer';
import styles from './style';
import ClockIcon from '../../../../../images/icons/clock.svg';
import UserIcon from '../../../../../images/icons/user.svg';
import { formatDate3 } from '../../../../../utils/formatter';

interface IFollowupListItemProps {
  comment: string;
  date: Date;
  enquiryManager: string;
}

const FollowupListItem: React.FC<IFollowupListItemProps> = ({comment, date, enquiryManager}) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <UserIcon width={22} height={22} />
          </View>
        </View>
        <View style={styles.rightContentContainer}>
          <View style={styles.contentContainer}>
            <Text style={styles.contentLabelText}>
              Enquiry Manager - <Text style={styles.nameText}>Ramesh</Text>
            </Text>
          </View>
          <View style={styles.contentContainer}>
            <ClockIcon width={22} height={22} />
            <Spacer width={4} />
            <Text style={styles.contentLabelText}>{formatDate3(date)}</Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.contentLabelText}>
              Comment: {comment}
            </Text>
          </View>
        </View>
      </View>
      <Spacer height={6} />
    </>
  );
};

export default FollowupListItem;
