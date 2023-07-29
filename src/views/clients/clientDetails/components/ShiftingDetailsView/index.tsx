import React from 'react';
import {View} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import CollapsibleView from '../../../../../common/CollapsibleView';
import Spacer from '../../../../../common/Spacer';
import EnquiryDetailListItem from '../../../../enquiry/enquiryDetails/components/EnquiryDetailListItem';
import styles from './style';

interface IShiftingDetailsViewProps {}

const ShiftingDetailsView: React.FC<IShiftingDetailsViewProps> = ({}) => {
  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.container}>
        <Spacer height={4} />
        <CollapsibleView title="SHIFTING DATE - 12-01-2023" collapsed={false}>
          <View>
            <View style={styles.elementContainer}>
              <EnquiryDetailListItem />
              <EnquiryDetailListItem />
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={8} />
        <CollapsibleView title="SHIFTING DATE - 09-06-2023" collapsed={true}>
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

export default ShiftingDetailsView;
