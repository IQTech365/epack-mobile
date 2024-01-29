import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Spacer from '../../../../../../../common/Spacer';
import styles from './style';
import DeleteIcon from '../../../../../../../images/icons/delete.svg';
import {useAppSelector} from '../../../../../../../redux/hooks';
import {ISubmodule} from '../../../../../../../interface/common/common';

export interface IContactListItem {
  id: string;
  contactType: string;
  contactNumber: string;
  modules: string[];
}

interface IContactListItemProps {
  item: IContactListItem;
  onDelete: (id: string) => void;
}

const ContactListItem: React.FC<IContactListItemProps> = ({item, onDelete}) => {
  const {submodules} = useAppSelector(state => state.Common);

  const _getSubmodules = (): ISubmodule[] => {
    let items: ISubmodule[] = [];
    const {data} = submodules || {};
    if (data && Array.isArray(data) && data.length > 0) {
      items = data;
    }
    return items.filter((d: ISubmodule) => d.availableOnDocument);
  };

  const _getSubmoduleName = (submoduleId: string): string => {
    let name: string = '';
    const list: ISubmodule[] = _getSubmodules();
    if (list && list.length > 0) {
      const submodule: ISubmodule = list.find(
        (d: ISubmodule) => d._id == submoduleId,
      ) as ISubmodule;
      if (submodule) {
        name = submodule.subModuleName;
      }
    }
    return name;
  };

  const _transformSubmoduleIdToName = (modules: string[]): string[] => {
    let list: string[] = [];
    if (modules && modules.length > 0) {
      list = modules.map((d: string) => _getSubmoduleName(d));
    }
    return list;
  };

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
          <Text style={styles.text}>
            {_transformSubmoduleIdToName(item.modules).join(', ')}
          </Text>
        </View>
      </View>
      <View style={styles.actionContainer}>
        <TouchableOpacity
          onPress={() => {
            onDelete(item.id);
          }}>
          <DeleteIcon width={25} height={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ContactListItem;
