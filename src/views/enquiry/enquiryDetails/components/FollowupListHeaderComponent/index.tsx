import React from 'react';
import {View, Text} from 'react-native';
import Button from '../../../../../common/Button';
import DatePickerComponent from '../../../../../common/DatePickerComponent';
import Input from '../../../../../common/Input';
import Spacer from '../../../../../common/Spacer';
import {COLOR_BLACK} from '../../../../../utils/colors';
import styles from './style';

interface IFollowupListHeaderComponentProps {
  taskName: string;
  assigneeRole: string;
}

const FollowupListHeaderComponent: React.FC<IFollowupListHeaderComponentProps> = ({taskName, assigneeRole}) => {
  const handleFollowupDate = (date: Date) => {
    // dispatch({
    //   type: QUOTATION_FORM_ACTION.DATE_OF_QUOTATION,
    //   payload: formatDate(date),
    // });
  };

  const handleCommentInputTextChange = (text: string) => {
    // dispatch({
    //   type: QUOTATION_FORM_ACTION.PARTY_NAME,
    //   payload: text,
    // });
  };

  return (
    <View style={styles.container}>
      <Spacer height={4} />
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>{taskName}</Text>
      </View>
      <Spacer height={8} />
      <View style={styles.contentContainer}>
        <Text style={styles.contentLabelText}>
          {assigneeRole} Manager - <Text style={styles.nameText}>Ramesh</Text>
        </Text>
      </View>
      <Spacer height={8} />
      <View style={styles.contentContainer}>
        <Text style={styles.contentLabelText}>
          Next Followup - 20-11-2022, 10:00{' '}
          <Text style={styles.nameText}>AM</Text>
        </Text>
      </View>
      <Spacer height={12} />
      <View style={styles.elementContainer}>
        <DatePickerComponent
          onDateSelect={handleFollowupDate}
          style={styles.datePicker}
        />
      </View>
      <Spacer height={12} />
      <View style={styles.elementContainer}>
        <Input
          onChangeText={handleCommentInputTextChange}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          selectionColor={COLOR_BLACK}
          placeholder='Comment'
        />
      </View>
      <Spacer height={12} />
        <Button
          text="SAVE"
          onPress={() => {}}
          disabled={true}
          style={styles.previewButtonStyle}
          textStyle={styles.textStyle}
        />
        <Spacer height={12} />
    </View>
  );
};

export default FollowupListHeaderComponent;
