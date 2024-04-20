import React, { useEffect, useState } from 'react';
import {View, Text} from 'react-native';
import {COLOR_BLACK, COLOR_BLUE} from '../../../../../utils/colors';
import styles from './style';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { IAccessory } from '../CarConditionFormView/carConditionReducer';

interface IAccessoryViewProps {
  item:IAccessory;
  index:number;
  onPress: (name: string, id: string, present: boolean, index: number) => void;
}

const loadTypes = [
  {label: 'Yes', id: '1'},
  {label: 'No', id: '2'},
];

const AccessoryView: React.FC<IAccessoryViewProps> = ({item, index, onPress}) => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  useEffect(() => {
    if(item.present) {
      setActiveIndex(0);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>{item.accessoryName}</Text>
      </View>
      <View style={styles.optionContainer}>
        <View style={styles.checkboxContainer}>
          {loadTypes.map((option, i) => {
            return (
              <BouncyCheckbox
                key={`${i}`}
                size={20}
                fillColor={COLOR_BLUE}
                unfillColor="#FFFFFF"
                text={option.label}
                iconStyle={{borderColor: 'red', borderRadius: 0}}
                innerIconStyle={{borderWidth: 1, borderRadius: 0}}
                onPress={(isChecked: boolean) => {
                  setActiveIndex(i);
                  if (option.id == '1') {
                    onPress(item.accessoryName, item.id, true, index);
                  } else if (option.id == '2') {
                    onPress(item.accessoryName, item.id, false, index);
                  }
                }}
                textStyle={styles.checkboxTextStyle}
                style={{paddingRight: 8}}
                textContainerStyle={{marginLeft: 10, marginRight: 4}}
                isChecked={i == activeIndex}
                disableBuiltInState={true}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default AccessoryView;
