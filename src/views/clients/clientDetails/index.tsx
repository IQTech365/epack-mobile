import React, {useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import Header from '../../../common/Header';
import Spacer from '../../../common/Spacer';
import styles from './style';
import tabOptions from '../../../data/clientDetailsTabs.json';
import Tab from '../../../common/Tab';
import ClientInfoView from './components/ClientInfoView';
import ContactDetailsView from './components/ContactDetailsView';
import ShiftingDetailsView from './components/ShiftingDetailsView';

const ClientDetailsView: React.FC<{}> = ({}) => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  const handleTabChange = (index: number) => {
    setActiveTabIndex(index);
  };

  const showTabItem = () => {
    switch (activeTabIndex) {
      case 0:
        return <ContactDetailsView />
      case 1:
        return <ShiftingDetailsView />
      default:
        return null;
    }
  };
  return (
    <View style={styles.container}>
      <Header label="CLIENT DETAILS" canGoBack={true} />
      <ClientInfoView />
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

export default ClientDetailsView;
