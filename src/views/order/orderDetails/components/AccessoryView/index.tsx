import React from 'react';
import {View, Text} from 'react-native';
import BouncyCheckboxGroup, {
  ICheckboxButton,
} from 'react-native-bouncy-checkbox-group';
import {COLOR_BLACK, COLOR_BLUE} from '../../../../../utils/colors';
import styles from './style';

interface IAccessoryViewProps {
  label: string;
  id:string;
  onPress: (name: string, id:string, present: boolean) => void;
}

const loadTypes: Array<ICheckboxButton> = [
  {
    id: '1',
    text: 'Yes',
    fillColor: COLOR_BLUE,
    iconStyle: {borderColor: 'red', borderRadius: 0, width: 20, height: 20},
    innerIconStyle: {borderWidth: 1, borderRadius: 0, width: 20, height: 20},
    textStyle: {fontFamily: 'WorkSans-Regular', textDecorationLine: 'none', color: COLOR_BLACK},
    style: {paddingRight: 16},
  },
  {
    id: '2',
    text: 'No',
    fillColor: COLOR_BLUE,
    iconStyle: {borderColor: 'red', borderRadius: 0, width: 20, height: 20},
    innerIconStyle: {borderWidth: 1, borderRadius: 0, width: 20, height: 20},
    textStyle: {fontFamily: 'WorkSans-Regular', textDecorationLine: 'none', color: COLOR_BLACK},
  },
];

const AccessoryView: React.FC<IAccessoryViewProps> = ({label, id, onPress}) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>{label}</Text>
      </View>
      <View style={styles.optionContainer}>
        <BouncyCheckboxGroup
          data={loadTypes}
          onChange={(selectedItem: ICheckboxButton) => {
            console.log('SelectedItem: ', JSON.stringify(selectedItem));
            if (selectedItem.id == '1') {
              onPress(label, id, true);
            } else if (selectedItem.id == '2') {
              onPress(label, id, false);
            }
          }}
        />
      </View>
      <View style={styles.optionContainer}></View>
    </View>
  );
};

export default AccessoryView;
