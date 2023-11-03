import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './style';
import ShareIcon from '../../images/icons/share_icon.svg';
import DownloadIcon from '../../images/icons/download_icon.svg';
import EditIcon from '../../images/icons/create_icon.svg';
import PreviewIcon from '../../images/icons/preview_icon.svg';

export enum DOCUMENT_TYPE {
  QUOTATION,
  BILTY,
}

interface Props {
  documentType: DOCUMENT_TYPE;
  onDownload: () => void;
  onShare: () => void;
  onPreview: () => void;
  onEdit: () => void;
  show: boolean;
}

const DocumentActionView: React.FC<Props> = ({documentType, onDownload, onShare, onPreview, onEdit, show}) => {
  if (!show) return null;
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.action} onPress={onShare} activeOpacity={0.6}>
        <ShareIcon width={30} height={30} />
        <Text style={styles.actionText}>Share</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.action} onPress={onDownload} activeOpacity={0.6}>
        <DownloadIcon width={30} height={30} />
        <Text style={styles.actionText}>Download</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.action} onPress={onPreview} activeOpacity={0.6}>
        <PreviewIcon width={30} height={30} />
        <Text style={styles.actionText}>Preview</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.action} onPress={onEdit} activeOpacity={0.6}>
        <EditIcon width={30} height={30} />
        <Text style={styles.actionText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DocumentActionView;
