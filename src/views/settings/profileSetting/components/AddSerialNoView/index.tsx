import React, {useRef, useState} from 'react';
import {View, FlatList} from 'react-native';
import styles from './style';
import BottomSheet from '@gorhom/bottom-sheet';
import FormModal from '../../../formModal';
import Header from '../../../../../common/Header';
import serialNo from '../../../../../data/serialNo.json';
import SerialNoSettingPageView from '../../../../company/serialNoSettings';
import Spacer from '../../../../../common/Spacer';
import EmptyView from '../../../emptyView';
import Tab from '../../../../../common/Tab';
import Label from '../../../../../common/Label';
import DropdownComponent from '../../../../../common/DropdownComponent';
import accountTypeOptions from '../../../../../data/accountType.json';
import { TDropdownItem } from '../../../../../type/TDropdownItem';
import Input from '../../../../../common/Input';
import { COLOR_BLACK } from '../../../../../utils/colors';
import Button from '../../../../../common/Button';
import AddSerialNoUpdateView from '../AddSerialNoUpdateView';

const AddSerialNoView = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  const presentModal = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };

  const dismissModal = () => {
    bottomSheetRef.current?.close();
  };

  
  const handleTabChange = (index: number) => {
    setActiveTabIndex(index);
  };

  const handleAccountType = (item: TDropdownItem) => {
    // setAccountType(item.label);
  };
  
  const showTabItem = () => {
    switch (activeTabIndex) {
      case 0:
       return <AddSerialNoUpdateView/>
      case 1:
        return <AddSerialNoUpdateView/>
      case 2:
        return <AddSerialNoUpdateView/>
      case 3:
        return <AddSerialNoUpdateView/>
      case 4:
        return <AddSerialNoUpdateView/>
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
      <FlatList
        data={[]}
        contentContainerStyle={{
          // flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        renderItem={({item, index}) => null}
        ListEmptyComponent={
          <EmptyView message="No Serial Number Added" onPress={presentModal} />
        }
      />
      <FormModal ref={bottomSheetRef} onClose={dismissModal}>
        <SerialNoSettingPageView />
      </FormModal>
    </View>
  );
};

export default AddSerialNoView;
