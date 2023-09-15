import {NavigationProp} from '@react-navigation/native';
import React, {useCallback, useEffect, useReducer, useState} from 'react';
import {View, Text, Alert} from 'react-native';
import Header from '../../common/Header';
import Spacer from '../../common/Spacer';
import {QuotationStackRoute} from '../../utils/constants';
import styles from './style';
import RegisterCompanyView from './registerCompany';
import SignatureViewPage from './signature';
import Button from '../../common/Button';
import CompanyLogoPageView from './companyLogo';
import SerialNoSettingPageView from './serialNoSettings';
import TemplateSettingPageView from './templateSettings';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {COMPANY_REGISTRATION_ACTION, companyRegistrationReducer, initialState} from './registrationReducer';
import {ICompanyRegistrationRequest} from '../../interface/companyRegistration/ICompanyRegistrationRequest';
import {setIsRegistrationComplete, setLoginStatus} from '../../utils/storage';
import {CompanyRegistrationContextProvider, useCompanyRegistrationContextHook} from '../../provider/CompanyRegistrationContextProvider';
import { Validator } from '../../utils/validation';

interface IRegistrationPageViewProps {
  navigation: NavigationProp<any, any>;
}

const RegistrationPageView: React.FC<IRegistrationPageViewProps> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch();
  const {requesting, success, error, failure, companyInfo} = useAppSelector(
    state => state.Company,
  );
  const [currentStep, setCurrentStep] = useState<number>(1);

  const handleCurrentStep = (step: number) => {
    setCurrentStep(step);
  }

  const showCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <RegisterCompanyView currentStep={currentStep} setCurrentStep={handleCurrentStep} />;
      case 2:
        return <CompanyLogoPageView />;
      case 3:
        return <SignatureViewPage />;
      case 4:
        return <SerialNoSettingPageView />;
      case 5:
        return <TemplateSettingPageView />;
      default:
        return null;
    }
  };

  const handlePreviousClick = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNextClick = useCallback(() => {
    if (currentStep >= 1 && currentStep < 5) {
      // validateRegistrationForm();
      // setCurrentStep(currentStep + 1);
    } else if (currentStep === 5) {
      // const data: ICompanyRegistrationRequest = {
      //   // authId: '',
      //   // companyName: state.companyName,
      //   // contactPerson: state.contactPerson,
      //   // email: state.email,
      //   // companyMobile: state.mobile,
      //   // companyAddress: state.address,
      //   // state: state.state,
      //   // city: state.city,
      //   // pincode: state.pinCode,
      //   // iba_approval_code: state.ibaApprovalCode,
      //   // iba_valid_date: state.ibaApprovalValidTill,
      //   // companyWebite: 'www.abc.com',
      //   // CINNumber: state.document,
      //   // companyLogo: state.companyLogo,
      //   // punchLine: 'na',
      //   // companyProfile: '',
      //   // district: '',
      //   // postOffice: '',
      //   // govRegdDetails: null,
      //   // accountDetails: [],
      //   // packerSignature: state.ownerSignature,
      //   // termsconditions: 'NA',
      // };
      // console.log('data----------', JSON.stringify(data), null, ' ');
    }
  }, []);

  const completeRegistration = async () => {
    await setIsRegistrationComplete();
    await setLoginStatus();
  };

  useEffect(() => {
    if (!requesting && success && !error) {
      completeRegistration();
    } else if (!requesting && !success && error) {
      Alert.alert('Error in registering the company');
    }
  }, [requesting, success, error]);

  return (
    <CompanyRegistrationContextProvider>
      <View style={styles.container}>
          <Spacer height={4} />
          <Header
            label={`Company Registration ${currentStep}/5`}
            canGoBack={true}
            showDrawerIcon={false}
          />
          {showCurrentStep()}
        </View>
    </CompanyRegistrationContextProvider>
  );
};

export default RegistrationPageView;
