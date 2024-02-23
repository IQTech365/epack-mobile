import React, {FC} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import {IPackingListData} from '../../../../../interface/order/IPackingMaterialResponse';
import {
  COLOR_BLACK,
  COLOR_GRAY4,
  COLOR_GRAY6,
} from '../../../../../utils/colors';
import {formatDate5} from '../../../../../utils/formatter';
import ShareIcon from '../../../../../images/icons/share_icon.svg';
import EditIcon from '../../../../../images/icons/edit2.svg';
import PreviewIcon from '../../../../../images/icons/preview_icon.svg';
import Spacer from '../../../../../common/Spacer';

interface IProps {
  item: IPackingListData;
  index: number;
  onShare: (id:string) => void;
  onShowPreview: (id:string) => void;
}

const PackingListItem: FC<IProps> = ({item, index, onShare, onShowPreview}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.contentLabelText2}>DATE:</Text>
        <Spacer width={4} />
        <Text style={styles.contentLabelText}>
          {formatDate5(new Date(item.createdDate))}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.contentLabelText2}>PACKING NO#:</Text>
        <Spacer width={4} />
        <Text style={styles.contentLabelText}>{item.packingListNo}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.contentLabelText2}>TOTAL ITEMS:</Text>
        <Spacer width={4} />
        <Text style={styles.contentLabelText}>{item.packingItems.length}</Text>
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
          onPress={() => {
            //@ts-ignore
            // navigation.navigate('EditSurveyItems', {
            //   item: item,
            //   enquiryId: enquiryId,
            // });
          }}
          activeOpacity={0.6}>
          <EditIcon width={24} height={24} />
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    alignSelf: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLOR_GRAY4,
    borderRadius: 5,
  },
  row: {
    width: width * 0.9,
    alignSelf: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    padding: 8,
  },
  actionContainer: {
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    backgroundColor: COLOR_GRAY6,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  actionText: {
    color: COLOR_BLACK,
    fontSize: 16,
    fontFamily: 'WorkSans-Regular',
  },
  action: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentLabelText: {
    color: COLOR_BLACK,
    fontSize: 14,
    fontFamily: 'WorkSans-Regular',
  },
  contentLabelText2: {
    color: COLOR_BLACK,
    fontSize: 14,
    fontFamily: 'WorkSans-Medium',
  },
});

export default PackingListItem;
