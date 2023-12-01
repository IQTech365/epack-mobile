import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './style';
import BranchesIcon from '../../../../images/icons/branches_icon.svg';
import VehicleMgmtIcon from '../../../../images/icons/vehicle_mgmt_icon.svg';
import FranchiseMgmtIcon from '../../../../images/icons/franchise_mgmt_icon.svg';
import {FEATURE_TYPE} from '../../utils';
import {Shadow} from 'react-native-shadow-2';

interface Props {
  featureName: string;
  featureType: FEATURE_TYPE,
}

const FeatureView: React.FC<Props> = ({featureName, featureType}) => {

  const _getTaskIcon = () => {
    switch (featureType) {
      case FEATURE_TYPE.BRANCHES:
        return <BranchesIcon width={50} height={50} />;
      case FEATURE_TYPE.VEHICLE_MANAGEMENT:
        return <VehicleMgmtIcon width={50} height={50} />;
      case FEATURE_TYPE.FRANCHIES:
        return <FranchiseMgmtIcon width={50} height={50} />;
      default:
        return <BranchesIcon width={50} height={50} />;
    }
  };

  return (
    <Shadow distance={4} startColor='#FFFFFF'>
      <TouchableOpacity style={styles.container} activeOpacity={0.6}>
        <View style={styles.iconContainer}>{_getTaskIcon()}</View>
        <View style={styles.taskNameContainer}>
          <Text style={styles.taskNameText}>{featureName}</Text>
        </View>
      </TouchableOpacity>
    </Shadow>
  );
};

export default FeatureView;
