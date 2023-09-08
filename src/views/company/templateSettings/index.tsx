import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import styles from './style';
import AvoidSoftInputViewHOC from '../../../common/AvoidSoftInputViewHOC';
import Spacer from '../../../common/Spacer';
import Input from '../../../common/Input';
import Button from '../../../common/Button';
import tabOptions from '../../../data/documentsDesignTabOptions.json';
import Tab from '../../../common/Tab';
import TemplateListView from './components/templateListView';
import mockTemplateData from '../../../data/mockTemplateData.json';

interface ITemplateSettingPageView {
  //
}

const TemplateSettingPageView: React.FC<ITemplateSettingPageView> = ({}) => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  const handleTabChange = (index: number) => {
    setActiveTabIndex(index);
  };

  const showSelectedTemplateView = () => {
    //
  }

  return (
    <View style={styles.container}>
      <AvoidSoftInputViewHOC>
        <>
          <Spacer />
          <Text style={styles.titleText}>
            Set Template Design for the documents
          </Text>
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
          <Spacer />
          <TemplateListView data={mockTemplateData} />
        </>
      </AvoidSoftInputViewHOC>
    </View>
  );
};

export default TemplateSettingPageView;
