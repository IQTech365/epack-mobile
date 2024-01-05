import React, {ReactElement, useEffect, useState, forwardRef} from 'react';
import {
  View,
  TextInput,
  Text,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import {COLOR_GRAY3, COLOR_GRAY4, COLOR_WHITE} from '../../utils/colors';
import styles from './styles';
import {Validator} from '../../utils/validation';

interface InputProps {
  icon?: ReactElement;
  searchIcon?: ReactElement;
  placeholder?: string;
  error?: string | null;
  onChangeText: (text: string) => void;
  onSearch?: (search: string) => void;
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
  secureTextEntry?: boolean;
}

const Input: React.FC<InputProps> = forwardRef(
  (
    {
      icon,
      searchIcon,
      placeholder,
      onChangeText,
      onSearch,
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
      secureTextEntry,
    },
    ref,
  ) => {
    const disableStyle = !editable ? {backgroundColor: COLOR_GRAY3} : null;
    const [text, setText] = useState<string>('');
    const [validationError, setValidationError] = useState<string>('');
    const errorStyle = error || validationError ? styles.errorContainer : null;
    useEffect(() => {
      if (value) {
        setText(value);
      }
    }, [value]);

    React.useImperativeHandle(ref, () => ({
      reset,
    }));

    const reset = () => {
      _handleTextChange('');
    };

    const _handleTextChange = (text: string) => {
      setText(text);
      onChangeText && onChangeText(text);
    };

    const _handleSearch = () => {
      onSearch && onSearch(text);
    };

    const _handleValidation = () => {
      switch (type) {
        case 'mobile':
          if (!required && Validator.isEmpty(text)) {
            setValidationError('');
          } else if (!Validator.mobile(text)) {
            setValidationError('Invalid mobile number');
          } else {
            setValidationError('');
          }
          break;
        case 'email':
          if (!required && Validator.isEmpty(text)) {
            setValidationError('');
          } else if (!Validator.email(text)) {
            setValidationError('Invalid email');
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
              placeholderTextColor={COLOR_GRAY4}
              selectionColor={selectionColor}
              keyboardType={inputType}
              editable={editable}
              maxLength={maxLength}
              value={text}
              autoCapitalize={autoCapitalize}
              onBlur={validateOnBlur}
              secureTextEntry={secureTextEntry}
            />
          </View>
          {searchIcon && (
            <TouchableOpacity
              style={styles.searchIconContainer}
              activeOpacity={0.6}
              onPress={_handleSearch}>
              {searchIcon}
            </TouchableOpacity>
          )}
        </View>
        {error || validationError ? (
          <Text style={styles.error}>{error || validationError}</Text>
        ) : null}
      </>
    );
  },
);

export default Input;
