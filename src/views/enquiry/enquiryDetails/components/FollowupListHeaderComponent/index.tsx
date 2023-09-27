import React, { useEffect, useState } from 'react';
import {View, Text} from 'react-native';
import Button from '../../../../../common/Button';
import DatePickerComponent from '../../../../../common/DatePickerComponent';
import Input from '../../../../../common/Input';
import Spacer from '../../../../../common/Spacer';
import {COLOR_BLACK} from '../../../../../utils/colors';
import styles from './style';
import { formatDate } from '../../../../../utils/formatter';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { IAddFollowupRequest } from '../../../../../interface/enquiry/IAddFollowupRequest';
import { addFollowupRequest, resetAddFollowupRequest } from '../../../../../redux/slices/EnquirySlice';
import Toast from 'react-native-toast-message';
import Spinner from '../../../../../common/Spinner';

interface IFollowupListHeaderComponentProps {
  taskName: string;
  assigneeRole: string;
  enquiryId: string;
}

const FollowupListHeaderComponent: React.FC<IFollowupListHeaderComponentProps> = ({taskName, assigneeRole, enquiryId}) => {
  const [comment, setComment] = useState<string>('');
  const [date, setDate] = useState<string>('');

  const dispatch = useAppDispatch();
  const {addFollowupRequesting, addFollowupFailure, addFollowupSuccess} = useAppSelector(state => state.Enquiry);
  const {verifiedData} = useAppSelector(state => state.OTP);
  //@ts-ignore
  const {data} = verifiedData || {};
  const {id} = data || {};

  const handleFollowupDate = (date: Date) => {
    setDate(formatDate(date));
  };

  const handleCommentInputTextChange = (text: string) => {
    setComment(text);
  };

  useEffect(() => {
    if(!addFollowupRequesting && addFollowupSuccess) {
      Toast.show({
        type: 'success',
        text1: 'Followup',
        text2: 'Followup has been added successfully'
      });
      dispatch(resetAddFollowupRequest())
    } else if(!addFollowupRequesting && addFollowupFailure) {
      Toast.show({
        type: 'error',
        text1: 'Followup',
        text2: 'Error in adding followup. Try again!'
      });
      dispatch(resetAddFollowupRequest())
    }
  }, [addFollowupRequesting, addFollowupSuccess, addFollowupFailure]);

  const handleSave = () => {
    if(taskName == 'FOLLOW UP') {
      const data: IAddFollowupRequest = {
        // authId: id,
        authId: '650efb2d7e3968c4c217a34f', //TODO: remove this line once auth module fixed
        enquiryId: enquiryId,
        comment: comment,
        followUpDate: date,
      }
      dispatch(addFollowupRequest(data));
    } else if(taskName == 'SURVEY') {
      //TODO: call api here
    }
  }

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
          Next Followup - {date}{' '}
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
          onPress={handleSave}
          // disabled={true}
          style={styles.previewButtonStyle}
          textStyle={styles.textStyle}
        />
        <Spacer height={12} />
        <Spinner show={addFollowupRequesting} />
    </View>
  );
};

export default FollowupListHeaderComponent;
