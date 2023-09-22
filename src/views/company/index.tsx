import {NavigationProp} from '@react-navigation/native';
import React, {useState} from 'react';
import {View} from 'react-native';
import Header from '../../common/Header';
import Spacer from '../../common/Spacer';
import styles from './style';
import RegisterCompanyView from './registerCompany';
import SignatureViewPage from './signature';
import CompanyLogoPageView from './companyLogo';
import {CompanyRegistrationContextProvider} from '../../provider/CompanyRegistrationContextProvider';

interface IRegistrationPageViewProps {
  navigation: NavigationProp<any, any>;
}

const RegistrationPageView: React.FC<IRegistrationPageViewProps> = ({navigation}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const handleCurrentStep = (step: number) => {
    setCurrentStep(step);
  }

  const showCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <RegisterCompanyView currentStep={currentStep} setCurrentStep={handleCurrentStep} />;
      case 2:
        return <CompanyLogoPageView currentStep={currentStep} setCurrentStep={handleCurrentStep} />;
      case 3:
        return <SignatureViewPage currentStep={currentStep} setCurrentStep={handleCurrentStep} />;
      default:
        return null;
    }
  };

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
