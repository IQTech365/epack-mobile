import React from 'react';
import {View} from 'react-native';
import styles from './style';
import Spacer from '../../../../common/Spacer';
import Label from '../../../../common/Label';
import DropdownComponent from '../../../../common/DropdownComponent';
import chooseEntity from '../../../../data/chooseEntity.json';
import branchOptions from '../../../../data/branchOptions.json';
import { TDropdownItem } from '../../../../type/TDropdownItem';
import Input from '../../../../common/Input';
import { COLOR_BLACK } from '../../../../utils/colors';
import Button from '../../../../common/Button';

const SerialNoSettingFormView = () => {

  const handleAccountType = (item: TDropdownItem) => {
    // setAccountType(item.label);
  };
  


  return (
    <View >
        <View style={styles.textContainer2}>
          <Label text="Choose Entity" style={styles.label} />
          <DropdownComponent
            data={chooseEntity}
            onSelect={handleAccountType}
          />
           <Label text="Choose Branch" style={styles.label} />
          <DropdownComponent
            data={branchOptions}
            onSelect={handleAccountType}
          />
        </View>
        <View style={styles.mainWrapper}>
        <View style={styles.textContainer}>
          <Label text="Prefixe" style={styles.label} />
          <Input
            onChangeText={() => {}}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            placeholder='#RD'
          />
        </View>
        <View style={styles.textContainer}>
          <Label text="Suffix (intial value)" style={styles.label} />
          <Input
            onChangeText={() => {}}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            placeholder='Ex. 101'
          />
        </View>
      </View>
      <Spacer height={8} />
        <Button
          text="SAVE"
          onPress={() => {
            console.log('submitted data');
          }}
          disabled={false}
          style={styles.previewButtonStyle}
          textStyle={styles.textStyle}
        />
        <Spacer height={8} />
    </View>
  );
};

export default SerialNoSettingFormView;
