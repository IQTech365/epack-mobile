import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import FreightTypeView from './components/FreightTypeView';
import {FREIGHT_TYPE, loadTypeOptions} from '../../utils';
import Spacer from '../../../../../../../common/Spacer';

interface Props {}

const FreightDetailsView: React.FC<Props> = () => {
  return (
    <View>
      <FreightTypeView
        freightType={FREIGHT_TYPE.LOAD_TYPE}
        options={loadTypeOptions}
      />
    </View>
  );
};

export default FreightDetailsView;
