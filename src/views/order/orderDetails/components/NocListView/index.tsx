import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Spacer from '../../../../../common/Spacer';
import styles from './style';
import { formatDate5, formatPrice } from '../../../../../utils/formatter';
import { IGetSurveyItemListData } from '../../../../../interface/enquiry/IGetSurveyItemListResponse';
import ShareIcon from '../../../../../images/icons/share_icon.svg';
import EditIcon from '../../../../../images/icons/edit2.svg';
import PreviewIcon from '../../../../../images/icons/preview_icon.svg';
import { useNavigation } from '@react-navigation/native';
import EditDisabledIcon from '../../../../../../src/images/icons/edit_disabled.svg'
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../../../redux/hooks';
import { getNocDocRequest } from '../../../../../redux/slices/OrderSlice';
import { IGetNocListResponse } from '../../../../../interface/order/IGetNocListResponse';
import { COLOR_BLACK } from '../../../../../utils/colors';
import { getCurrentCompanyId } from '../../../../../utils/storage';

interface INocItemListViewProps {
  item: IGetNocListResponse[];
  index: number;
  orderId: string;
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
  orderId
}) => {
  const { getNocDoc } = useAppSelector(state => state.Order);
  const { data } = getNocDoc || {};
  const dispatch = useDispatch();

  return (
    <>
      {data && data.length > 0 ? (
        data.map((nocItem: any, idx: number) => (
          <View style={styles.NocDateAndNumberContainer} key={idx}>
            <View style={styles.contentContainer}>
              <Text style={styles.contentLabelText2}>NOC DATE: </Text>
              <Spacer width={4} />
              <Text style={styles.contentLabelText}>
                {formatDate5(new Date(nocItem.nocDate))}
              </Text>
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.contentLabelText2}>{`NOC TYPE#: `}</Text>
              <Spacer width={4} />
              <Text style={styles.contentLabelText}>{nocItem.nocType}</Text>
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.contentLabelText2}>{`LR no#: `}</Text>
              <Spacer width={4} />
              <Text style={styles.contentLabelText}>{nocItem.biltyNo}</Text>
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.contentLabelText2}>{`LR Date#: `}</Text>
              <Spacer width={4} />
              <Text style={styles.contentLabelText}>
                {formatDate5(new Date(nocItem.biltyDate))}
              </Text>
            </View>
            <View style={styles.actionContainer}>
              <TouchableOpacity
                style={styles.action}
                onPress={() => onShare(nocItem._id)}
                activeOpacity={0.6}>
                <ShareIcon width={24} height={24} />
                <Text style={styles.actionText}>Share</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.action}
                onPress={() => onShowPreview(nocItem._id)}
                activeOpacity={0.6}>
                <PreviewIcon width={24} height={24} />
                <Text style={styles.actionText}>Preview</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.action}
                disabled={isOrder}
                activeOpacity={0.6}>
                {isOrder ? (
                  <EditDisabledIcon width={24} height={24} />
                ) : (
                  <EditIcon width={24} height={24} />
                )}
                <Text style={isOrder ? styles.actionTextDisabled : styles.actionText}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : <Text style={{textAlign:"center",  color: COLOR_BLACK,
        fontSize: 14,
        fontFamily: 'WorkSans-Regular'}}>NOC Data is not Available</Text> }
    </>
  );
};

export default NocListItemView;
