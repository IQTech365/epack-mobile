import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Spacer from '../../../../../common/Spacer';
import styles from './style';
import {formatDate5, formatPrice} from '../../../../../utils/formatter';
import {ISurveyListItem} from '../../../../../interface/enquiry/IAddSurveyItemRequest';
import {IGetSurveyItemListData} from '../../../../../interface/enquiry/IGetSurveyItemListResponse';
import ShareIcon from '../../../../../images/icons/share_icon.svg';
import DownloadIcon from '../../../../../images/icons/download_icon.svg';
import EditIcon from '../../../../../images/icons/edit2.svg';
import PreviewIcon from '../../../../../images/icons/preview_icon.svg';
import {useNavigation} from '@react-navigation/native';

interface ISurveyItemListViewProps {
  item: IGetSurveyItemListData;
  index: number;
  enquiryId:string;
  onShowPreview: (id:string) => void;
  onShare: (id:string) => void;
}

const SurveyItemListView: React.FC<ISurveyItemListViewProps> = ({
  item,
  index,
  enquiryId,
  onShowPreview,
  onShare,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.surveyDateAndNumberContainer} key={`${index}`}>
      <View style={styles.contentContainer}>
        <Text style={styles.contentLabelText2}>SURVEY DATE: </Text>
        <Spacer width={4} />
        <Text style={styles.contentLabelText}>
          {formatDate5(new Date(item.surveyDate))}
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.contentLabelText2}>{`SURVEY NO#: `}</Text>
        <Spacer width={4} />
        <Text style={styles.contentLabelText}>{item.surveyListNo}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.contentLabelText2}>{`TOTAL ITEMS: `}</Text>
        <Spacer width={4} />
        <Text style={styles.contentLabelText}>{item.surveyItems.length}</Text>
      </View>
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.action}
          onPress={() => {
            onShare(item._id);
          }}
          activeOpacity={0.6}>
          <ShareIcon width={24} height={24} />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.action}
          onPress={() => {}}
          activeOpacity={0.6}>
          <DownloadIcon width={24} height={24} />
          <Text style={styles.actionText}>Download</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.action}
          onPress={() => {
            onShowPreview(item._id);
          }}
          activeOpacity={0.6}>
          <PreviewIcon width={24} height={24} />
          <Text style={styles.actionText}>Preview</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.action}
          onPress={() => {
            //@ts-ignore
            navigation.navigate('EditSurveyItems', {item: item, enquiryId: enquiryId});
          }}
          activeOpacity={0.6}>
          <EditIcon width={24} height={24} />
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SurveyItemListView;
