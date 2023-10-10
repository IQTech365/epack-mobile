import React, {forwardRef, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {TDropdownItem} from '../../type/TDropdownItem';
import {COLOR_BLUE} from '../../utils/colors';
import styles from './style';
interface IDropdownProps {
  data: Array<TDropdownItem>;
  onSelect: (item: TDropdownItem) => void;
  defaultValue?: TDropdownItem;
  showSearchInput?: boolean;
  disable?: boolean;
  error?: string;
}

const DropdownComponent: React.FC<IDropdownProps> = forwardRef(
  (
    {
      data,
      onSelect,
      defaultValue,
      showSearchInput = false,
      disable = false,
      error,
    },
    ref,
  ) => {
    const [value, setValue] = useState<TDropdownItem>(data[0]);
    const [isFocus, setIsFocus] = useState<boolean>(false);
    React.useImperativeHandle(ref, () => ({
      setDefaultValue
    }));

    useEffect(() => {
      if (defaultValue) {
        setValue(defaultValue);
      }
    }, []);

    const setDefaultValue = (value: TDropdownItem) => {
      setValue(value);
    }

    const errorBorderColor = error
      ? {borderColor: 'red', borderWidth: 1}
      : null;

    return (
      <View style={styles.container}>
        <Dropdown
          style={[
            styles.dropdown,
            isFocus && {borderColor: COLOR_BLUE, borderWidth: 1},
            errorBorderColor,
          ]}
          //@ts-ignore
          ref={ref}
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
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
      </View>
    );
  },
);

export default DropdownComponent;
