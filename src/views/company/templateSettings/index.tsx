import React, {useCallback, useEffect} from 'react';
import {Alert, View, useWindowDimensions} from 'react-native';
import mockTemplateData2 from '../../../data/mockTemplateData2.json';
import QuotationTemplateView from './components/quotationTemplateView';
import BiltyTemplateView from './components/BiltyTemplateView';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import InvoiceTemplateView from './components/InvoiceTemplateView';
import CarConditionTemplateView from './components/CarConditionTemplateView';
import MoneyReceiptTemplateView from './components/MoneyReceiptTemplateView';
import {IDocumentTemplate} from '../registrationReducer';
import {useCompanyRegistrationContextHook} from '../../../provider/CompanyRegistrationContextProvider';
import styles from './style';
import Button from '../../../common/Button';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setIsRegistrationComplete, setLoginStatus } from '../../../utils/storage';
import { ICompanyRegistrationRequest } from '../../../interface/companyRegistration/ICompanyRegistrationRequest';


interface ITemplateSettingPageViewProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const TemplateSettingPageView: React.FC<ITemplateSettingPageViewProps> = ({
  currentStep,
  setCurrentStep,
}) => {
  const layout = useWindowDimensions();
  const {state, setDocumentTemplates} = useCompanyRegistrationContextHook();
  const [index, setIndex] = React.useState(0);
  const dispatch = useAppDispatch();
  const {requesting, success, error, failure, companyInfo} = useAppSelector(state => state.Company);

  const handleQuotationTemplateSelect = (
    planCategory: string,
    planIndex: number,
    planName: string,
  ) => {
    const {documentTemplates} = state;
    const tempObj = {
      ...documentTemplates,
      quotation: {planType: planCategory, templateId: planName},
    };
    setDocumentTemplates(tempObj as IDocumentTemplate);
  };

  const handleBiltyTemplateSelect = (
    planCategory: string,
    planIndex: number,
    planName: string,
  ) => {
    const {documentTemplates} = state;
    const tempObj = {
      ...documentTemplates,
      bilty: {planType: planCategory, templateId: planName},
    };
    setDocumentTemplates(tempObj as IDocumentTemplate);
  };

  const handleInvoiceTemplateSelect = (
    planCategory: string,
    planIndex: number,
    planName: string,
  ) => {
    const {documentTemplates} = state;
    const tempObj = {
      ...documentTemplates,
      invoice: {planType: planCategory, templateId: planName},
    };
    setDocumentTemplates(tempObj as IDocumentTemplate);
  };

  const handleCarConditionTemplateSelect = (
    planCategory: string,
    planIndex: number,
    planName: string,
  ) => {
    const {documentTemplates} = state;
    const tempObj = {
      ...documentTemplates,
      car_condition: {planType: planCategory, templateId: planName},
    };
    setDocumentTemplates(tempObj as IDocumentTemplate);
  };

  const handleMoneyReceiptTemplateSelect = (
    planCategory: string,
    planIndex: number,
    planName: string,
  ) => {
    const {documentTemplates} = state;
    const tempObj = {
      ...documentTemplates,
      money_receipt: {planType: planCategory, templateId: planName},
    };
    setDocumentTemplates(tempObj as IDocumentTemplate);
  };

  const QuotationTemplateRoute = () => (
    <QuotationTemplateView
      data={mockTemplateData2}
      onTemplateSelect={handleQuotationTemplateSelect}
    />
  );
  const BiltyTemplateRoute = () => (
    <BiltyTemplateView
      data={mockTemplateData2}
      onTemplateSelect={handleBiltyTemplateSelect}
    />
  );
  const InvoiceTemplateRoute = () => (
    <InvoiceTemplateView
      data={mockTemplateData2}
      onTemplateSelect={handleInvoiceTemplateSelect}
    />
  );
  const CarConditionTemplateRoute = () => (
    <CarConditionTemplateView
      data={mockTemplateData2}
      onTemplateSelect={handleCarConditionTemplateSelect}
    />
  );
  const MoneyReceiptTemplateRoute = () => (
    <MoneyReceiptTemplateView
      data={mockTemplateData2}
      onTemplateSelect={handleMoneyReceiptTemplateSelect}
    />
  );

  const renderScene = SceneMap({
    first: QuotationTemplateRoute,
    second: BiltyTemplateRoute,
    third: InvoiceTemplateRoute,
    fourth: CarConditionTemplateRoute,
    fifth: MoneyReceiptTemplateRoute,
  });

  const [routes] = React.useState([
    {key: 'first', title: 'Quotation'},
    {key: 'second', title: 'Bilty'},
    {key: 'third', title: 'Invoice'},
    {key: 'fourth', title: 'Car Condition'},
    {key: 'fifth', title: 'Money Receipt'},
  ]);

  const handlePreviousClick = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
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

  const handleSaveClick = useCallback(() => {
    const data: ICompanyRegistrationRequest = {
        authId: '',
        companyName: state.companyName,
        contactPerson: state.contactPerson,
        email: state.email,
        companyMobile: state.mobile,
        companyAddress: state.address,
        state: state.state,
        city: state.city,
        pincode: state.pinCode,
        iba_approval_code: state.ibaApprovalCode,
        iba_valid_date: state.ibaApprovalValidTill,
        companyWebite: 'www.abc.com',
        CINNumber: state.document,
        companyLogo: state.companyLogo,
        punchLine: 'na',
        companyProfile: '',
        district: '',
        postOffice: '',
        govRegdDetails: null,
        accountDetails: [],
        packerSignature: state.ownerSignature,
        termsconditions: 'NA',
      };
      console.log('data----------', JSON.stringify(data), null, ' ');
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
          overScrollMode="always"
          renderTabBar={props => <TabBar {...props} scrollEnabled={true} style={{height: 44}} />}
        />
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.prevButtonContainer}>
          {currentStep > 1 ? (
            <Button
              text="Previous"
              onPress={handlePreviousClick}
              style={styles.buttonStyle2}
              textStyle={styles.buttonTextStyle}
            />
          ) : null}
        </View>
        <View style={styles.nextButtonContainer}>
          <Button
            text={'Save'}
            onPress={handleSaveClick}
            style={styles.buttonStyle2}
            textStyle={styles.buttonTextStyle}
          />
        </View>
      </View>
    </View>
  );
};

export default TemplateSettingPageView;
