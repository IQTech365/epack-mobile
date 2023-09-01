import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {TDropdownItem} from '../../type/TDropdownItem';
import { COLOR_BLUE } from '../../utils/colors';
import styles from './style';
interface IDropdownProps {
  data: Array<TDropdownItem>;
  onSelect: (item: TDropdownItem) => void;
  defaultValue?: TDropdownItem;
  showSearchInput?:boolean;
  disable?: boolean;
}

const DropdownComponent: React.FC<IDropdownProps> = ({data, onSelect, defaultValue, showSearchInput = false, disable = false}) => {
  const [value, setValue] = useState<TDropdownItem>(data[0]);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  useEffect(() => {
    if(defaultValue){
      setValue(defaultValue);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: COLOR_BLUE}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search={showSearchInput}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select item' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item);
          onSelect && onSelect(item);
          setIsFocus(false);
        }}
        disable={disable}
      />
    </View>
  );
};

export default DropdownComponent;
