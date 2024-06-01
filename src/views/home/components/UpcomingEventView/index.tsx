import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, Linking} from 'react-native';
import styles from './style';
import {Shadow} from 'react-native-shadow-2';
import {useAppSelector} from '../../../../redux/hooks';
import {ICompanyInfoData} from '../../../../interface/companyRegistration/IGetCompaniesResponse';
import {getCurrentCompanyId} from '../../../../utils/storage';
import {
  IPurchasedSubscription,
  ISubscription,
} from '../../../../interface/subscription/subscription';
import LinearGradient from 'react-native-linear-gradient';
import _ from 'underscore';
import {IImportantLink} from '../../../../interface/common/common';
import GMeetIcon from '../../../../images/icons/gmeet_icon.svg';

const UpcomingEventView = () => {
  const {companies} = useAppSelector(state => state.Company);
  const {importantLinks} = useAppSelector(state => state.Common);
  const [company, setCompany] = useState<ICompanyInfoData>();
  const {purchasedSubscriptions} = useAppSelector(state => state.Subscription);

  const _getEventData = () => {
    let link: IImportantLink | undefined;
    if (_?.isObject(importantLinks)) {
      if (_?.isArray(importantLinks?.data)) {
        link = importantLinks?.data.find(
          (l: IImportantLink) =>
            l.webinarUrl !== '' &&
            l.webinarUrl !== null &&
            l.webinarUrl !== undefined,
        );
      }
    }
    return link;
  };

  const _getEventTitle = () => {
    let eventTitle: string = 'No Event Found';
    const link = _getEventData();
    if (link) {
      eventTitle = link.title;
    }
    return eventTitle;
  };

  return (
    <Shadow style={styles.cardWrapper} distance={6}>
      <TouchableOpacity
        style={styles.clientInfoContainer}
        onPress={() => {
          const link = _getEventData();
          if (link) {
            Linking.openURL(link.webinarUrl);
          }
        }}>
        <View style={styles.clientLogoContainer}>
          <GMeetIcon />
        </View>
        <View style={styles.clientDetailContainer}>
          <Text style={styles.nameText}>Important Notice</Text>
          <Text style={styles.valueText} numberOfLines={1}>
            {_getEventTitle()}
          </Text>
        </View>
      </TouchableOpacity>
    </Shadow>
  );
};

export default UpcomingEventView;
