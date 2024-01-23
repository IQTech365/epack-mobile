import React, {useEffect} from 'react';
import {AppState} from 'react-native';
import {CompanyRegistrationContextProvider} from '../../../provider/CompanyRegistrationContextProvider';
import CompanyBasicDetailsForm from './CompanyBasicDetailsForm';
import {useAppDispatch} from '../../../redux/hooks';
import {resetGetCompaniesRequest} from '../../../redux/slices/CompanySlice';

interface IProps {}

const CompanyBasicDetailsView: React.FC<IProps> = (props: any) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const appStateListener = AppState.addEventListener(
      'change',
      nextAppState => {
        if (nextAppState == 'background' || nextAppState == 'inactive') {
          dispatch(resetGetCompaniesRequest());
        }
      },
    );
    return () => {
      appStateListener?.remove();
    };
  }, []);

  return (
    <CompanyRegistrationContextProvider>
      <CompanyBasicDetailsForm navigation={props.navigation} />
    </CompanyRegistrationContextProvider>
  );
};

export default CompanyBasicDetailsView;
