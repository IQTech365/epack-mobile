import React, {useState} from 'react';
import {View, TouchableOpacity, Text, ViewStyle} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {formatDate} from '../../utils/formatter';
import CalendarIcon from '../../images/icons/calendar.svg';
import styles from './style';

interface IDatePickerProps {
  onDateSelect: (date: Date) => void;
  style?: ViewStyle;
  error?: string;
}

const DatePickerComponent: React.FC<IDatePickerProps> = ({
  onDateSelect,
  style,
  error,
}) => {
  const [date, setDate] = useState<Date>(new Date());
  const [open, setOpen] = useState<boolean>(false);

  const errorBorderStyle = error ? styles.errorBorderColor : null;

  return (
    <>
      <View style={[styles.container, errorBorderStyle, style]}>
        <TouchableOpacity
          onPress={() => setOpen(true)}
          style={styles.contentContainer}>
          <Text>{formatDate(date)}</Text>
          <CalendarIcon width={18} height={18} />
        </TouchableOpacity>
        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
            onDateSelect && onDateSelect(date);
          }}
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
};

export default DatePickerComponent;
