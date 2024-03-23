import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Button from '../../../../../common/Button';
import DatePickerComponent from '../../../../../common/DatePickerComponent';
import Input from '../../../../../common/Input';
import Spacer from '../../../../../common/Spacer';
import { COLOR_BLACK } from '../../../../../utils/colors';
import styles from './style';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { IAddFollowupRequest } from '../../../../../interface/enquiry/IAddFollowupRequest';
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
import { IAddSurveyRequest } from '../../../../../interface/enquiry/IAddSurveyRequest';
import SurveyTab from '../../../../../data/survey.json';
import SurveyListView from '../SurveyListView';
import useAuthId from '../../../../../hooks/useAuthId';
import { EventRegister } from 'react-native-event-listeners';
import { getCurrentCompanyId } from '../../../../../utils/storage';

interface IFollowupListHeaderComponentProps {
  taskName: string;
  assigneeRole: string;
  enquiryId: string;
  nextFollowupOrSurveyDate?: string;
  taskNameCallback:(data: string)=>void
  isOrder:boolean;
}

const FollowupListHeaderComponent: React.FC<IFollowupListHeaderComponentProps> = ({ taskName, assigneeRole, enquiryId, nextFollowupOrSurveyDate, taskNameCallback, isOrder = false }) => {
  const [comment, setComment] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [activeTabIndex, setActiveTabIndex] = useState<number>(isOrder ? 1 : 0);

  const dispatch = useAppDispatch();
  const {
    addFollowupRequesting,
    addFollowupFailure,
    addFollowupSuccess,
    addSurveyRequesting,
    addSurveySuccess,
    addSurveyFailure,
  } = useAppSelector(state => state.Enquiry);
  const { verifiedData } = useAppSelector(state => state.OTP);
  //@ts-ignore
  const authId = useAuthId();

  const handleFollowupDate = (date: Date) => {
    setDate(date);
  };

  const handleCommentInputTextChange = (text: string) => {
    setComment(text);
  };

  const handleTabChange = (index: number) => {
    setActiveTabIndex(index);
    if(index == 1){
    taskNameCallback('SURVEY ITEM')
    }else{
      taskNameCallback('')
    }

  };

  const showTabItem = () => {
    switch (activeTabIndex) {
      case 0:
        return SurveyRoute();
      case 1:
        return <SurveyListView enquiryId ={enquiryId}/>
      default:
        return null;
    }
  };

  const _getRole = () => {
    let role:string = '';
    if(assigneeRole == 'Enquiry') {
      role = 'Enquiry Manager';
    } else if(assigneeRole == 'Survey') {
      role = 'Surveyor';
    }
    return role;
  }

  const SurveyRoute = () => (
    <><Spacer height={8} /><View style={styles.contentContainer}>
      <Text style={styles.contentLabelText}>
        {_getRole()} - <Text style={styles.nameText}>Admin</Text>
      </Text>
    </View><Spacer height={8} /><View style={styles.contentContainer}>
        <Text style={styles.contentLabelText}>
          Next {taskName.charAt(0)}{taskName.substring(1, taskName.length).toLowerCase()} - {nextFollowupOrSurveyDate}
        </Text>
      </View><Spacer height={12} /><View style={styles.elementContainer}>
        <DatePickerComponent
          onDateSelect={handleFollowupDate}
          style={styles.datePicker}
          showTime={true} />
      </View><Spacer height={12} /><View style={styles.elementContainer}>
        <Input
          onChangeText={handleCommentInputTextChange}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          selectionColor={COLOR_BLACK}
          placeholder="Comment" />
      </View><Spacer height={12} />
      <Button
        text="SAVE"
        onPress={handleSave}
        style={styles.previewButtonStyle}
        textStyle={styles.textStyle} /></>
  );



  useEffect(() => {
    if(taskName == 'FOLLOW UP'){
      taskNameCallback('')
    }else if(taskName == 'SURVEY'){
      taskNameCallback('')
    }
    if ((!addFollowupRequesting && addFollowupSuccess) || (!addSurveyRequesting && addSurveySuccess)) {
      Toast.show({
        type: 'success',
        text1: taskName == 'FOLLOW UP' ? 'Followup' : 'Survey',
        text2:
          taskName == 'FOLLOW UP'
            ? 'Followup has been added successfully'
            : 'Survey has been added successfully',
      });
      if (taskName == 'FOLLOW UP') {
        dispatch(resetAddFollowupRequest());
        dispatch(getFollowupsRequest(enquiryId));
      } else if (taskName == 'SURVEY') {
        dispatch(resetAddSurveyRequest());
        dispatch(getSurveyListRequest(enquiryId));
      }
      EventRegister.emit('onUpdateEvent', true);
    } else if ((!addFollowupRequesting && addFollowupFailure) || (!addSurveyRequesting && addSurveySuccess)) {
      Toast.show({
        type: 'error',
        text1: taskName == 'FOLLOW UP' ? 'Followup' : 'Survey',
        text2:
          taskName == 'FOLLOW UP'
            ? 'Error in adding followup. Try again!'
            : 'Error in adding survey. Try again!',
      });
      if (taskName == 'FOLLOW UP') {
        dispatch(resetAddFollowupRequest());
      } else if (taskName == 'SURVEY') {
        dispatch(resetAddSurveyRequest());
      }
    }
  }, [addFollowupRequesting, addFollowupSuccess, addFollowupFailure, addSurveyRequesting, addSurveySuccess, addSurveyFailure]);

  const handleSave = async () => {
    const companyId = await getCurrentCompanyId();
    if (taskName == 'FOLLOW UP') {
      const data: IAddFollowupRequest = {
        companyId: companyId as string,
        // franchiseId: "",
        // branchId: "",
        authId: authId,
        enquiryId: enquiryId,
        comment: comment,
        followUpDate: date.toString(),
      };
      dispatch(addFollowupRequest(data));
    } else if (taskName == 'SURVEY') {
      const data: IAddSurveyRequest = {
        companyId: companyId as string,
        // franchiseId: "",
        // branchId: "",
        addedBy: authId,
        enquiryId: enquiryId,
        comment: comment,
        surveyDate: date.toString(),
      };
      dispatch(addSurveyRequest(data));
    }
  };

  return (
    <View style={styles.container}>
      <Spacer height={4} />
      {taskName == 'FOLLOW UP' ?
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>{taskName}</Text>
        </View>
        :
        <View style={styles.tabsContainer}>
          <FlatList
            style={{ paddingHorizontal: 8 }}
            data={SurveyTab}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              const container = index === activeTabIndex ? styles.containerActive : styles.container2;
              const textStyle = index === activeTabIndex ? styles.activeText : styles.inactiveText;
              return(
              <TouchableOpacity
                style={container}
                onPress={() => handleTabChange(index)}
                activeOpacity={0.6}
                key={`${index}`}>
                <Text style={textStyle}>{item.label}</Text>
              </TouchableOpacity>
              )
            }
            }
          />
        </View>
      }

      {taskName == 'FOLLOW UP' ? SurveyRoute() : <><Spacer height={10} />
        {showTabItem()}</>}
      <Spacer height={12} />
      <Spinner show={addFollowupRequesting || addSurveyRequesting} />
    </View>
  );
};

export default FollowupListHeaderComponent;
