import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import ProfilePageView from '../views/profile';
import TabNavigator from './TabNavigator';
import {
  COLOR_BLUE,
  COLOR_BLUE2,
  COLOR_GRAY,
  COLOR_GRAY2,
  COLOR_WHITE,
} from '../utils/colors';
import {IAppUser} from '../interface/IAppUser';
import HeaderGridBackgroundImage from '../images/header-grid.png';
import Spacer from '../common/Spacer';
import HomeIcon from '../images/icons/home2.svg';
import ProfileIcon from '../images/icons/user3.svg';
import SubscriptionView from '../views/subscription';
import HelpCenterView from '../views/helpCenter';
import NewsRoomView from '../views/newsRoom';
import SettingsView from '../views/settings';
const Drawer = createDrawerNavigator();

const appUser: IAppUser = {
  companyName: 'Gayatri Packers',
  usesrId: '1159',
  mobile: '+91 9876543210',
  email: 'gayatri@gmail.com',
};

const DrawerContent = (props: any) => {
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
              <View style={styles.avatar} />
            </View>
            <Text style={styles.nameText}>{appUser.companyName}</Text>
            <Text style={styles.text}>{`User ID: ${appUser.usesrId}`}</Text>
            <Text style={styles.text}>{`Mobile: ${appUser.mobile}`}</Text>
            <Text style={styles.text}>{`Email: ${appUser.email}`}</Text>
            <Spacer height={8} />
          </View>
        </ImageBackground>
        <View style={{backgroundColor: '#ffffff'}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottomContainer}>
        <Text>Logout</Text>
      </View>
    </View>
  );
};

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{headerShown: false, drawerLabelStyle: {marginLeft: -25}}}>
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
        component={ProfilePageView}
        options={{
          title: 'My Profile',
          drawerIcon: () => <ProfileIcon width={24} height={24} />,
        }}
      />
      <Drawer.Screen
        name="Subscription"
        component={SubscriptionView}
        options={{
          title: 'Subscription',
          drawerIcon: () => <ProfileIcon width={24} height={24} />,
        }}
      />
       <Drawer.Screen
        name="Help Center"
        component={HelpCenterView}
        options={{
          drawerIcon: () => <ProfileIcon width={24} height={24} />,
        }}
      />
       <Drawer.Screen
        name="News Room"
        component={NewsRoomView}
        options={{
          drawerIcon: () => <ProfileIcon width={24} height={24} />,
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsView}
        options={{
          drawerIcon: () => <ProfileIcon width={24} height={24} />,
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
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR_WHITE,
  },
  avatar: {
    width: 98,
    height: 98,
    borderRadius: 49,
    backgroundColor: COLOR_GRAY,
  },
  nameText: {
    color: COLOR_WHITE,
    fontSize: 18,
    fontWeight: '500',
  },
  text: {
    color: COLOR_WHITE,
    fontSize: 14,
  },
  bottomContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: COLOR_GRAY2,
  },
});
