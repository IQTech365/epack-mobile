import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Spinner from './common/Spinner';
import {useAuthContext} from './provider/AuthProvider';
import AuthStackNavigator from './navigation/AuthStackNavigator';
import {Provider} from 'react-redux';
import {store, persistor} from './redux/store';
import {DrawerNavigator} from './navigation/DrawerNavigator';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import {PersistGate} from 'redux-persist/integration/react';

const Main = () => {
  const authContext = useAuthContext();
  const {loggedIn, loading} = authContext;

  if (loading) {
    return <Spinner show={true} backdrop="opaque" />;
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <BottomSheetModalProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              {loggedIn ? <DrawerNavigator /> : <AuthStackNavigator />}
              <Toast />
            </PersistGate>
          </Provider>
        </BottomSheetModalProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default Main;
