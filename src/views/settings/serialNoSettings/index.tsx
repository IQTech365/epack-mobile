import React, {useEffect, useState} from 'react';
import {View, FlatList, Text, RefreshControl} from 'react-native';
import styles from './style';
import Header from '../../../common/Header';
import Spacer from '../../../common/Spacer';
import Tab from '../../../common/Tab';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import Spinner from '../../../common/Spinner';
import {
  getAppSettingsRequest,
  getSubmoduleRequest,
} from '../../../redux/slices/CommonSlice';
import {IAppSetting, ISubmodule} from '../../../interface/common/common';
import SerialNoListItem from './SerialNoSettingListItem';
import SerilaNoSettingFormView from './SerialNoSettingFormView';
import useCompanyId from '../../../hooks/useCompanyId';

const AddSerialNoView = () => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const [selectedSubmodule, setSelectedSubmodule] = useState<ISubmodule>();
  const dispatch = useAppDispatch();
  const companyId = useCompanyId();

  const {
    getSubmodulesRequesting,
    submodules,
    appSettings,
    getAppSettingsRequesting,
  } = useAppSelector(state => state.Common);
  const handleTabChange = (index: number) => {
    setActiveTabIndex(index);
    _setSubmoduleByIndex(index);
  };

  const _getSubmodules = (): ISubmodule[] => {
    let items: ISubmodule[] = [];
    const {data} = submodules || {};
    if (data && Array.isArray(data) && data.length > 0) {
      items = data;
    }
    return items;
  };

  const _setSubmoduleByIndex = (index: number) => {
    const {data} = submodules || {};
    if (data && Array.isArray(data) && data.length > 0) {
      const firstSubmodule: ISubmodule = data[index];
      setSelectedSubmodule(firstSubmodule);
    }
  };

  const _getSerialNoSettingsBySubmoduleId = () => {
    let settings: IAppSetting[] = [];
    const {data} = appSettings || {};
    if (data && Array.isArray(data) && data.length > 0) {
      settings = data.filter(
        (d: IAppSetting) => d.subModuleId == selectedSubmodule?._id,
      );
    }
    return settings;
  };

  const _getAppSettingsRequest = () => {
    dispatch(getAppSettingsRequest(companyId));
  }

  const handleOnRefresh = () => {
    _getAppSettingsRequest();
  };

  useEffect(() => {
    dispatch(getSubmoduleRequest());
    _getAppSettingsRequest();
  }, []);

  useEffect(() => {
    if (submodules) {
      _setSubmoduleByIndex(0);
    }
  }, [submodules]);

  const showEmptyView = () => {
    return (
      <View style={styles.emptyContainer2}>
        <Text>No Serial No.# Found!</Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#ffff', alignItems: 'center'}}>
      <Header canGoBack={true} label="Serial No Setting" />
      <Spacer height={10} />
      <View style={styles.tabsContainer}>
        <FlatList
          style={{paddingHorizontal: 8}}
          data={_getSubmodules()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <Tab
              label={item.subModuleName.toUpperCase()}
              index={index}
              onPress={handleTabChange}
              activeIndex={activeTabIndex}
            />
          )}
        />
      </View>
      <Spacer height={10} />
      <FlatList
        contentContainerStyle={{alignItems: 'center'}}
        data={_getSerialNoSettingsBySubmoduleId()}
        refreshControl={
          <RefreshControl
            refreshing={getAppSettingsRequesting}
            onRefresh={handleOnRefresh}
          />
        }
        renderItem={({item, index}) => (
          <SerialNoListItem
            item={item}
            moduleName={selectedSubmodule?.subModuleName as string}
          />
        )}
        ListEmptyComponent={showEmptyView()}
        ListHeaderComponent={
          <SerilaNoSettingFormView
            moduleId={selectedSubmodule?._id as string}
            moduleName={
              selectedSubmodule?.subModuleName.toUpperCase() as string
            }
          />
        }
      />
      <Spinner show={getSubmodulesRequesting || getAppSettingsRequesting} />
      <Spacer height={8} />
    </View>
  );
};

export default AddSerialNoView;
