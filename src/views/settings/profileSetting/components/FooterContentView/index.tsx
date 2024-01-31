import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  useWindowDimensions,
} from 'react-native';
import styles from './style';
import Spacer from '../../../../../common/Spacer';
import FooterContentUpdateView from '../FooterContentFormView';
import ListViewIcon from '../../../../../images/icons/list_view_icon.svg';
import ListViewIcon2 from '../../../../../images/icons/list_view_icon2.svg';
import CreateIcon from '../../../../../images/icons/create_icon.svg';
import CreateIcon2 from '../../../../../images/icons/create_icon2.svg';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import {deleteFooterContentRequest, getFooterContentsRequest, resetDeleteFooterContentRequest} from '../../../../../redux/slices/ProfileSettingSlice';
import Spinner from '../../../../../common/Spinner';
import {getCurrentCompanyId} from '../../../../../utils/storage';
import {IGetFooterContentData} from '../../../../../interface/setting/packerProfile/footerContent/IGetFooterContentsResponse';
import FooterContentListItem from './FooterContentListItem';
import { ToastType, showToast } from '../../../../../utils/utility';

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
    if(!deleteFooterContentRequesting && deleteFooterContentSuccess) {
      showToast('Content Deleted', ToastType.SUCCESS);
      dispatch(resetDeleteFooterContentRequest());
      _getFooterContentsRequest();
    } else if(!deleteFooterContentRequesting && deleteFooterContentFailure) {
      showToast('Content Not Deleted. Try Again!', ToastType.ERROR);
      dispatch(resetDeleteFooterContentRequest());
    }
  }, [deleteFooterContentRequesting, deleteFooterContentSuccess, deleteFooterContentFailure]);

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
