import React, {useState} from 'react';
import {View, FlatList} from 'react-native';
import Header from '../../../common/Header';
import Spacer from '../../../common/Spacer';
import styles from './style';
import tabOptions from '../../../data/orderDetailsTabs.json';
import Tab from '../../../common/Tab';
import OrderInfoView from './components/OrderInfoView';
import DetailsView from './components/DetailsView';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {OrderStackParamList} from '../../../navigation/params/OrderStackParamList';
import BiltyView from './components/BiltyView';
import MoneyReceiptView from './components/MoneyReceiptView';
import CarConditionView from './components/CarConditionView';
import InvoiceView from './components/InvoiceView';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import usePincodeHook from '../../../hooks/usePincodeHook';
import Spinner from '../../../common/Spinner';
import PackingListView from './components/PackingListView';
import {ISingleEnquiryData} from '../../../interface/enquiry/ISingleEnquiryResponse';
import {resetGetSerialNoRequest} from '../../../redux/slices/SerialNoSettingSlice';
import SurveyView from '../../enquiry/enquiryDetails/components/FollowupView'
import QuotationView from '../../enquiry/enquiryDetails/components/QuotationsView';
import PackingMaterialsView from '../../enquiry/enquiryDetails/components/PackingMaterialsView';
import NocFormView from './components/NocFormView';

const tabData = [tabOptions];

type Props = NativeStackScreenProps<OrderStackParamList, 'OrderDetails'>;

const OrderDetailsView: React.FC<Props> = ({route, navigation}) => {
  const orderId: string = route.params?.orderId as string;
  const item: ISingleEnquiryData = route.params?.item as ISingleEnquiryData;
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const {createBiltyRequesting} = useAppSelector(state => state.Order);
  const {fetching} = usePincodeHook(
    () => {},
    () => {},
  );
  const dispatch = useAppDispatch();

  const handleTabChange = (index: number) => {
    dispatch(resetGetSerialNoRequest());
    setActiveTabIndex(index);
  };

  const handleSuccess = (index: number) => {};

  const showTabItem = () => {
    switch (activeTabIndex) {
      case 0:
        return <DetailsView enquiryId={orderId} />;
      case 1:
        return <MoneyReceiptView orderId={orderId as string} navigation={navigation} />;
      case 2:
        return <CarConditionView orderId={orderId as string} navigation={navigation} />;
      case 3:
        return <BiltyView orderId={orderId as string} navigation={navigation} />;
      case 4:
        return <NocFormView orderId={orderId as string} navigation={navigation}/>
      case 5:
        return <InvoiceView orderId={orderId as string} item={item} navigation={navigation} />;
      case 6:
        return <PackingListView orderId={orderId as string} />;
      case 7:
        return (
          <SurveyView
            taskName="SURVEY"
            assigneeRole="Survey"
            enquiryId={orderId as string}
            isOrder={true}
          />
        );
      case 8:
        return (
          <QuotationView
            enquiryId={orderId as string}
            navigation={navigation}
            onItemClick={handleTabChange}
            isOrder={true}
            route={route}
          />
        );
        
      case 9:
          return <PackingMaterialsView enquiryId={orderId as string} />;
      default:
        return null;
    }
  };
  return (
    <View style={styles.container}>
      <Header label="ORDER DETAILS" canGoBack={true} />
      <FlatList
        data={tabData}
        ListHeaderComponent={
          <OrderInfoView
            orderId={orderId as string}
            item={item}
            navigation={navigation}
          />
        }
        renderItem={({item: tabOptions, index: idx}) => {
          return (
            <>
              <Spacer height={10} />
              <View style={styles.tabsContainer}>
                <FlatList
                  style={{paddingHorizontal: 8}}
                  data={tabOptions}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item, index}) => (
                    <Tab
                      label={item.label}
                      index={index}
                      onPress={handleTabChange}
                      activeIndex={activeTabIndex}
                    />
                  )}
                />
              </View>
              <Spacer height={10} />
            </>
          );
        }}
        ListFooterComponent={showTabItem()}
      />
      <Spinner show={createBiltyRequesting || fetching} />
    </View>
  );
};

export default OrderDetailsView;
