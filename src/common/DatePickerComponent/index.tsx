import React, {useEffect, useState, forwardRef} from 'react';
import {View, TouchableOpacity, Text, ViewStyle} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {formatDate, formatDate3} from '../../utils/formatter';
import CalendarIcon from '../../images/icons/calendar.svg';
import styles from './style';

interface IDatePickerProps {
  onDateSelect: (date: Date) => void;
  style?: ViewStyle;
  error?: string | undefined | null;
  showTime?: boolean;
  defaultValue?: Date;
  mode?: 'date' | 'time' | 'datetime';
  disabled?: boolean;
}

const DatePickerComponent: React.FC<IDatePickerProps> = forwardRef(
  (
    {
      onDateSelect,
      style,
      error,
      showTime = false,
      defaultValue,
      mode = 'datetime',
      disabled = false,
    },
    ref,
  ) => {
    const [date, setDate] = useState<Date>(new Date());
    const [open, setOpen] = useState<boolean>(false);

    React.useImperativeHandle(ref, () => ({
      setDefaultValue,
    }));

    const errorBorderStyle = error ? styles.errorBorderColor : null;
    const containerStyle = disabled ? styles.disabledContainer : styles.container;

    const getDateAndTime = () => {
      if (showTime) {
        return formatDate3(date);
      }
      return formatDate(date);
    };

    const setDefaultValue = (value: Date) => {
      setDate(value);
    };

    useEffect(() => {
      if (defaultValue) {
        setDate(defaultValue);
      }
    }, []);

    return (
      <>
        <View style={[containerStyle, errorBorderStyle, style]}>
          <TouchableOpacity
            activeOpacity={0.4}
            onPress={() => setOpen(true)}
            disabled={disabled}
            style={styles.contentContainer}>
            <Text style={styles.dateText}>{getDateAndTime()}</Text>
            <CalendarIcon width={18} height={18} />
          </TouchableOpacity>
          <DatePicker
            modal
            open={open}
            date={date}
            mode={mode}
            androidVariant="nativeAndroid"
            // textColor='#000000'
            onConfirm={date => {
              setOpen(false);
              setDate(date);
              onDateSelect && onDateSelect(date);
            }}
            minimumDate={new Date()}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View>
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
      </>
    );
  },
);

export default DatePickerComponent;
