import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../common/AvoidSoftInputViewHOC';
import Spacer from '../../../../common/Spacer';
import EnquiryDetailListItem from '../../../enquiry/enquiryDetails/components/EnquiryDetailListItem';
import styles from './style';
import EditIcon from '../../../../images/icons/edit.svg';
import Header from '../../../../common/Header';

interface IPackerSignatureViewProps {}

const PackerSignatureView: React.FC<IPackerSignatureViewProps> = ({}) => {

  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.container}>
      <Header label="Packer Signature" canGoBack={true} />
        <Spacer height={4} />
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>Packer's Details</Text>
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

export default PackerSignatureView;
