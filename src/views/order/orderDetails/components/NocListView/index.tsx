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
import { INocDocRequest } from '../../../../../interface/order/IPackingMaterialResponse';

interface INocItemListViewProps {
  item: INocDocRequest;
  index: number;
  enquiryId: string;
  onShowPreview: (id: string) => void;
  onShare: (id: string) => void;
  isOrder?: boolean;
}

const NocListItemView: React.FC<INocItemListViewProps> = ({
  item,
  index,
  enquiryId,
  onShowPreview,
  onShare,
  isOrder,
}) => {
  const navigation = useNavigation();

  console.log("nocitem",item)

  return (
    <View style={styles.NocDateAndNumberContainer} key={`${index}`}>
      <View style={styles.contentContainer}>
        <Text style={styles.contentLabelText2}>NOC DATE: </Text>
        <Spacer width={4} />
        <Text style={styles.contentLabelText}>
          {formatDate5(new Date(item))}
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.contentLabelText2}>{`NOC TYPE#: `}</Text>
        <Spacer width={4} />
        <Text style={styles.contentLabelText}>{item}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.contentLabelText2}>{`LR no#: `}</Text>
        <Spacer width={4} />
        <Text style={styles.contentLabelText}>{item}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.contentLabelText2}>{`LR Date#: `}</Text>
        <Spacer width={4} />
        <Text style={styles.contentLabelText}>{item}</Text>
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
        //   onPress={() => {
        //     //@ts-ignore
        //     navigation.navigate('EditSurveyItems', {
        //       item: item,
        //       enquiryId: enquiryId,
        //     });
        //   }}
          activeOpacity={0.6}>
          {isOrder ?<EditDisabledIcon width={24} height={24} />:
              <EditIcon width={24} height={24} />}
          <Text style={isOrder ? styles.actionTextDisabled :styles.actionText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NocListItemView;
