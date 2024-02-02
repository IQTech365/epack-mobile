import React, {FC, useState, forwardRef, useRef, useEffect} from 'react';
import {View, TextInput, TouchableOpacity, ViewStyle} from 'react-native';
import styles from './style';
import DownArrowIcon from '../../images/icons/down-arrow.svg';
import UpArrowIcon from '../../images/icons/up-arrow.svg';
import {COLOR_GRAY4} from '../../utils/colors';
import OptionModal from './OptionModal';

interface IProps {
  options: string[];
  onSelect: (text: string) => void;
  disabled?: boolean;
  containerStyle?: ViewStyle;
  placeholder?: string;
  initialValue?: string;
}

const DropdownWithTextInput: FC<IProps> = forwardRef(
  (
    {
      options,
      onSelect,
      disabled,
      containerStyle,
      initialValue,
      placeholder = 'Enter or Select',
    },
    ref,
  ) => {
    const [text, setText] = useState<string>('');
    const [showOptions, setShowOptions] = useState<boolean>(false);
    const inputRef = useRef<TextInput>(null);

    const _onChangeText = (text: string) => {
      setText(text);
      onSelect && onSelect(text);
    };

    const _toggleOptions = () => {
      setShowOptions(!showOptions);
    };

    const _close = (item: string) => {
      setText(item);
      setShowOptions(false);
      onSelect && onSelect(item);
    };

    const _onDismiss = () => {
      setShowOptions(false);
    };

    React.useImperativeHandle(ref, () => ({
      setValue,
    }));

    const setValue = (value: string) => {
      setText(value);
    };

    useEffect(() => {
      if (initialValue) {
        setText(initialValue);
      }
    }, []);

    return (
      <>
        <View style={[styles.container, containerStyle]}>
          <View style={styles.inputContainer}>
            <TextInput
              ref={inputRef}
              onChangeText={_onChangeText}
              style={styles.input}
              value={text}
              placeholder={placeholder}
              placeholderTextColor={COLOR_GRAY4}
              selectionColor={COLOR_GRAY4}
              editable={!disabled}
            />
          </View>
          <TouchableOpacity
            style={styles.arrowContainer}
            activeOpacity={0.6}
            disabled={disabled}
            onPress={_toggleOptions}>
            {showOptions ? (
              <UpArrowIcon width={24} height={24} />
            ) : (
              <DownArrowIcon width={24} height={24} />
            )}
          </TouchableOpacity>
        </View>
        <OptionModal
          visible={showOptions}
          onPress={_close}
          data={options}
          onDismiss={_onDismiss}
        />
      </>
    );
  },
);

export default DropdownWithTextInput;
