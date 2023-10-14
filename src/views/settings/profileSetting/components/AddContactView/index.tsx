import React, {useState} from 'react';
import {View, FlatList, Text, TouchableOpacity} from 'react-native';
import styles from './style';
import ContactDetailUpdateView from '../contactDetailUpdateView';
import ListViewIcon from '../../../../../images/icons/list_view_icon.svg';
import ListViewIcon2 from '../../../../../images/icons/list_view_icon2.svg';
import CreateIcon from '../../../../../images/icons/create_icon.svg';
import CreateIcon2 from '../../../../../images/icons/create_icon2.svg';
import Spacer from '../../../../../common/Spacer';

const AddContactView = () => {
  const [showContactList, setShowContactList] = useState<boolean>(false);
  const [showAddContact, setShowAddContact] = useState<boolean>(true);

  const handleCreateNewContact = () => {
    setShowContactList(false);
    setShowAddContact(true);
  };

  const handleShowContact = () => {
    setShowContactList(true);
    setShowAddContact(false);
  };

  const showEmptyView = () => {
    return (
      <View style={styles.emptyContainer2}>
        <Text>No contact Info Found!</Text>
      </View>
    );
  };

  const showForm = () => {
    if (showAddContact) {
      return <ContactDetailUpdateView />;
    }
    return null;
  };

  const showList = () => {
    if (showContactList) {
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
    <View style={styles.container}>
      <View style={styles.container2}>
        <TouchableOpacity onPress={handleShowContact} activeOpacity={0.4}>
          {showContactList ? (
            <ListViewIcon2 width={30} height={30} />
          ) : (
            <ListViewIcon width={30} height={30} />
          )}
        </TouchableOpacity>
        <Spacer width={10} />
        <TouchableOpacity onPress={handleCreateNewContact} activeOpacity={0.4}>
          {showAddContact ? (
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

export default AddContactView;
