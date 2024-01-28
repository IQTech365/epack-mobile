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
  assigneeRole: string;
}

const FollowupListItem: React.FC<IFollowupListItemProps> = ({comment, date, enquiryManager, assigneeRole}) => {

  const _getRole = () => {
    let role:string = '';
    if(assigneeRole == 'Enquiry') {
      role = 'Enquiry Manager';
    } else if(assigneeRole == 'Survey') {
      role = 'Surveyor';
    }
    return role;
  }

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
              {_getRole()} - <Text style={styles.nameText}>{enquiryManager ? enquiryManager : 'Admin'}</Text>
            </Text>
          </View>
          <View style={styles.contentContainer}>
            <ClockIcon width={22} height={22} />
            <Spacer width={4} />
            <Text style={styles.contentLabelText}>{formatDate3(date)}</Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.contentLabelText}>
              Comment: <Text style={styles.contentValueText}>{comment}</Text>
            </Text>
          </View>
        </View>
      </View>
      <Spacer height={6} />
    </>
  );
};

export default FollowupListItem;
