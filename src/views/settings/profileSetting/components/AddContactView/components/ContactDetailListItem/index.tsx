import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Spacer from '../../../../../../../common/Spacer';
import styles from './style';
import DeleteIcon from '../../../../../../../images/icons/delete.svg';

export interface IContactListItem {
  contactType: string;
  contactNumber: string;
  modules: string[];
}

interface IContactListItemProps {
  item: IContactListItem;
  onDelete: () => void;
}

const ContactListItem: React.FC<IContactListItemProps> = ({item}) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.content}>
          <Text style={styles.label}>Contact Type:</Text>
          <Text style={styles.text}>{item.contactType}</Text>
        </View>
        <Spacer height={4} />
        <View style={styles.content}>
          <Text style={styles.label}>Contact Info:</Text>
          <Text style={styles.text}>{item.contactNumber}</Text>
        </View>
        <Spacer height={4} />
        <View style={styles.content}>
          <Text style={styles.label}>Modules:</Text>
          <Text style={styles.text}>{item.modules.join(', ')}</Text>
        </View>
      </View>
      <View style={styles.actionContainer}>
        <TouchableOpacity>
          <DeleteIcon width={25} height={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ContactListItem;
