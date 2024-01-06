import React, {useEffect, useState} from 'react';
import {View, FlatList, TouchableOpacity, Text} from 'react-native';
import styles from './style';
import Spacer from '../../../../../common/Spacer';
import FooterContentUpdateView from '../FooterContentUpdateView';
import ListViewIcon from '../../../../../images/icons/list_view_icon.svg';
import ListViewIcon2 from '../../../../../images/icons/list_view_icon2.svg';
import CreateIcon from '../../../../../images/icons/create_icon.svg';
import CreateIcon2 from '../../../../../images/icons/create_icon2.svg';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { getFooterContentsRequest } from '../../../../../redux/slices/ProfileSettingSlice';
import Spinner from '../../../../../common/Spinner';
import useCompanyId from '../../../../../hooks/useCompanyId';

const AddFooterContentView = () => {
  const [showContentList, setShowContentList] = useState<boolean>(false);
  const [showAddContent, setShowAddContent] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const companyId = useCompanyId();
  const {
    footerContents,
    getFooterContentsRequesting,
    getFooterContentsSuccess,
    getFooterContentsFailure,
  } = useAppSelector(state => state.Setting);
  console.log('FooterContents-', JSON.stringify(footerContents));

  const handleCreateNewContent = () => {
    setShowContentList(false);
    setShowAddContent(true);
  };

  const handleShowContent = () => {
    setShowContentList(true);
    setShowAddContent(false);
  };

  const showEmptyView = () => {
    return (
      <View style={styles.emptyContainer2}>
        <Text style={styles.text}>No content Found!</Text>
      </View>
    );
  };

  const showForm = () => {
    if (showAddContent) {
      return <FooterContentUpdateView />;
    }
    return null;
  };

  const showList = () => {
    if (showContentList) {
      return (
        <FlatList
          data={[]}
          renderItem={({item, index}) => <Text>Hello</Text>}
          ListEmptyComponent={showEmptyView()}
        />
      );
    }
    return null;
  };

  const _getFooterContentsRequest = () => {
    
    dispatch(getFooterContentsRequest(companyId));
  }

  useEffect(() => {
    _getFooterContentsRequest();
  }, []);

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <View style={styles.container2}>
        <TouchableOpacity onPress={handleShowContent} activeOpacity={0.4}>
          {showContentList ? (
            <ListViewIcon2 width={30} height={30} />
          ) : (
            <ListViewIcon width={30} height={30} />
          )}
        </TouchableOpacity>
        <Spacer width={10} />
        <TouchableOpacity onPress={handleCreateNewContent} activeOpacity={0.4}>
          {showAddContent ? (
            <CreateIcon2 width={30} height={30} />
          ) : (
            <CreateIcon width={30} height={30} />
          )}
        </TouchableOpacity>
        <Spacer width={10} />
      </View>
      {showForm()}
      {showList()}
      <Spinner show={getFooterContentsRequesting} />
    </View>
  );
};

export default AddFooterContentView;
