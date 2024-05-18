import React, {FC} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './style';
import {IGetDocumentData} from '../../../../../../interface/setting/packerProfile/document/IGetDocumentsResponse';
import {Shadow} from 'react-native-shadow-2';
import DeleteIcon from '../../../../../../images/icons/delete.svg';
import EditIcon from '../../../../../../images/icons/edit_icon.svg';
import Spacer from '../../../../../../common/Spacer';
import { ISubmodule } from '../../../../../../interface/common/common';
import { useAppSelector } from '../../../../../../redux/hooks';

interface IProps {
  item: IGetDocumentData;
  index: number;
  onDelete: (id: string) => void;
  onEdit: (item:IGetDocumentData) => void;
}

const DocumentListItem: FC<IProps> = ({item, index, onDelete, onEdit}) => {
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

  const _transformSubmoduleIdToName = (moduleId: string[]): string[] => {
    let list: string[] = [];
    if (moduleId && moduleId.length > 0) {
      list = moduleId.map((d: string) => _getSubmoduleName(d));
    }
    return list;
  };
  return (
    <View style={styles.mainWrapper} key={`${index}`}>
      <Shadow style={styles.cardWrapper} distance={4}>
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <View style={[styles.rowContainer, styles.btlr, styles.btrr]}>
              <View style={[styles.labelContainer, styles.btlr]}>
                <Text style={styles.label}>Document Type:</Text>
              </View>
              <View style={[styles.valueContainer, styles.btrr]}>
                <Text style={styles.value}>{item.documentTypeTitle || item.documentType}</Text>
              </View>
            </View>
            <View style={[styles.rowContainer, styles.bblr, styles.bbrr]}>
              <View style={[styles.labelContainer, styles.bblr]}>
                <Text style={styles.label}>Document NO:</Text>
              </View>
              <View style={[styles.valueContainer, styles.bbrr]}>
                <Text style={styles.value}>{item.documentTypeValue}</Text>
              </View>
            </View>
            <View style={[styles.rowContainer, styles.bblr, styles.bbrr]}>
              <View style={[styles.labelContainer, styles.bblr]}>
                <Text style={styles.label}>Modules:</Text>
              </View>
              <View style={[styles.valueContainer, styles.bbrr]}>
                <Text style={styles.value}>
                {_transformSubmoduleIdToName(item.moduleId).join(', ')}
                  </Text>
              </View>
            </View>
          </View>
          <View style={styles.actionContainer}>
          <TouchableOpacity
              onPress={() => {
                onEdit(item);
              }}>
              <EditIcon width={25} height={25} />
            </TouchableOpacity>
            <Spacer height={10} />
            {/* <TouchableOpacity
              onPress={() => {
                onDelete(item._id);
              }}>
              <DeleteIcon width={25} height={25} />
            </TouchableOpacity> */}
          </View>
        </View>
      </Shadow>
    </View>
  );
};

export default DocumentListItem;
