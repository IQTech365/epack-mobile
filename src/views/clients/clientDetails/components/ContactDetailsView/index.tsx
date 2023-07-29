import React from 'react';
import {View} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import CollapsibleView from '../../../../../common/CollapsibleView';
import Spacer from '../../../../../common/Spacer';
import EnquiryDetailListItem from '../../../../enquiry/enquiryDetails/components/EnquiryDetailListItem';
import styles from './style';

interface IContactDetailsViewProps {}

const ContactDetailsView: React.FC<IContactDetailsViewProps> = ({}) => {
  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.container}>
        <Spacer height={4} />
        <CollapsibleView title="CONTACT DETAILS" collapsed={false}>
          <View>
            <View style={styles.elementContainer}>
              <EnquiryDetailListItem />
              <EnquiryDetailListItem />
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={8} />
        <CollapsibleView title="REGISTERED ADDRESS" collapsed={true}>
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

export default ContactDetailsView;
