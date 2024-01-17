import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import {
  COLOR_BLUE,
  COLOR_BLUE2,
  COLOR_GRAY,
  COLOR_GRAY2,
  COLOR_WHITE,
} from '../utils/colors';
import HeaderGridBackgroundImage from '../images/header-grid.png';
import Spacer from '../common/Spacer';
import HomeIcon from '../images/icons/home2.svg';
import ProfileIcon from '../images/icons/user3.svg';
import HelpIcon from '../images/icons/help-black.svg';
import SettingsIcon from '../images/icons/settings.svg';
import SubscriptionIcon from '../images/icons/subscription.svg';
import NewsRoomIcon from '../images/icons/newsroom.svg';
import BranchesIcon from '../images/icons/branches_black_icon.svg';
import VehicleMgmtIcon from '../images/icons/vehicle_mgmt_black_icon.svg';
import FranchiseMgmtIcon from '../images/icons/franchise_mgmt_black_icon.svg';
import LogoutIcon from '../images/icons/logout.svg';
import SubscriptionView from '../views/subscription';
import HelpCenterView from '../views/helpCenter';
import NewsRoomView from '../views/newsRoom';
import SettingStackNavigator from './SettingStackNavigator';
import MyProfileStackNavigator from './MyProfileStackNavigator';
import {logout} from '../redux/slices/OtpSlice';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {useAuthContext} from '../provider/AuthProvider';
import VehicleMangementStacknavigator from './VehicleMangementStacknavigator';
import SubscriptionPlanView from '../views/subscriptionPlan';
import PaymentMethodView from '../views/paymentMethod';
import {getCompaniesRequest} from '../redux/slices/CompanySlice';
import {ICompanyInfoData} from '../interface/companyRegistration/IGetCompaniesResponse';
import AddFranchiseView from '../views/profile/components/addFranchiseDetail';
import AddBranchView from '../views/profile/components/addBranchDetail';
import { getCurrentCompanyId } from '../utils/storage';

const Drawer = createDrawerNavigator();

const DrawerContent = (props: any) => {
  const dispatch = useAppDispatch();
  const authContext = useAuthContext();
  const {setLoggedIn} = authContext;
  const {companies} = useAppSelector(state => state.Company);
  const {data: companiesData} = companies || {};
  const {otpData} = useAppSelector(state => state.OTP);
  const [company, setCompany] = useState<ICompanyInfoData>();

  const getCompany = () => {
    getCurrentCompanyId().then(id => {
      if (
        companiesData &&
        Array.isArray(companiesData) &&
        companiesData.length > 0
      ) {
        const _company = companiesData.find((d:ICompanyInfoData) => d._id == id);
        setCompany(_company);
      } else if (companiesData && companiesData.hasOwnProperty('authId')) {
        setCompany(companiesData);
      }
    }).catch(err => console.log('storage-err', err));
  };

  const handleLogout = () => {
    setLoggedIn(false);
    dispatch(logout());
  };
  useEffect(() => {
    if (otpData) {
      const {data = {}} = otpData || {};
      dispatch(getCompaniesRequest(data?.id as string));
    }
  }, [dispatch]);

  useEffect(() => {
    if(companies) {
      getCompany();
    }
  }, [companies]);

  const _getCompanyNameOrLogo = () => {
    const {companyLogo, companyName} = company || {};
    if (companyLogo) {
      return (
        <Image
          source={{uri: companyLogo}}
          resizeMode="contain"
          style={styles.avatar}
        />
      );
    } else {
      if (!companyName) return null;
      return (
        <View style={styles.avatar}>
          <Text style={styles.nameText2}>
            {companyName?.substring(0, 1).toUpperCase()}
          </Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container2}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: COLOR_BLUE}}>
        <ImageBackground
          imageStyle={styles.container}
          source={HeaderGridBackgroundImage}>
          <View style={styles.innerContainer}>
            <View style={styles.avatarContainer}>
              {_getCompanyNameOrLogo()}
            </View>
            <Text style={styles.nameText}>{company?.companyName}</Text>
            <Text style={styles.text}>{`User ID: ${company?._id}`}</Text>
            <Text
              style={
                styles.text
              }>{`Mobile: ${company?.companyMobile}`}</Text>
            <Text style={styles.text}>{`Email: ${company?.email}`}</Text>
            <Spacer height={8} />
          </View>
        </ImageBackground>
        <View style={{backgroundColor: '#ffffff'}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottomContainer}>
        <LogoutIcon width={24} height={24} />
        <TouchableOpacity activeOpacity={0.6} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: 'WorkSans-SemiBold',
          color: COLOR_GRAY,
        },
      }}>
      <Drawer.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{
          title: 'Home',
          drawerIcon: () => <HomeIcon width={24} height={24} />,
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={MyProfileStackNavigator}
        options={{
          title: 'My Profile',
          drawerIcon: () => <ProfileIcon width={24} height={24} />,
        }}
      />
      <Drawer.Screen
        name="User Subscription"
        component={SubscriptionView}
        options={{
          title: 'Subscription',
          drawerIcon: () => <SubscriptionIcon width={24} height={24} />,
        }}
      />
      <Drawer.Screen
        name="Help Center"
        component={HelpCenterView}
        options={{
          drawerIcon: () => <HelpIcon width={22} height={22} />,
        }}
      />
      {/* <Drawer.Screen
        name="News Room"
        component={NewsRoomView}
        options={{
          drawerIcon: () => <NewsRoomIcon width={24} height={24} />,
        }}
      /> */}
      <Drawer.Screen
        name="Vehicle Management"
        component={VehicleMangementStacknavigator}
        // component={SubscriptionPlanView}
        options={{
          drawerIcon: () => <VehicleMgmtIcon width={24} height={24} />,
        }}
      />
      <Drawer.Screen
        name="Branch Management"
        component={AddBranchView}
        options={{
          drawerIcon: () => <BranchesIcon width={24} height={24} />,
        }}
      />
      <Drawer.Screen
        name="Franchise Management"
        component={AddFranchiseView}
        options={{
          drawerIcon: () => <FranchiseMgmtIcon width={24} height={24} />,
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingStackNavigator}
        options={{
          drawerIcon: () => <SettingsIcon width={24} height={24} />,
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  container2: {
    flex: 1,
  },
  topContainer: {
    width: '100%',
    height: 200,
    backgroundColor: COLOR_BLUE,
  },
  container: {
    width: '100%',
    resizeMode: 'stretch',
  },
  backgroundContainer: {
    width: '100%',
    backgroundColor: COLOR_BLUE2,
  },
  innerContainer: {
    width: '100%',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR_WHITE,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR_BLUE2,
  },
  nameText: {
    color: COLOR_WHITE,
    fontSize: 18,
    fontFamily: 'WorkSans-SemiBold',
  },
  nameText2: {
    color: COLOR_WHITE,
    fontSize: 24,
    fontFamily: 'WorkSans-Regular',
  },
  text: {
    color: COLOR_WHITE,
    fontSize: 14,
    fontFamily: 'WorkSans-Regular',
  },
  bottomContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: COLOR_GRAY2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logoutText: {
    fontSize: 14,
    color: COLOR_GRAY,
    marginLeft: 10,
    fontFamily: 'WorkSans-SemiBold',
  },
});
