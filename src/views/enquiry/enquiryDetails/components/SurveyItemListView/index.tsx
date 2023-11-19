import React from 'react';
import {View, Text} from 'react-native';
import Spacer from '../../../../../common/Spacer';
import styles from './style';
import ClockIcon from '../../../../../images/icons/clock.svg';
import UserIcon from '../../../../../images/icons/user.svg';
import { formatDate3 } from '../../../../../utils/formatter';

interface ISurveyItemListViewProps {
 item:any
}

const SurveyItemListView: React.FC<ISurveyItemListViewProps> = ({item}) => {
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
            <Text  style={styles.contentLabelText}>Survey Date: </Text>
            <ClockIcon width={22} height={22} />
            <Spacer width={4} />
            <Text style={styles.contentLabelText}>{formatDate3(item.surveyDate)}</Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.contentLabelText}>
            Item Name: {item.itemName}
            </Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.contentLabelText}>
            Quantity: {item.quantity}
            </Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.contentLabelText}>
            Survey List No: {item.surveyListNo}
            </Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.contentLabelText}>
            Value Of Goods: {item.valueOfGoods}
            </Text>
          </View>
        </View>
      </View>
      <Spacer height={6} />
    </>
  );
};

export default SurveyItemListView;
