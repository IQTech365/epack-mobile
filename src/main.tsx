import React from 'react';
import {} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Spinner from './common/Spinner';
import {useAuthContext} from './provider/AuthProvider';
import TabNavigator from './navigation/TabNavigator';
import AuthStackNavigator from './navigation/AuthStackNavigator';
import {Provider} from 'react-redux';
import {store} from './redux/store';

const Main = () => {
  const authContext = useAuthContext();
  const {loggedIn, loading} = authContext;

  if (loading) {
    return <Spinner show={true} backdrop="opaque" />;
  }

  return (
    <NavigationContainer>
      <Provider store={store}>
        {loggedIn ? <TabNavigator /> : <AuthStackNavigator />}
      </Provider>
    </NavigationContainer>
  );
};

export default Main
