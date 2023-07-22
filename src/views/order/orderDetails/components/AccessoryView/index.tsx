import React from "react";
import {View, Text} from 'react-native';
import BouncyCheckboxGroup, { ICheckboxButton } from "react-native-bouncy-checkbox-group";
import { COLOR_BLUE } from "../../../../../utils/colors";
import styles from './style';

interface IAccessoryViewProps {
    label: string;
    onYesPress: () => void;
    onNoPress: () => void;
}

const loadTypes: Array<ICheckboxButton> = [
    {
      id: '1',
      text: 'Yes',
      fillColor: COLOR_BLUE,
      iconStyle: {borderColor: 'red', borderRadius: 0},
      innerIconStyle: {borderWidth: 1, borderRadius: 0, width: 15, height: 15},
      textStyle: {fontFamily: 'JosefinSans-Regular', textDecorationLine: 'none'},
      style: {paddingRight: 16},
    },
    {
      id: '2',
      text: 'No',
      fillColor: COLOR_BLUE,
      iconStyle: {borderColor: 'red', borderRadius: 0},
      innerIconStyle: {borderWidth: 1, borderRadius: 0, width: 15, height: 15},
      textStyle: {fontFamily: 'JosefinSans-Regular', textDecorationLine: 'none'},
    },
  ];

const AccessoryView:React.FC<IAccessoryViewProps> = ({label, onNoPress, onYesPress}) => {

    return (
        <View style={styles.container}>
            <View style={styles.labelContainer}>
                <Text>{label}</Text>
            </View>
            <View style={styles.optionContainer}>
            <BouncyCheckboxGroup
                data={loadTypes}
                onChange={(selectedItem: ICheckboxButton) => {
                  console.log('SelectedItem: ', JSON.stringify(selectedItem));
                }}
              />
            </View>
            <View style={styles.optionContainer}></View>
        </View>
    );
}

export default AccessoryView;