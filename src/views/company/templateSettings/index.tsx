import React, { useReducer } from 'react';
import { useWindowDimensions } from 'react-native';
import mockTemplateData2 from '../../../data/mockTemplateData2.json';
import QuotationTemplateView from './components/quotationTemplateView';
import BiltyTemplateView from './components/BiltyTemplateView';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import InvoiceTemplateView from './components/InvoiceTemplateView';
import CarConditionTemplateView from './components/CarConditionTemplateView';
import MoneyReceiptTemplateView from './components/MoneyReceiptTemplateView';
import { COMPANY_REGISTRATION_ACTION, IDocumentTemplate, companyRegistrationReducer, initialState } from '../registrationReducer';

interface ITemplateSettingPageView {
  //
}

const TemplateSettingPageView: React.FC<ITemplateSettingPageView> = ({}) => {
  const layout = useWindowDimensions();
  const [state, dispatch] = useReducer(
    companyRegistrationReducer,
    initialState,
  );
  const [index, setIndex] = React.useState(0);
  console.log('state--------', JSON.stringify(state, null, ' '));

  const handleQuotationTemplateSelect = (planCategory: string, planIndex: number, planName: string) => {
    const { documentTemplates } = state;
    const tempObj = {
      ...documentTemplates,
      quotation: {planType: planCategory, templateId: planName}
    }
    dispatch({
      type: COMPANY_REGISTRATION_ACTION.DOCUMENT_TEMPLATES,
      payload: tempObj as IDocumentTemplate
    });
  }

  const handleBiltyTemplateSelect = (planCategory: string, planIndex: number, planName: string) => {
    const { documentTemplates } = state;
    const tempObj = {
      ...documentTemplates,
      bilty: {planType: planCategory, templateId: planName}
    }
    dispatch({
      type: COMPANY_REGISTRATION_ACTION.DOCUMENT_TEMPLATES,
      payload: tempObj as IDocumentTemplate
    });
  }

  const handleInvoiceTemplateSelect = (planCategory: string, planIndex: number, planName: string) => {
    const { documentTemplates } = state;
    const tempObj = {
      ...documentTemplates,
      invoice: {planType: planCategory, templateId: planName}
    }
    dispatch({
      type: COMPANY_REGISTRATION_ACTION.DOCUMENT_TEMPLATES,
      payload: tempObj as IDocumentTemplate
    });
  }

  const handleCarConditionTemplateSelect = (planCategory: string, planIndex: number, planName: string) => {
    const { documentTemplates } = state;
    const tempObj = {
      ...documentTemplates,
      car_condition: {planType: planCategory, templateId: planName}
    }
    dispatch({
      type: COMPANY_REGISTRATION_ACTION.DOCUMENT_TEMPLATES,
      payload: tempObj as IDocumentTemplate
    });
  }

  const handleMoneyReceiptTemplateSelect = (planCategory: string, planIndex: number, planName: string) => {
    const { documentTemplates } = state;
    const tempObj = {
      ...documentTemplates,
      money_receipt: {planType: planCategory, templateId: planName}
    }
    dispatch({
      type: COMPANY_REGISTRATION_ACTION.DOCUMENT_TEMPLATES,
      payload: tempObj as IDocumentTemplate
    });
  }

  const QuotationTemplateRoute = () => <QuotationTemplateView data={mockTemplateData2} onTemplateSelect={handleQuotationTemplateSelect} />;
  const BiltyTemplateRoute = () => <BiltyTemplateView data={mockTemplateData2} onTemplateSelect={handleBiltyTemplateSelect} />;
  const InvoiceTemplateRoute = () => <InvoiceTemplateView data={mockTemplateData2} onTemplateSelect={handleInvoiceTemplateSelect} />;
  const CarConditionTemplateRoute = () => <CarConditionTemplateView data={mockTemplateData2} onTemplateSelect={handleCarConditionTemplateSelect} />;
  const MoneyReceiptTemplateRoute = () => <MoneyReceiptTemplateView data={mockTemplateData2} onTemplateSelect={handleMoneyReceiptTemplateSelect} />;

const renderScene = SceneMap({
  first: QuotationTemplateRoute,
  second: BiltyTemplateRoute,
  third: InvoiceTemplateRoute,
  fourth: CarConditionTemplateRoute,
  fifth: MoneyReceiptTemplateRoute,
});

const handleSave = () => {
  
}

  const [routes] = React.useState([
    {key: 'first', title: 'Quotation'},
    {key: 'second', title: 'Bilty'},
    {key: 'third', title: 'Invoice'},
    {key: 'fourth', title: 'Car Condition'},
    {key: 'fifth', title: 'Money Receipt'}
  ]);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      overScrollMode="always"
      renderTabBar={(props) => <TabBar {...props} scrollEnabled={true} /> }
    />
  );
};

export default TemplateSettingPageView;
