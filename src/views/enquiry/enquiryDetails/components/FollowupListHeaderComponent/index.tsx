import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import Button from '../../../../../common/Button';
import DatePickerComponent from '../../../../../common/DatePickerComponent';
import Input from '../../../../../common/Input';
import Spacer from '../../../../../common/Spacer';
import {COLOR_BLACK} from '../../../../../utils/colors';
import styles from './style';
import {formatDate, formatDate2} from '../../../../../utils/formatter';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import {IAddFollowupRequest} from '../../../../../interface/enquiry/IAddFollowupRequest';
import {
  addFollowupRequest,
  addSurveyRequest,
  getFollowupsRequest,
  getSurveyListRequest,
  resetAddFollowupRequest,
  resetAddSurveyRequest,
} from '../../../../../redux/slices/EnquirySlice';
import Toast from 'react-native-toast-message';
import Spinner from '../../../../../common/Spinner';
import {IAddSurveyRequest} from '../../../../../interface/enquiry/IAddSurveyRequest';

interface IFollowupListHeaderComponentProps {
  taskName: string;
  assigneeRole: string;
  enquiryId: string;
  nextFollowupOrSurveyDate?: string;
}

const FollowupListHeaderComponent: React.FC<IFollowupListHeaderComponentProps> = ({taskName, assigneeRole, enquiryId, nextFollowupOrSurveyDate}) => {
  const [comment, setComment] = useState<string>('');
  const [date, setDate] = useState<string>('');

  const dispatch = useAppDispatch();
  const {
    addFollowupRequesting,
    addFollowupFailure,
    addFollowupSuccess,
    addSurveyRequesting,
    addSurveySuccess,
    addSurveyFailure,
  } = useAppSelector(state => state.Enquiry);
  const {verifiedData} = useAppSelector(state => state.OTP);
  //@ts-ignore
  const {data} = verifiedData || {};
  const {id} = data || {};

  const handleFollowupDate = (date: Date) => {
    setDate(formatDate2(date));
  };

  const handleCommentInputTextChange = (text: string) => {
    setComment(text);
  };

  useEffect(() => {
    if ((!addFollowupRequesting && addFollowupSuccess) || (!addSurveyRequesting && addSurveySuccess)) {
      Toast.show({
        type: 'success',
        text1: taskName == 'FOLLOW UP' ? 'Followup' : 'Survey',
        text2:
          taskName == 'FOLLOW UP'
            ? 'Followup has been added successfully'
            : 'Survey has been added successfully',
      });
      if(taskName == 'FOLLOW UP') {
        dispatch(resetAddFollowupRequest());
        dispatch(getFollowupsRequest(enquiryId));
      } else if(taskName == 'SURVEY') {
        dispatch(resetAddSurveyRequest());
        dispatch(getSurveyListRequest(enquiryId));
      }
    } else if ((!addFollowupRequesting && addFollowupFailure) || (!addSurveyRequesting && addSurveySuccess)) {
      Toast.show({
        type: 'error',
        text1: taskName == 'FOLLOW UP' ? 'Followup' : 'Survey',
        text2:
          taskName == 'FOLLOW UP'
            ? 'Error in adding followup. Try again!'
            : 'Error in adding survey. Try again!',
      });
      if(taskName == 'FOLLOW UP') {
        dispatch(resetAddFollowupRequest());
      } else if(taskName == 'SURVEY') {
        dispatch(resetAddSurveyRequest());
      }
    }
  }, [addFollowupRequesting, addFollowupSuccess, addFollowupFailure, addSurveyRequesting, addSurveySuccess, addSurveyFailure]);

  const handleSave = () => {
    if (taskName == 'FOLLOW UP') {
      const data: IAddFollowupRequest = {
        authId: id,
        // authId: '650efb2d7e3968c4c217a34f',
        enquiryId: enquiryId,
        comment: comment,
        followUpDate: date,
      };
      dispatch(addFollowupRequest(data));
    } else if (taskName == 'SURVEY') {
      const data: IAddSurveyRequest = {
        addedBy: id,
        // addedBy: '650efb2d7e3968c4c217a34f',
        enquiryId: enquiryId,
        comment: comment,
        surveyDate: date,
      };
      dispatch(addSurveyRequest(data));
    }
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
          Next {taskName.charAt(0)}{taskName.substring(1, taskName.length).toLowerCase()} - {nextFollowupOrSurveyDate}
        </Text>
      </View>
      <Spacer height={12} />
      <View style={styles.elementContainer}>
        <DatePickerComponent
          onDateSelect={handleFollowupDate}
          style={styles.datePicker}
          showTime={true}
        />
      </View>
      <Spacer height={12} />
      <View style={styles.elementContainer}>
        <Input
          onChangeText={handleCommentInputTextChange}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          selectionColor={COLOR_BLACK}
          placeholder="Comment"
        />
      </View>
      <Spacer height={12} />
      <Button
        text="SAVE"
        onPress={handleSave}
        style={styles.previewButtonStyle}
        textStyle={styles.textStyle}
      />
      <Spacer height={12} />
      <Spinner show={addFollowupRequesting || addSurveyRequesting} />
    </View>
  );
};

export default FollowupListHeaderComponent;
