import React, {FC} from 'react';
import {Text, TouchableOpacity, View, useWindowDimensions} from 'react-native';
import styles from './style';
import {IGetFooterContentData} from '../../../../../interface/setting/packerProfile/footerContent/IGetFooterContentsResponse';
import RenderHtml from 'react-native-render-html';
import DeleteIcon from '../../../../../images/icons/delete.svg';
import EditIcon from '../../../../../images/icons/edit_icon.svg';
import Spacer from '../../../../../common/Spacer';
import { ISubmodule } from '../../../../../interface/common/common';
import { useAppSelector } from '../../../../../redux/hooks';

interface IProps {
  item: IGetFooterContentData;
  index: number;
  onDelete: (id: string) => void;
  onEdit: (item:IGetFooterContentData) => void;

}

const FooterContentListItem: FC<IProps> = ({item, index, onDelete, onEdit}) => {
  const {submodules} = useAppSelector(state => state.Common);

  const {width} = useWindowDimensions();

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
    <View style={styles.listWrapper} key={`${index}`}>
      <View style={styles.listContentContainer}>
      <View style={styles.contentContainer}>
        <Text style={styles.contentTypeText}>
          {item.contentType === 'Other' ? item.title : item.contentType}
        </Text>
      </View>

        <View style={styles.actionContainer}>
        <TouchableOpacity
            onPress={() => {
              onEdit(item);
            }}>
            <EditIcon width={25} height={25} />
          </TouchableOpacity>
          <Spacer width={10} />
          {/* <TouchableOpacity
            onPress={() => {
              onDelete(item._id);
            }}>
            <DeleteIcon width={25} height={25} />
          </TouchableOpacity> */}
        </View>
      </View>
      <View style={styles.contentTypeContainer}>
        <RenderHtml contentWidth={width} source={{html: item.content}} />
      </View>
      <View>
        <Text style={styles.label}>
        modules: <Text style={styles.value}>
        {_transformSubmoduleIdToName(item.moduleId).join(', ')}
        </Text>
        </Text>
      </View>
    </View>
  );
};

export default FooterContentListItem;
