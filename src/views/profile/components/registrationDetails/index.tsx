import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../common/AvoidSoftInputViewHOC';
import Spacer from '../../../../common/Spacer';
import EnquiryDetailListItem from '../../../enquiry/enquiryDetails/components/EnquiryDetailListItem';
import styles from './style';
import EditIcon from '../../../../images/icons/edit.svg';

interface IRegistrationDetailsViewProps {}

const RegistrationDetailsView: React.FC<IRegistrationDetailsViewProps> = ({}) => {

  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.container}>
        <Spacer height={4} />
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>Registration Details</Text>
          <TouchableOpacity onPress={()=> {}} activeOpacity={0.6}>
            <EditIcon width={20} height={20} />
          </TouchableOpacity>
        </View>
        <Spacer height={8} />
        <View style={styles.elementContainer}>
          <EnquiryDetailListItem />
          <EnquiryDetailListItem />
        </View>
        <Spacer height={8} />
      </View>
    </AvoidSoftInputViewHOC>
  );
};

export default RegistrationDetailsView;
