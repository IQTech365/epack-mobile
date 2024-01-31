import React, {useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Header from '../../../common/Header';
import Spacer from '../../../common/Spacer';
import styles from './style';
import tabOptions from '../../../data/clientDetailsTabs.json';
import Tab from '../../../common/Tab';
import ClientInfoView from './components/ClientInfoView';
import ContactDetailsView from './components/ContactDetailsView';
import ShiftingDetailsView from './components/ShiftingDetailsView';
import {ClientStackParamList} from '../../../navigation/params/CientStackParamList';
import {ICustomer} from '../../../interface/customer/customer';

const tabData = [tabOptions];

type Props = NativeStackScreenProps<ClientStackParamList, 'ClientDetails'>;
const ClientDetailsView: React.FC<Props> = ({route}) => {
  const item: ICustomer = route.params?.item as ICustomer;
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  const handleTabChange = (index: number) => {
    setActiveTabIndex(index);
  };

  const showTabItem = () => {
    switch (activeTabIndex) {
      case 0:
        return <ContactDetailsView item={item} />;
      case 1:
        return <ShiftingDetailsView item={item} />;
      default:
        return null;
    }
  };
  return (
    <View style={styles.container}>
      <Header label="CLIENT DETAILS" canGoBack={true} />
      <FlatList
        data={tabData}
        ListHeaderComponent={<ClientInfoView item={item} />}
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
    </View>
  );
};

export default ClientDetailsView;
