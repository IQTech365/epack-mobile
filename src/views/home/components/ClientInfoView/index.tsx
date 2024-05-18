import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
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
import { NavigationProp } from '@react-navigation/native';

interface IProps {
  navigation: NavigationProp<any, any>;
}

const ClientInfoView:React.FC<IProps> = ({navigation}) => {
  const {companies} = useAppSelector(state => state.Company);
  const [company, setCompany] = useState<ICompanyInfoData>();
  const {purchasedSubscriptions} = useAppSelector(state => state.Subscription);

  const _getCompany = () => {
    getCurrentCompanyId()
      .then(id => {
        const {data} = companies || {};
        if (data && Array.isArray(data) && data.length > 0) {
          const _company = data.find((d: ICompanyInfoData) => d._id == id);
          setCompany(_company);
        } else if (data && data.hasOwnProperty('authId')) {
          setCompany(data);
        }
      })
      .catch(err => console.log('storage-err', err));
  };

  const _getCompanyNameOrLogo = () => {
    const {companyLogo, companyName} = company || {};
    if (companyLogo) {
      return (
        <Image
          source={{uri: company?.companyLogo}}
          resizeMode="contain"
          style={styles.logo}
        />
      );
    } else {
      if (!companyName) return null;
      return (
        <View style={styles.logo}>
          <Text style={styles.nameText2}>
            {companyName?.substring(0, 1).toUpperCase()}
          </Text>
        </View>
      );
    }
  };

  const _getCurrentPlanInfo = () => {
    let planName: string = '';
    const {data} = purchasedSubscriptions || {};
    let plan: IPurchasedSubscription | null = null;
    if (data && Array.isArray(data) && data.length > 0) {
      plan = data[0] as IPurchasedSubscription;
      if (_.isObject(plan)) {
        const {subscription} = plan || {};
        if (_?.isArray(subscription) && subscription.length > 0) {
          const firstSubscription: ISubscription = subscription[0];
          if (_.isObject(firstSubscription)) {
            planName = `${plan.subscriptionPlan}-${firstSubscription.subscriptionType}`;
          }
        }
      }
    }
    return planName;
  };

  useEffect(() => {
    _getCompany();
  }, [companies]);

  return (
    <Shadow style={styles.cardWrapper} distance={6}>
      <View style={styles.clientInfoContainer}>
        <View style={styles.clientLogoContainer}>
          <View style={styles.logoContainer}>{_getCompanyNameOrLogo()}</View>
        </View>
        <View style={styles.clientDetailContainer}>
          <Text style={styles.nameText}>{company?.companyName}</Text>
          <Text style={styles.labelText}>
            Customer ID:
            <Text
              style={styles.valueText}
              numberOfLines={1}>{` #${company?.sn}`}</Text>
          </Text>
          {_getCurrentPlanInfo() ? (
            <View style={styles.planContainer}>
              <Text style={styles.labelText}>Plan:</Text>
              <LinearGradient
                colors={['#051937', '#004d7a', '#008793', '#00bf72', '#a8eb12']}
                style={styles.planNameContainer}
                useAngle={true}
                angle={45}>
                <Text style={styles.planText}>
                  {_getCurrentPlanInfo().toUpperCase()}
                </Text>
              </LinearGradient>
            </View>
          ) : (
            <View style={styles.planContainer}>
              <LinearGradient
                colors={['#000000', '#4d4855']}
                style={styles.planNameContainer}
                useAngle={true}
                angle={45}>
                <Text style={styles.planText}>FREE MEMBER</Text>
              </LinearGradient>
              <TouchableOpacity onPress={() => {
                navigation.navigate('Subscription');
              }}>
                <LinearGradient
                  colors={[
                    '#051937',
                    '#004d7a',
                    '#008793',
                    '#00bf72',
                    '#a8eb12',
                  ]}
                  style={styles.buyNowContainer}
                  useAngle={true}
                  angle={45}>
                  <Text style={styles.planText}>BUY NOW</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Shadow>
  );
};

export default ClientInfoView;
