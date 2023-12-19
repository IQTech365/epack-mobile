import React from 'react';
import {View, Text} from 'react-native';
import styles from '../style';
import {useAddDriverFormContextHook} from '../../../../../provider/AddDriverFormContextProvider';
import Label from '../../../../../common/Label';
import DropdownComponent from '../../../../../common/DropdownComponent';
import {TDropdownItem} from '../../../../../type/TDropdownItem';
import Input from '../../../../../common/Input';
import {COLOR_BLACK} from '../../../../../utils/colors';

interface Props {}

const BasicDetailsView: React.FC<Props> = ({}) => {
  const {state, setEntity, setSubEntity, setDriverName} =
    useAddDriverFormContextHook();

  return (
    <>
      <View style={styles.twoColumnWrapper}>
        <View style={styles.textContainer}>
          <Label text="Entity" style={styles.label} />
          <DropdownComponent
            data={[]}
            onSelect={(item: TDropdownItem) => {
              setEntity(item.label);
            }}
          />
        </View>
        <View style={styles.textContainer}>
          <Label text="Sub Entity" style={styles.label} />
          <DropdownComponent
            data={[]}
            onSelect={(item: TDropdownItem) => {
              setSubEntity(item.label);
            }}
          />
        </View>
      </View>
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
