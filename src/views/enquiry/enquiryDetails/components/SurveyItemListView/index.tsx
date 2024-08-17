import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Spacer from '../../../../../common/Spacer';
import styles from './style';
import {formatDate5, formatPrice} from '../../../../../utils/formatter';
import {ISurveyListItem} from '../../../../../interface/enquiry/IAddSurveyItemRequest';
import {IGetSurveyItemListData} from '../../../../../interface/enquiry/IGetSurveyItemListResponse';
import ShareIcon from '../../../../../images/icons/share_icon.svg';
import EditIcon from '../../../../../images/icons/edit2.svg';
import PreviewIcon from '../../../../../images/icons/preview_icon.svg';
import {useNavigation} from '@react-navigation/native';
import EditDisabledIcon from '../../../../../../src/images/icons/edit_disabled.svg'

interface ISurveyItemListViewProps {
  item: IGetSurveyItemListData;
  index: number;
  enquiryId: string;
  onShowPreview: (id: string) => void;
  onShare: (id: string) => void;
  isOrder?: boolean;
}

const SurveyItemListView: React.FC<ISurveyItemListViewProps> = ({
  item,
  index,
  enquiryId,
  onShowPreview,
  onShare,
  isOrder,
}) => {
  const navigation = useNavigation();

  const getTotalCFT = () => {
    let cftCount:number = 0;
    if(item.surveyItems && item.surveyItems.length > 0) {
      cftCount = item.surveyItems.reduce((acc, curr) => {
        if(curr.cftValue) {
          return acc + parseInt(curr?.cftValue as string);
        } else {
          return acc;
        }
      }, 0)
    }
    return cftCount;
  }

  return (
    <View style={styles.surveyDateAndNumberContainer} key={`${index}`}>
      <View style={styles.contentContainer}>
        <Text style={styles.contentLabelText2}>SURVEY DATE: </Text>
        <Spacer width={4} />
        <Text style={styles.contentLabelText}>
          {formatDate5(new Date(item.createdDate))}
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.contentLabelText2}>{`SURVEY NO#: `}</Text>
        <Spacer width={4} />
        <Text style={styles.contentLabelText}>{item.surveyListNo}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.contentLabelText2}>{`Total CFT: `}</Text>
        <Spacer width={4} />
        <Text style={styles.contentLabelText}>{getTotalCFT()}</Text>
      </View> 
      <View style={styles.contentContainer}>
        <Text style={styles.contentLabelText2}>{`TOTAL ITEMS: `}</Text>
        <Spacer width={4} />
        <Text style={styles.contentLabelText}>{item?.surveyItems?.length}</Text>
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
          disabled={isOrder}
          onPress={() => {
            //@ts-ignore
            navigation.navigate('EditSurveyItems', {
              item: item,
              enquiryId: enquiryId,
            });
          }}
          activeOpacity={0.6}>
          {isOrder ?<EditDisabledIcon width={24} height={24} />:
              <EditIcon width={24} height={24} />}
          <Text style={isOrder ? styles.actionTextDisabled :styles.actionText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SurveyItemListView;
