import React, {useState} from 'react';
import {View, FlatList} from 'react-native';
import Header from '../../../common/Header';
import Spacer from '../../../common/Spacer';
import EnquiryInfoView from './components/EnquiryInfoView';
import styles from './style';
import tabOptions from '../../../data/enquiresDetailsTabs.json';
import Tab from '../../../common/Tab';
import FollowupView from './components/FollowupView';
import SurveyView from './components/FollowupView';
import DetailsView from './components/DetailsView';
import PackingMaterialsView from './components/PackingMaterialsView';
import {EnquiryStackParamList} from '../../../navigation/params/EnquiryStackParamList';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAppSelector} from '../../../redux/hooks';
import Spinner from '../../../common/Spinner';
import QuotationView from './components/QuotationsView';
import {IEnquiry} from '../../../interface/quotation/IGetQuotationsResponse';

const tabData = [tabOptions];

type Props = NativeStackScreenProps<EnquiryStackParamList, 'EnquiryDetails'>;

const EnquiryDetailsView: React.FC<Props> = ({route, navigation}) => {
  const enquiryId: string | undefined = route.params?.enquiryId;
  const item: IEnquiry | undefined = route.params?.item;
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const {updateEnquiryStatusRequesting} = useAppSelector(
    state => state.Enquiry,
  );

  console.log(item,"fff");
  

  const handleTabChange = (index: number) => {
    setActiveTabIndex(index);
  };

  const showTabItem = () => {
    switch (activeTabIndex) {
      case 0:
        return <DetailsView enquiryId={enquiryId as string} />;
      case 1:
        return (
          <FollowupView
            taskName="FOLLOW UP"
            assigneeRole="Enquiry"
            enquiryId={enquiryId as string}
            isOrder={false}
          />
        );
      case 2:
        return (
          <SurveyView
            taskName="SURVEY"
            assigneeRole="Survey"
            enquiryId={enquiryId as string}
            isOrder={false}
          />
        );
      case 3:
        return (
          <QuotationView
            enquiryId={enquiryId as string}
            navigation={navigation}
            onItemClick={handleTabChange}
            item={item}
          />
        );
      case 4:
        return <PackingMaterialsView enquiryId={enquiryId as string} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Header label="ENQUIRY DETAILS" canGoBack={true} />
      <FlatList
        data={tabData}
        bounces={false}
        alwaysBounceVertical={false}
        ListHeaderComponent={
          <EnquiryInfoView
            item={item}
            enquiryId={enquiryId}
            navigation={navigation}
          />
        }
        renderItem={({item: tabOptions, index: idx}) => {
          return (
            <>
              <Spacer height={10} />
              <View style={styles.tabsContainer} key={`${idx}`}>
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
      <Spinner show={updateEnquiryStatusRequesting} />
    </View>
  );
};

export default EnquiryDetailsView;
