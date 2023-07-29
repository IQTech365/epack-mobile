import React, {useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import Header from '../../../common/Header';
import Spacer from '../../../common/Spacer';
import styles from './style';
import tabOptions from '../../../data/orderDetailsTabs.json';
import Tab from '../../../common/Tab';
import OrderInfoView from './components/OrderInfoView';
import DetailsView from './components/DetailsView';
import MoneyReceiptView from './components/MoneyReceiptView';
import CarConditionView from './components/CarConditionView';
import BiltyView from './components/BiltyView';
import InvoiceView from './components/InvoiceView';

const OrderDetailsView: React.FC<{}> = ({}) => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  const handleTabChange = (index: number) => {
    setActiveTabIndex(index);
  };

  const showTabItem = () => {
    switch (activeTabIndex) {
      case 0:
        return <DetailsView />
      case 1:
        return <MoneyReceiptView />
      case 2:
        return <CarConditionView />
      case 3:
        return <BiltyView />
      case 4:
        return <InvoiceView />
      default:
        return null;
    }
  };
  return (
    <View style={styles.container}>
      <Header label="ORDER DETAILS" canGoBack={true} />
      <OrderInfoView />
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
