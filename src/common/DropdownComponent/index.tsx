import React, { useState } from 'react';
  import { View } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
import { TDropdownItem } from '../../type/TDropdownItem';
  import styles from './style';

  const data1 = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];

  interface IDropdownProps {
    data: Array<TDropdownItem>;
    onSelect: (item: TDropdownItem) => void;
  }

  const DropdownComponent: React.FC<IDropdownProps> = ({data, onSelect}) => {
    const [value, setValue] = useState<string>('');
    const [isFocus, setIsFocus] = useState<boolean>(false);

    return (
      <View style={styles.container}>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            onSelect && onSelect(item);
            setIsFocus(false);
          }}
        />
      </View>
    );
  };

  export default DropdownComponent;