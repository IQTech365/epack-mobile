import {NavigationProp} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text} from 'react-native';
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

interface IRegistrationPageViewProps {
  navigation: NavigationProp<any, any>;
}

const RegistrationPageView: React.FC<IRegistrationPageViewProps> = ({
  navigation,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const handleAddNew = () => {
    navigation.navigate(QuotationStackRoute.AddQuotation);
  };

  const showCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <RegisterCompanyView />;
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
    if(currentStep > 1) {
        setCurrentStep(currentStep - 1);
    }
  }

  const handleNextClick = () => {
    if(currentStep >= 1 && currentStep < 5) {
        setCurrentStep(currentStep + 1);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Spacer height={4} />
        <Header
          label={`Company Registration ${currentStep}/5`}
          canGoBack={true}
          showDrawerIcon={false}
        />
        {showCurrentStep()}
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.prevButtonContainer}>
          {currentStep > 1 ? <Button
            text="Previous"
            onPress={handlePreviousClick}
            style={styles.buttonStyle}
            textStyle={styles.buttonTextStyle}
          /> : null}
        </View>
        <View style={styles.nextButtonContainer}>
          <Button
            text="Next"
            onPress={handleNextClick}
            style={styles.buttonStyle}
            textStyle={styles.buttonTextStyle}
          />
        </View>
      </View>
    </View>
  );
};

export default RegistrationPageView;
