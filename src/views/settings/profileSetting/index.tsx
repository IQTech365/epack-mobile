/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import Header from '../../../common/Header';
import Spacer from '../../../common/Spacer';
import styles from './style';
import profileSettingsTabOptions from '../../../data/profileSettingsTabOptions.json';
import Tab from '../../../common/Tab';
import AccountView from './components/AccountView';
import ContactView from './components/ContactView';
import DocumentView from './components/DocumentView';
import FooterContentView from './components/FooterContentView';
import SignatureView from './components/SignatureView';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import Spinner from '../../../common/Spinner';
import { getSubmoduleRequest } from '../../../redux/slices/CommonSlice';

const PackersProfileSetting = (props: any) => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const dispatch = useAppDispatch();
  const {getSubmodulesRequesting} = useAppSelector(state => state.Common);

  const handleTabChange = (index: number) => {
    setActiveTabIndex(index);
  };

  const showTabItem = () => {
    switch (activeTabIndex) {
      case 0:
        return <ContactView />;
      case 1:
        return <AccountView />;
      case 2:
        return <FooterContentView />;
      case 3:
        return <DocumentView />;
      case 4:
        return <SignatureView />;
      default:
        return null;
    }
  };

  useEffect(() => {
    dispatch(getSubmoduleRequest());
  }, []);

  return (
    <View style={styles.container}>
      <Header canGoBack={true} label="Packers Profile" />
      <Spacer height={4} />
      <View style={styles.tabsContainer}>
        <FlatList
          style={{paddingHorizontal: 8}}
          data={profileSettingsTabOptions}
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
      <Spinner show={getSubmodulesRequesting} />
    </View>
  );
};

export default PackersProfileSetting;
