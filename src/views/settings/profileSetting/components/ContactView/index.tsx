import React, {useEffect, useState} from 'react';
import {View, FlatList, Text, TouchableOpacity} from 'react-native';
import styles from './style';
import ContactDetailUpdateView from '../ContactFormView';
import ListViewIcon from '../../../../../images/icons/list_view_icon.svg';
import ListViewIcon2 from '../../../../../images/icons/list_view_icon2.svg';
import CreateIcon from '../../../../../images/icons/create_icon.svg';
import CreateIcon2 from '../../../../../images/icons/create_icon2.svg';
import Spacer from '../../../../../common/Spacer';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import {deleteContactRequest, getContactsRequest, resetDeleteContactRequest} from '../../../../../redux/slices/ProfileSettingSlice';
import Spinner from '../../../../../common/Spinner';
import ContactListItem, {
  IContactListItem,
} from './components/ContactDetailListItem';
import {IGetContactDetailsData} from '../../../../../interface/setting/packerProfile/contactDetail/IGetContactDetailsResponse';
import {getCurrentCompanyId} from '../../../../../utils/storage';
import { ToastType, showToast } from '../../../../../utils/utility';

const AddContactView = () => {
  const [showContactList, setShowContactList] = useState<boolean>(false);
  const [showAddContact, setShowAddContact] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const {
    getContactsRequesting,
    contacts,
    deleteContactRequesting,
    deleteContactSuccess,
    deleteContactFailure,
  } = useAppSelector(state => state.Setting);
  const {data: contactsData} = contacts || {};

  const getTransformedData = () => {
    let _data: IContactListItem[] = [];
    if (
      contactsData &&
      Array.isArray(contactsData) &&
      contactsData.length > 0
    ) {
      _data = contactsData.map((e: IGetContactDetailsData) => {
        const item: IContactListItem = {
          id: e._id,
          contactType: e.contactType,
          contactNumber: e.contactValue,
          modules: e.modulesView,
        };
        return item;
      });
    }
    return _data;
  };

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
        <Text style={styles.text}>No contact Info Found!</Text>
      </View>
    );
  };

  const showForm = () => {
    if (showAddContact) {
      return <ContactDetailUpdateView />;
    }
    return null;
  };

  const _handleDeleteContact = (contactId: string) => {
    dispatch(deleteContactRequest(contactId));
  };

  const showList = () => {
    if (showContactList) {
      return (
        <FlatList
          data={getTransformedData()}
          renderItem={({item, index}) => (
            <ContactListItem item={item} onDelete={_handleDeleteContact} />
          )}
          ListEmptyComponent={showEmptyView()}
        />
      );
    }
    return null;
  };

  const _getContactsRequest = () => {
    getCurrentCompanyId()
      .then(id => {
        dispatch(getContactsRequest(id as string));
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    _getContactsRequest();
  }, []);

  useEffect(() => {
    if (
      !getContactsRequesting &&
      contactsData &&
      Array.isArray(contactsData) &&
      contactsData.length > 0
    ) {
      setShowContactList(true);
      setShowAddContact(false);
    }
  }, [contactsData]);

  useEffect(() => {
    if(!deleteContactRequesting && deleteContactSuccess) {
      showToast('Contact Deleted', ToastType.SUCCESS);
      dispatch(resetDeleteContactRequest());
      _getContactsRequest();
    } else if(!deleteContactRequesting && deleteContactFailure) {
      showToast('Contact Not Deleted. Try Again!', ToastType.ERROR);
      dispatch(resetDeleteContactRequest());
    }
  }, [deleteContactRequesting, deleteContactSuccess, deleteContactFailure]);

  if (getContactsRequesting) {
    return <Spinner show={getContactsRequesting} />;
  }

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
      <Spinner show={deleteContactRequesting}/>
    </View>
  );
};

export default AddContactView;
