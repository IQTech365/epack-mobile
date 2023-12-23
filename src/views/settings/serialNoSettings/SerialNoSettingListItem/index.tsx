import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import {IAppSetting} from '../../../../interface/common/common';
import {Shadow} from 'react-native-shadow-2';
import Spacer from '../../../../common/Spacer';
import {useAppSelector} from '../../../../redux/hooks';

interface IProps {
  item: IAppSetting;
  moduleName: string;
}

const SerialNoListItem: React.FC<IProps> = ({item, moduleName}) => {
  const {Franchises, Branchs} = useAppSelector(state => state.Myprofile);

  const _getEntityName = () => {
    let entityName: string = '';
    let branchEntity: any;
    let franchiseEnity: any;
    const {data: brancheData = []} = Branchs || {};
    const {data: franchiseData = []} = Franchises || {};
    if (brancheData && Array.isArray(brancheData) && brancheData.length > 0) {
      branchEntity = brancheData.find(d => d._id == item.entityId);
    }
    if (
      franchiseData &&
      Array.isArray(franchiseData) &&
      franchiseData.length > 0
    ) {
      franchiseEnity = franchiseData.find(d => d._id == item.entityId);
    }
    if(branchEntity !== undefined) {
      entityName = branchEntity?.branchName;
    } else if(franchiseEnity !== undefined) {
      entityName = franchiseEnity?.franchiseName;
    }
    return entityName;
  };
  return (
    <View style={styles.mainWrapper}>
      <Shadow distance={1}>
        <View style={styles.container}>
          <View style={styles.rowContainer}>
            <View style={styles.rowItemContainer}>
              <Text style={styles.labelText}>Entity Type</Text>
            </View>
            <View style={styles.rowItemContainer2}>
              <Text style={styles.valueText}>{item.companyEntity}</Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.rowItemContainer}>
              <Text style={styles.labelText}>Entity Name</Text>
            </View>
            <View style={styles.rowItemContainer2}>
              <Text style={styles.valueText}>{_getEntityName()}</Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.rowItemContainer}>
              <Text style={styles.labelText}>Module Name</Text>
            </View>
            <View style={styles.rowItemContainer2}>
              <Text style={styles.valueText}>{moduleName}</Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.rowItemContainer}>
              <Text style={styles.labelText}>Prefix</Text>
            </View>
            <View style={styles.rowItemContainer2}>
              <Text style={styles.valueText}>{item.prefix}</Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.rowItemContainer}>
              <Text style={styles.labelText}>Initial Value</Text>
            </View>
            <View style={styles.rowItemContainer2}>
              <Text style={styles.valueText}>{item.initialValue}</Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={[styles.rowItemContainer, {borderBottomWidth: 0}]}>
              <Text style={styles.labelText}>Current Value</Text>
            </View>
            <View style={[styles.rowItemContainer2, {borderBottomWidth: 0}]}>
              <Text style={styles.valueText}>{item.initialValue}</Text>
            </View>
          </View>
        </View>
      </Shadow>
      <Spacer />
    </View>
  );
};

export default SerialNoListItem;
