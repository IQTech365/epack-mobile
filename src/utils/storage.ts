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

export const removeLoginStatus = async () => {
  try {
    return await AsyncStorage.removeItem('login-key');
  } catch (e) {
    console.log('AsyncStorage Error in removing login-key', e);
  }
};

export const getAuthToken = async () => {
  try {
    return await AsyncStorage.getItem('authToken');
  } catch (e) {
    console.log('AsyncStorage Error in fetching auth-token', e);
  }
};

export const setAuthToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('authToken', token);
  } catch (error) {
    console.log('AsyncStorage Error in saving authToken', error);
  }
};

export const removeToken = async () => {
  try {
    return await AsyncStorage.removeItem('authToken');
  } catch (e) {
    console.log('AsyncStorage Error in removing auth-token', e);
  }
};

export const setIsRegistrationComplete = async () => {
  try {
    await AsyncStorage.setItem('registration', 'complete');
  } catch (error) {
    console.log('AsyncStorage Error in saving', error);
  }
};

export const getIsRegistrationComplete = async () => {
  try {
    return await AsyncStorage.getItem('registration');
  } catch (e) {
    console.log('AsyncStorage Error in fetching registration', e);
  }
};

export const removeIsRegistrationComplete = async () => {
  try {
    return await AsyncStorage.removeItem('registration');
  } catch (e) {
    console.log('AsyncStorage Error in removing registration', e);
  }
};

export const setCurrentCompanyId = async (companyId:string) => {
  try {
    await AsyncStorage.setItem('company_id', companyId);
  } catch (error) {
    console.log('AsyncStorage Error in saving', error);
  }
};

export const getCurrentCompanyId = async () => {
  try {
    return await AsyncStorage.getItem('company_id');
  } catch (e) {
    console.log('AsyncStorage Error in fetching company_id', e);
  }
};

export const removeCurrentCompanyId = async () => {
  try {
    return await AsyncStorage.removeItem('company_id');
  } catch (e) {
    console.log('AsyncStorage Error in removing company_id', e);
  }
};