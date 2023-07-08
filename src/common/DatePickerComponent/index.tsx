import React, {useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { formatDate } from '../../utils/formatter';
import CalendarIcon from '../../images/icons/calendar.svg';
import styles from './style';

interface IDatePickerProps {
  onDateSelect: (date:Date) => void;
}

const DatePickerComponent: React.FC<IDatePickerProps> = ({onDateSelect}) => {
  const [date, setDate] = useState<Date>(new Date());
  const [open, setOpen] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setOpen(true)} style={styles.contentContainer}>
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
  );
};

export default DatePickerComponent;
