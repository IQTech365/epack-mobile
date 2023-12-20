import React from 'react';
import {View, Text} from 'react-native';
import styles from '../style';
import {useAddDriverFormContextHook} from '../../../../../provider/AddDriverFormContextProvider';
import Label from '../../../../../common/Label';
import DropdownComponent from '../../../../../common/DropdownComponent';
import {TDropdownItem} from '../../../../../type/TDropdownItem';
import Input from '../../../../../common/Input';
import {COLOR_BLACK} from '../../../../../utils/colors';
import entityOptions from '../../../../../data/entityOptions.json';
import {useAppSelector} from '../../../../../redux/hooks';
import {getBranchList, getFranchiseList} from '../../utils';
import Spacer from '../../../../../common/Spacer';

interface Props {}

const BasicDetailsView: React.FC<Props> = ({}) => {
  const {state, setEntity, setSubEntity, setDriverName} =
    useAddDriverFormContextHook();
  const {Branchs, Franchises} = useAppSelector(state => state.Myprofile);

  const _getSubEntityDataList = (): TDropdownItem[] => {
    let list: TDropdownItem[] = [];
    if (state.entity == entityOptions[0].label) {
      list = [];
    } else if (state.entity == entityOptions[1].label) {
      list = getBranchList(Branchs);
    } else if (state.entity == entityOptions[2].label) {
      list = getFranchiseList(Franchises);
    }
    return list;
  };

  const _getSubEntityLabelText = (): string => {
    let label: string = '';
    if (state.entity == entityOptions[0].label) {
      label = '';
    } else if (state.entity == entityOptions[1].label) {
      label = 'Branch Name';
    } else if (state.entity == entityOptions[2].label) {
      label = 'Franchise Name';
    }
    return label;
  };

  return (
    <>
      <Spacer height={4} />
      <View style={styles.elementContainer}>
        <Label text="Entity" style={styles.label} />
        <DropdownComponent
          data={entityOptions}
          onSelect={(item: TDropdownItem) => {
            setEntity(item.label);
          }}
        />
      </View>
      {state.entity !== entityOptions[0].label ? (
        <>
          <Spacer height={4} />
          <View style={styles.elementContainer}>
            <Label text={_getSubEntityLabelText()} style={styles.label} />
            <DropdownComponent
              data={_getSubEntityDataList()}
              onSelect={(item: TDropdownItem) => {
                setSubEntity(item.label);
              }}
            />
          </View>
        </>
      ) : null}
      <View style={styles.elementContainer}>
        <Label text="Driver Name" style={styles.label} />
        <Input
          onChangeText={setDriverName}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          selectionColor={COLOR_BLACK}
        />
      </View>
    </>
  );
};

export default BasicDetailsView;
