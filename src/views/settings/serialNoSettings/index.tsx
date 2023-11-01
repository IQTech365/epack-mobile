import React, {useState} from 'react';
import {View, FlatList} from 'react-native';
import styles from './style';
import Header from '../../../common/Header';
import serialNo from '../../../data/serialNo.json';
import Spacer from '../../../common/Spacer';
import Tab from '../../../common/Tab';
import MoneyReceiptSN from './MoneyReceipt';
import CarConditionSN from './CarCondition';
import BiltySN from './Bilty';
import InvoiceSN from './Invoice';
import QuotationSN from './Quotation';

const AddSerialNoView = () => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  const handleTabChange = (index: number) => {
    setActiveTabIndex(index);
  };
  
  const showTabItem = () => {
    switch (activeTabIndex) {
      case 0:
       return <MoneyReceiptSN moduleId='5' moduleName='MONEY RECEIPT' />
      case 1:
        return <CarConditionSN moduleId='4' moduleName='CAR CONDITION' />
      case 2:
        return <BiltySN moduleId='3' moduleName='BILTY' />
      case 3:
        return <InvoiceSN moduleId='2' moduleName='INVOICE' />
      case 4:
        return <QuotationSN moduleId='1' moduleName='QUOTATION'/>
      default:
        return null;
    }
  };


  return (
    <View style={{flex: 1, backgroundColor:'#ffff' }}>
      <Header canGoBack={true} label="Serial No Setting" />
      <Spacer height={10} />
      <View style={styles.tabsContainer}>
        <FlatList
          style={{ paddingHorizontal: 8 }}
          data={serialNo}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
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
      <Spacer height={8} />
    </View>
  );
};

export default AddSerialNoView;
