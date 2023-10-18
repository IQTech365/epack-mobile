import React, {useState} from 'react';
import {View, FlatList, Text, TouchableOpacity} from 'react-native';
import styles from './style';
import Spacer from '../../../../../common/Spacer';
import DocumentUpdateView from '../DocumentUpdateView';
import ListViewIcon from '../../../../../images/icons/list_view_icon.svg';
import ListViewIcon2 from '../../../../../images/icons/list_view_icon2.svg';
import CreateIcon from '../../../../../images/icons/create_icon.svg';
import CreateIcon2 from '../../../../../images/icons/create_icon2.svg';

const AddDocumentView = () => {
  const [showDocumentList, setShowDocumentList] = useState<boolean>(false);
  const [showAddDocument, setShowAddDocument] = useState<boolean>(true);

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
        <Text>No content Found!</Text>
      </View>
    );
  };

  const showForm = () => {
    if (showAddDocument) {
      return <DocumentUpdateView />;
    }
    return null;
  };

  const showList = () => {
    if (showDocumentList) {
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

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <View style={styles.container2}>
        <TouchableOpacity onPress={handleShowDocument} activeOpacity={0.4}>
          {showDocumentList ? (
            <ListViewIcon2 width={30} height={30} />
          ) : (
            <ListViewIcon width={30} height={30} />
          )}
        </TouchableOpacity>
        <Spacer width={10} />
        <TouchableOpacity onPress={handleCreateNewDocument} activeOpacity={0.4}>
          {showAddDocument ? (
            <CreateIcon2 width={30} height={30} />
          ) : (
            <CreateIcon width={30} height={30} />
          )}
        </TouchableOpacity>
        <Spacer width={10} />
      </View>
      {showForm()}
      {showList()}
    </View>
  );
};

export default AddDocumentView;
