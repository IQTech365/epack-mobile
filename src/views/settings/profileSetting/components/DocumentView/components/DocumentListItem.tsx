import React, {FC} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './style';
import {IGetDocumentData} from '../../../../../../interface/setting/packerProfile/document/IGetDocumentsResponse';
import {Shadow} from 'react-native-shadow-2';
import DeleteIcon from '../../../../../../images/icons/delete.svg';

interface IProps {
  item: IGetDocumentData;
  index: number;
  onDelete: (id: string) => void;
}

const DocumentListItem: FC<IProps> = ({item, index, onDelete}) => {
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
          </View>
          <View style={styles.actionContainer}>
            <TouchableOpacity
              onPress={() => {
                onDelete(item._id);
              }}>
              <DeleteIcon width={25} height={25} />
            </TouchableOpacity>
          </View>
        </View>
      </Shadow>
    </View>
  );
};

export default DocumentListItem;
