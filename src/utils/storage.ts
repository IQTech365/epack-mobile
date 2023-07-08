import AsyncStorage from '@react-native-async-storage/async-storage';

export const setLoginStatus = async () => {
  try {
    await AsyncStorage.setItem('login-key', 'login');
  } catch (error) {
    console.log('AsyncStorage Error in saving', error);
  }
};

export const getLoginStatus = async () => {
  try {
    return await AsyncStorage.getItem('login-key');
  } catch (e) {
    console.log('AsyncStorage Error in fetching', e);
  }
};
