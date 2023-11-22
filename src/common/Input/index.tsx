import React, {ReactElement, useEffect, useState} from 'react';
import {View, TextInput, Text, ViewStyle, TextStyle} from 'react-native';
import {COLOR_GRAY3, COLOR_WHITE, OFF_WHITE} from '../../utils/colors';
import styles from './styles';
import {Validator} from '../../utils/validation';

interface InputProps {
  icon?: ReactElement;
  placeholder?: string;
  error?: string | null;
  onChangeText: (text: string) => void;
  inputType?: 'numeric' | 'default';
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  selectionColor?: string;
  editable?: boolean;
  maxLength?: number;
  value?: string;
  autoCapitalize?: 'characters' | 'words' | 'sentences' | 'none';
  type?: 'mobile' | 'email' | 'none' | 'text';
  required?: boolean;
  onValidation?: (value: boolean) => void;
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
  value,
  autoCapitalize = 'none',
  type = 'none',
  required = false,
  onValidation,
}) => {
  const disableStyle = !editable ? {backgroundColor: COLOR_GRAY3} : null;
  const [text, setText] = useState<string>('');
  const [validationError, setValidationError] = useState<string>('');
  const errorStyle = error || validationError ? styles.errorContainer : null;
  useEffect(() => {
    if (value) {
      setText(value);
    }
  }, [value]);

  const _handleTextChange = (text: string) => {
    setText(text);
    onChangeText && onChangeText(text);
  };

  const _handleValidation = () => {
    switch (type) {
      case 'mobile':
        if(!required && Validator.isEmpty(text)) {
          setValidationError('');
        } else if (!Validator.mobile(text)) {
          setValidationError('Invalid mobile number');
        } else {
          setValidationError('');
        }
        break;
      case 'text':
        if (!Validator.isEmpty(text)) {
          setValidationError('');
        }
        break;
      default:
        break;
    }
  };

  const validateOnBlur = () => {
    if (type !== 'none') {
      if (required && Validator.isEmpty(text)) {
        setValidationError('Required');
      } else {
        _handleValidation();
      }
    } else {
      setValidationError('');
    }
    onValidation && onValidation(validationError ? false: true);
  };

  return (
    <>
      <View
        style={[styles.container, containerStyle, disableStyle, errorStyle]}>
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
            autoCapitalize={autoCapitalize}
            onBlur={validateOnBlur}
          />
        </View>
      </View>
      {error || validationError ? (
        <Text style={styles.error}>{error || validationError}</Text>
      ) : null}
    </>
  );
};

export default Input;
