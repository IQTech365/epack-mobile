import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import CollapsibleView from '../../../../../common/CollapsibleView';

interface Props {
  //
}

const InsuranceDetailsView: React.FC<Props> = ({}) => {
  return (
    <CollapsibleView title="INSURANCE DETAILS" collapsed={true}>
      <View></View>
    </CollapsibleView>
  );
};

export default InsuranceDetailsView;
