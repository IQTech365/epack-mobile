import React, {ReactElement} from 'react';
import {View, TextInput, Text, ViewStyle, TextStyle} from 'react-native';
import {COLOR_WHITE, OFF_WHITE} from '../../utils/colors';
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
  maxLength
}) => {
  return (
    <>
      <View style={[styles.container, containerStyle]}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, inputStyle]}
            placeholder={placeholder}
            onChangeText={onChangeText}
            placeholderTextColor={OFF_WHITE}
            selectionColor={selectionColor}
            keyboardType={inputType}
            editable={editable}
            maxLength={maxLength}
          />
        </View>
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </>
  );
};

export default Input;
