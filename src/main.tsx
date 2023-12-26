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
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import {PersistGate} from 'redux-persist/integration/react';
import {MenuProvider} from 'react-native-popup-menu';
import {COLOR_BLACK, COLOR_GREEN} from './utils/colors';

const Main = () => {
  const authContext = useAuthContext();
  const {loggedIn, loading} = authContext;

  const toastConfig = {
    success: (props: any) => (
      <BaseToast
        {...props}
        style={{borderLeftColor: COLOR_GREEN}}
        contentContainerStyle={{paddingHorizontal: 10, paddingVertical: 15}}
        contentContainerProps={{paddingHorizontal: 15}}
        text1Style={{
          fontSize: 18,
          fontWeight: '400',
        }}
        text2Style={{
          fontSize: 16,
          fontWeight: '300',
        }}
      />
    ),
    error: (props: any) => (
      <ErrorToast
        {...props}
        contentContainerStyle={{paddingHorizontal: 10, paddingVertical: 15}}
        contentContainerProps={{paddingHorizontal: 15}}
        text1Style={{
          fontSize: 18,
          fontWeight: '400',
        }}
        text2Style={{
          fontSize: 16,
          fontWeight: '300',
          color: COLOR_BLACK,
        }}
      />
    ),
  };

  if (loading) {
    return <Spinner show={true} backdrop="opaque" />;
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <BottomSheetModalProvider>
          <MenuProvider>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                {loggedIn ? <DrawerNavigator /> : <AuthStackNavigator />}
                <Toast config={toastConfig} />
              </PersistGate>
            </Provider>
          </MenuProvider>
        </BottomSheetModalProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default Main;
