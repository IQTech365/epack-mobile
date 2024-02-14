import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Text,
} from 'react-native';
import styles from './style';

import FooterContentUpdateView from '../FooterContentFormView';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import {
  deleteFooterContentRequest,
  getFooterContentsRequest,
  resetDeleteFooterContentRequest,
} from '../../../../../redux/slices/ProfileSettingSlice';
import Spinner from '../../../../../common/Spinner';
import {getCurrentCompanyId} from '../../../../../utils/storage';
import {IGetFooterContentData} from '../../../../../interface/setting/packerProfile/footerContent/IGetFooterContentsResponse';
import FooterContentListItem from './FooterContentListItem';
import {ToastType, showToast} from '../../../../../utils/utility';
import ActionHeaderView from '../../../../../common/ActionHeaderView';

const AddFooterContentView = () => {
  const [showContentList, setShowContentList] = useState<boolean>(false);
  const [showAddContent, setShowAddContent] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const {
    footerContents,
    getFooterContentsRequesting,
    deleteFooterContentRequesting,
    deleteFooterContentSuccess,
    deleteFooterContentFailure,
  } = useAppSelector(state => state.Setting);

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
          data={_getContents()}
          renderItem={({item, index}) => (
            <FooterContentListItem
              item={item}
              index={index}
              onDelete={_handleDeleteContent}
            />
          )}
          ListEmptyComponent={showEmptyView()}
        />
      );
    }
    return null;
  };

  const _getFooterContentsRequest = () => {
    getCurrentCompanyId()
      .then(id => {
        dispatch(getFooterContentsRequest(id as string));
      })
      .catch(err => console.log(err));
  };

  const _getContents = (): IGetFooterContentData[] => {
    let list: IGetFooterContentData[] = [];
    const {data} = footerContents || {};
    if (data && Array.isArray(data) && data.length > 0) {
      list = data as IGetFooterContentData[];
    }
    return list;
  };

  const _handleDeleteContent = (id: string) => {
    dispatch(deleteFooterContentRequest(id));
  };

  useEffect(() => {
    _getFooterContentsRequest();
  }, []);

  useEffect(() => {
    if (!deleteFooterContentRequesting && deleteFooterContentSuccess) {
      showToast('Content Deleted', ToastType.SUCCESS);
      dispatch(resetDeleteFooterContentRequest());
      _getFooterContentsRequest();
    } else if (!deleteFooterContentRequesting && deleteFooterContentFailure) {
      showToast('Content Not Deleted. Try Again!', ToastType.ERROR);
      dispatch(resetDeleteFooterContentRequest());
    }
  }, [
    deleteFooterContentRequesting,
    deleteFooterContentSuccess,
    deleteFooterContentFailure,
  ]);

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <ActionHeaderView
        count={0}
        onCreate={handleCreateNewContent}
        onShow={handleShowContent}
      />
      {showForm()}
      {showList()}
      <Spinner show={getFooterContentsRequesting} />
    </View>
  );
};

export default AddFooterContentView;
