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
import { OrderStackParamList } from '../../../navigation/params/OrderStackParamList';
import { IGetOrdersData } from '../../../interface/order/IGetOrdersResponse';
import BiltyView from './components/BiltyView';
import MoneyReceiptView from './components/MoneyReceiptView';
import CarConditionView from './components/CarConditionView';
import InvoiceView from './components/InvoiceView';

type Props = NativeStackScreenProps<OrderStackParamList, 'OrderDetails'>;

const OrderDetailsView: React.FC<Props> = ({route, navigation}) => {
  const orderId: string = route.params?.orderId as string;
  const item: IGetOrdersData = route.params?.item as IGetOrdersData;

  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  const handleTabChange = (index: number) => {
    setActiveTabIndex(index);
  };

  const showTabItem = () => {
    switch (activeTabIndex) {
      case 0:
        return <DetailsView item={item}/>
      case 1:
        return <MoneyReceiptView orderId={orderId as string} />
      case 2:
        return <CarConditionView orderId={orderId as string} />
      case 3:
        return <BiltyView orderId={orderId as string} />
      case 4:
        return <InvoiceView orderId={orderId as string} />
      default:
        return null;
    }
  };
  return (
    <View style={styles.container}>
      <Header label="ORDER DETAILS" canGoBack={true} />
      <OrderInfoView orderId={orderId as string} item={item} />
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
