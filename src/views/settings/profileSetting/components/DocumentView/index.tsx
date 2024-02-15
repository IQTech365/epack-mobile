import React, {useEffect, useState} from 'react';
import {View, FlatList, Text} from 'react-native';
import styles from './style';
import DocumentFormView from '../DocumentFormView';
import ActionHeaderView from '../../../../../common/ActionHeaderView';
import {getCurrentCompanyId} from '../../../../../utils/storage';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import {getDocumentsRequest} from '../../../../../redux/slices/ProfileSettingSlice';
import {IGetDocumentData} from '../../../../../interface/setting/packerProfile/document/IGetDocumentsResponse';
import DocumentListItem from './components/DocumentListItem';

const AddDocumentView = () => {
  const [showDocumentList, setShowDocumentList] = useState<boolean>(false);
  const [showAddDocument, setShowAddDocument] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const {
    getDocumentsRequesting,
    getDocumentsSuccess,
    getDocumentsFailure,
    documents,
  } = useAppSelector(state => state.Setting);

  const handleCreateNewDocument = () => {
    setShowDocumentList(false);
    setShowAddDocument(true);
  };

  const handleShowDocument = () => {
    setShowDocumentList(true);
    setShowAddDocument(false);
  };

  const showEmptyView = () => {
    return (
      <View style={styles.emptyContainer2}>
        <Text style={styles.text}>No content Found!</Text>
      </View>
    );
  };

  const showForm = () => {
    if (showAddDocument) {
      return <DocumentFormView onSuccess={handleShowDocument} />;
    }
    return null;
  };

  const _getDocumentList = (): IGetDocumentData[] => {
    let list: IGetDocumentData[] = [];
    const {data} = documents || {};
    if (data && Array.isArray(data) && data.length > 0) {
      list = data;
    }
    return list;
  };

  const _onDelete = (id: string) => {
    //
  };

  const showList = () => {
    if (showDocumentList) {
      return (
        <FlatList
          data={_getDocumentList()}
          renderItem={({item, index}) => (
            <DocumentListItem item={item} index={index} onDelete={_onDelete} />
          )}
          ListEmptyComponent={showEmptyView()}
        />
      );
    }
    return null;
  };

  const _getDocumentsRequest = () => {
    getCurrentCompanyId()
      .then(id => {
        dispatch(getDocumentsRequest(id as string));
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    _getDocumentsRequest();
  }, []);

  useEffect(() => {
    if (!getDocumentsRequesting && getDocumentsSuccess) {
      handleShowDocument;
    }
  }, [getDocumentsRequesting, getDocumentsSuccess, getDocumentsFailure]);

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <ActionHeaderView
        onCreate={handleCreateNewDocument}
        onShow={handleShowDocument}
        count={_getDocumentList().length}
      />
      {showForm()}
      {showList()}
    </View>
  );
};

export default AddDocumentView;
