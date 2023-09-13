import React, {useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import Header from '../../../common/Header';
import Spacer from '../../../common/Spacer';
import EnquiryInfoView from './components/EnquiryInfoView';
import styles from './style';
import tabOptions from '../../../data/enquiresDetailsTabs.json';
import Tab from '../../../common/Tab';
import AddQuotationView from '../../quotation/addQuotation';
import FollowupListHeaderComponent from './components/FollowupListHeaderComponent';
import FollowupView from './components/FollowupView';
import SurveyView from './components/FollowupView';
import DetailsView from './components/DetailsView';

const EnquiryDetailsView: React.FC<{}> = ({}) => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  const handleTabChange = (index: number) => {
    setActiveTabIndex(index);
  };

  const showTabItem = () => {
    switch (activeTabIndex) {
      case 0:
        return <DetailsView />
      case 1:
        return <FollowupView taskName='FOLLOW UP' assigneeRole='Enequiry' />
      case 2:
        return <SurveyView taskName='SURVEY' assigneeRole='Survey' />
      case 3:
        return <AddQuotationView showHeader={false} />
      default:
        return null;
    }
  };
  
  return (
    <View style={styles.container}>
      <Header label="ENQUIRY DETAILS" canGoBack={true} />
      <EnquiryInfoView />
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

export default EnquiryDetailsView;
