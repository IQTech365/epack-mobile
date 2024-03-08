import React, {FC} from 'react';
import {Text, TouchableOpacity, View, useWindowDimensions} from 'react-native';
import styles from './style';
import {IGetFooterContentData} from '../../../../../interface/setting/packerProfile/footerContent/IGetFooterContentsResponse';
import RenderHtml from 'react-native-render-html';
import DeleteIcon from '../../../../../images/icons/delete.svg';
import EditIcon from '../../../../../images/icons/edit_icon.svg';
import Spacer from '../../../../../common/Spacer';

interface IProps {
  item: IGetFooterContentData;
  index: number;
  onDelete: (id: string) => void;
  onEdit: (item:IGetFooterContentData) => void;
}

const FooterContentListItem: FC<IProps> = ({item, index, onDelete, onEdit}) => {
  const {width} = useWindowDimensions();

  return (
    <View style={styles.listWrapper} key={`${index}`}>
      <View style={styles.listContentContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.contentTypeText}>{item.contentType}</Text>
        </View>
        <View style={styles.actionContainer}>
        <TouchableOpacity
            onPress={() => {
              onEdit(item);
            }}>
            <EditIcon width={25} height={25} />
          </TouchableOpacity>
          <Spacer width={10} />
          <TouchableOpacity
            onPress={() => {
              onDelete(item._id);
            }}>
            <DeleteIcon width={25} height={25} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.contentTypeContainer}>
        <RenderHtml contentWidth={width} source={{html: item.content}} />
      </View>
    </View>
  );
};

export default FooterContentListItem;
