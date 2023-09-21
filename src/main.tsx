import React from 'react';
import {} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Spinner from './common/Spinner';
import {useAuthContext} from './provider/AuthProvider';
import AuthStackNavigator from './navigation/AuthStackNavigator';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import {DrawerNavigator} from './navigation/DrawerNavigator';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {PortalProvider} from '@gorhom/portal';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const Main = () => {
  const authContext = useAuthContext();
  const {loggedIn, loading} = authContext;

  if (loading) {
    return <Spinner show={true} backdrop="opaque" />;
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <PortalProvider>
          <BottomSheetModalProvider>
            <Provider store={store}>
              {loggedIn ? <DrawerNavigator /> : <AuthStackNavigator />}
            </Provider>
          </BottomSheetModalProvider>
        </PortalProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default Main;
