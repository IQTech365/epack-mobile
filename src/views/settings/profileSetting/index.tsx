/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import Header from '../../../common/Header';
import Spacer from '../../../common/Spacer';
import styles from './style';
import profileSettingsTabOptions from '../../../data/profileSettingsTabOptions.json';
import Tab from '../../../common/Tab';
import AddAccountView from './components/AddAccountView';
import AddContactView from './components/AddContactView';
import AddDocumentView from './components/AddDocumentView';
import AddFooterContentView from './components/AddFooterContentView';
import AddSignatureView from './components/AddSignatureView';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getSubmodulesRequest } from '../../../redux/slices/ProfileSettingSlice';
import Spinner from '../../../common/Spinner';

const PackersProfileSetting = (props: any) => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const dispatch = useAppDispatch();
  const {getSubmoduleRequesting} = useAppSelector(state => state.Setting);

  const handleTabChange = (index: number) => {
    setActiveTabIndex(index);
  };

  const showTabItem = () => {
    switch (activeTabIndex) {
      case 0:
        return <AddContactView />;
      case 1:
        return <AddAccountView />;
      case 2:
        return <AddFooterContentView />;
      case 3:
        return <AddDocumentView />;
      case 4:
        return <AddSignatureView />;
      default:
        return null;
    }
  };

  useEffect(() => {
    dispatch(getSubmodulesRequest());
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
      <Spinner show={getSubmoduleRequesting} />
    </View>
  );
};

export default PackersProfileSetting;
