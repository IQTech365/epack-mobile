import React, {ReactElement, useEffect, useState} from 'react';
import {View, TextInput, Text, ViewStyle, TextStyle} from 'react-native';
import {COLOR_GRAY3, COLOR_WHITE, OFF_WHITE} from '../../utils/colors';
import styles from './styles';

interface InputProps {
  icon?: ReactElement;
  placeholder?: string;
  error?: string | null;
  onChangeText: (text: string) => void;
  inputType?: 'numeric' | 'default'
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  selectionColor?: string;
  editable?: boolean;
  maxLength?: number;
  value?: string;
}

const Input: React.FC<InputProps> = ({
  icon,
  placeholder,
  onChangeText,
  error,
  inputType = 'default',
  containerStyle,
  inputStyle,
  selectionColor = COLOR_WHITE,
  editable = true,
  maxLength,
  value
}) => {
  const errorStyle = error ? styles.errorContainer : null;
  const disableStyle = !editable ? {backgroundColor: COLOR_GRAY3} : null;
  const [text, setText] = useState<string>('');

  useEffect(() => {
    if(value) {
      setText(value);
    }
  }, [value]);

  const _handleTextChange = (text: string) => {
    setText(text);
    onChangeText && onChangeText(text);
  }

  return (
    <>
      <View style={[styles.container, containerStyle, disableStyle, errorStyle]}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, inputStyle]}
            placeholder={placeholder}
            onChangeText={_handleTextChange}
            placeholderTextColor={OFF_WHITE}
            selectionColor={selectionColor}
            keyboardType={inputType}
            editable={editable}
            maxLength={maxLength}
            value={text}
          />
        </View>
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </>
  );
};

export default Input;
