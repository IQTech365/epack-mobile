import React, {forwardRef, useEffect, useState} from 'react';
import {Text, TextStyle, View, ViewStyle} from 'react-native';
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
  dropDownStyle?: ViewStyle;
  container?:ViewStyle;
  containerStyle?:ViewStyle;
  selectedTextStyle?:TextStyle;
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
      dropDownStyle,
      container,
      containerStyle = styles.containerStyle,
      selectedTextStyle
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
      <View style={[styles.container, container]}>
        <Dropdown
          style={[
            styles.dropdown,
            dropDownStyle,
            isFocus && {borderColor: COLOR_BLUE, borderWidth: 1, borderRadius: 5},
            errorBorderColor,
          ]}
          //@ts-ignore
          ref={ref}
          mode="modal"
          placeholderStyle={styles.placeholderStyle}
          itemTextStyle={styles.itemText}
          selectedTextStyle={[styles.selectedTextStyle, selectedTextStyle]}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          containerStyle={containerStyle}
          itemContainerStyle={styles.itemContainerStyle}
          data={data}
          search={showSearchInput}
          maxHeight={250}
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
