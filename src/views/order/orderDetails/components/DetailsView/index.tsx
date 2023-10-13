import React from 'react';
import {View} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import CollapsibleView from '../../../../../common/CollapsibleView';
import Spacer from '../../../../../common/Spacer';
import { IGetOrdersData } from '../../../../../interface/order/IGetOrdersResponse';
import EnquiryDetailListItem from '../OrderDetailListItem';
import styles from './style';

interface IDetailsViewProps {
  item: IGetOrdersData | undefined;
}

const DetailsView: React.FC<IDetailsViewProps> = ({item}) => {
  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.container}>
        <Spacer height={4} />
        <CollapsibleView title="SHIFTING DETAILS" collapsed={false}>
          <View>
            <View style={styles.elementContainer}>
              <EnquiryDetailListItem />
              <EnquiryDetailListItem />
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={8} />
        <CollapsibleView title="CONTACT DETAILS" collapsed={true}>
          <View>
            <View style={styles.elementContainer}>
              <EnquiryDetailListItem />
              <EnquiryDetailListItem />
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={8} />
        <CollapsibleView title="PICKUP ADDRESS" collapsed={true}>
          <View>
            <View style={styles.elementContainer}>
              <EnquiryDetailListItem />
              <EnquiryDetailListItem />
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={8} />
        <CollapsibleView title="DELIVERY ADDRESS" collapsed={true}>
          <View>
            <View style={styles.elementContainer}>
              <EnquiryDetailListItem />
              <EnquiryDetailListItem />
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={8} />
      </View>
    </AvoidSoftInputViewHOC>
  );
};

export default DetailsView;
