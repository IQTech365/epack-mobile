import React, {useState} from 'react';
import {View} from 'react-native';
import Header from '../../common/Header';
import styles from './style';
import SignatureViewPage from './components/CompanySignatureView';
import CompanyLogoPageView from './components/CompanyLogoView';
import {CompanyRegistrationContextProvider} from '../../provider/CompanyRegistrationContextProvider';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../navigation/params/AuthStackParamList';
import CompanyBasicDetailsView from './components/CompanyBasicDetailsView';
type Props = NativeStackScreenProps<AuthStackParamList, 'RegisterCompany'>;

const RegistrationPageView: React.FC<Props> = ({route, navigation}) => {
  const registrationStep: number = route.params.registrationStep;
  console.log('data-data---registrationStep---', registrationStep);
  const [currentStep, setCurrentStep] = useState<number>(registrationStep);

  const handleCurrentStep = (step: number) => {
    setCurrentStep(step);
  };

  const showCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <CompanyBasicDetailsView
            currentStep={currentStep}
            setCurrentStep={handleCurrentStep}
          />
        );
      case 2:
        return (
          <CompanyLogoPageView
            currentStep={currentStep}
            setCurrentStep={handleCurrentStep}
          />
        );
      case 3:
        return (
          <SignatureViewPage
            currentStep={currentStep}
            setCurrentStep={handleCurrentStep}
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <View style={styles.container}>
      <Header
        label={`COMPANY REGISTRATION STEP - ${currentStep}/3`}
        showDrawerIcon={false}
      />
      <CompanyRegistrationContextProvider>
        {showCurrentStep()}
      </CompanyRegistrationContextProvider>
    </View>
  );
};

export default RegistrationPageView;
