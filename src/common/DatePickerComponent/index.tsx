import React, {useEffect, useState, forwardRef} from 'react';
import {View, TouchableOpacity, Text, ViewStyle} from 'react-native';
import DatePicker from 'react-native-date-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {formatDate, formatDate3} from '../../utils/formatter';
import CalendarIcon from '../../images/icons/calendar.svg';
import styles from './style';

export interface IDateMethods {
  setDefaultValue: (date: Date) => void;
  refresh: () => void;
}

interface IDatePickerProps {
  onDateSelect: (date: Date|null) => void;
  style?: ViewStyle;
  error?: string | undefined | null;
  showTime?: boolean;
  defaultValue?: Date;
  mode?: 'date' | 'time' | 'datetime';
  disabled?: boolean;
  minimumDate?: Date | null;
  datePickerType?: 'date' | 'calender';
  datePickerModalVisible?: boolean;
}

const DatePickerComponent = forwardRef<IDateMethods, IDatePickerProps>(
  (
    {
      onDateSelect,
      style,
      error,
      showTime = false,
      defaultValue,
      mode = 'datetime',
      disabled = false,
      minimumDate = new Date(),
      datePickerType = 'calender',
    },
    ref,
  ) => {
    const [date, setDate] = useState<Date|null>(new Date());
    const [open, setOpen] = useState<boolean>(false);
    const [refresh, setRefresh] = useState<boolean>(false);

    React.useImperativeHandle(ref, () => ({
      setDefaultValue: (date: Date) => {
        setDate(date);
      },
      refresh: () => {
        setRefresh(!refresh);
      },
    }));

    const getDateAndTime = () => {
      if (!date) return '';
      if (showTime) {
        return formatDate3(date);
      }
      return formatDate(date);
    };

    const errorBorderStyle = error ? styles.errorBorderColor : null;
    const containerStyle = disabled
      ? styles.disabledContainer
      : styles.container;

    // const getDateAndTime = () => {
    //   if (showTime) {
    //     return formatDate3(date);
    //   }
    //   return formatDate(date);
    // };

    // const handelClear = () =>{
    //   setDate(null)
    // }

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
          {datePickerType === 'calender' ? (
            <DateTimePickerModal
              isVisible={open}
              mode="date"
              onConfirm={date => {
                setOpen(false);
                setDate(date);
                onDateSelect && onDateSelect(date);
              }}
              onCancel={() => {
                setOpen(false);
                setDate(null);
                onDateSelect && onDateSelect(null);
              }}
            />
          ) : (
            <DatePicker
              modal
              open={open}
              //@ts-ignore
              date={date}
              mode={mode}
              androidVariant="nativeAndroid"
              // textColor='#000000'
              onConfirm={date => {
                setOpen(false);
                setDate(date);
                onDateSelect && onDateSelect(date);
              }}
              // minimumDate={minimumDate}
              onCancel={() => {
                setOpen(false);
              }}
            />
          )}
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
