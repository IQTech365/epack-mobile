import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './style';
import ShareIcon from '../../images/icons/share_icon.svg';
import DownloadIcon from '../../images/icons/download_icon.svg';
import EditIcon from '../../images/icons/edit2.svg';
import EditDisabledIcon from '../../images/icons/edit_disabled.svg';
import PreviewIcon from '../../images/icons/preview_icon.svg';

interface Props {
  isOrder?: boolean;
  onDownload: () => void;
  onShare: () => void;
  onPreview: () => void;
  onEdit: () => void;
  show: boolean;
}

const DocumentActionView: React.FC<Props> = ({
  isOrder,
  onDownload,
  onShare,
  onPreview,
  onEdit,
  show,
}) => {
  if (!show) return null;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.action}
        onPress={onShare}
        activeOpacity={0.6}>
        <ShareIcon width={24} height={24} />
        <Text style={styles.actionText}>Share</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.action} onPress={onDownload} activeOpacity={0.6}>
        <DownloadIcon width={24} height={24} />
        <Text style={styles.actionText}>Download</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={styles.action}
        onPress={onPreview}
        activeOpacity={0.6}>
        <PreviewIcon width={24} height={24} />
        <Text style={styles.actionText}>Preview</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.action}
        onPress={onEdit}
        disabled={isOrder}
        activeOpacity={0.6}>
        {isOrder ? (
          <EditDisabledIcon width={24} height={24} />
        ) : (
          <EditIcon width={24} height={24} />
        )}
        <Text style={isOrder ? styles.actionTextDisabled : styles.actionText}>
          Edit
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DocumentActionView;
