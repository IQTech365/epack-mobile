import React, {useState} from 'react';
import {View, FlatList} from 'react-native';
import Header from '../../../common/Header';
import Spacer from '../../../common/Spacer';
import styles from './style';
import tabOptions from '../../../data/orderDetailsTabs.json';
import Tab from '../../../common/Tab';
import OrderInfoView from './components/OrderInfoView';
import DetailsView from './components/DetailsView';
import MoneyReceiptFormView from './components/MoneyReceiptFormView';
import CarConditionFormView from './components/CarConditionFormView';
import BiltyFormView from './components/BiltyFormView';
import InvoiceFormView from './components/InvoiceFormView';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { OrderStackParamList } from '../../../navigation/params/OrderStackParamList';
import { IGetOrdersData } from '../../../interface/order/IGetOrdersResponse';

type Props = NativeStackScreenProps<OrderStackParamList, 'OrderDetails'>;

const OrderDetailsView: React.FC<Props> = ({route, navigation}) => {
  const orderId: string | undefined = route.params?.orderId;
  const item: IGetOrdersData | undefined = route.params?.item;

  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  const handleTabChange = (index: number) => {
    setActiveTabIndex(index);
  };

  const showTabItem = () => {
    switch (activeTabIndex) {
      case 0:
        return <DetailsView item={item}/>
      case 1:
        return <MoneyReceiptFormView orderId={orderId} />
      case 2:
        return <CarConditionFormView orderId={orderId} />
      case 3:
        return <BiltyFormView orderId={orderId} />
      case 4:
        return <InvoiceFormView orderId={orderId} />
      default:
        return null;
    }
  };
  return (
    <View style={styles.container}>
      <Header label="ORDER DETAILS" canGoBack={true} />
      <OrderInfoView orderId={orderId as string} />
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
      {showTabItem()}
    </View>
  );
};

export default OrderDetailsView;
