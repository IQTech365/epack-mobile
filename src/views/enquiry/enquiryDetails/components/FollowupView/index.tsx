import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import Spinner from '../../../../../common/Spinner';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import {getFollowupsRequest, getSurveyItemListRequest, getSurveyListRequest} from '../../../../../redux/slices/EnquirySlice';
import { formatDate, formatDate3 } from '../../../../../utils/formatter';
import FollowupListHeaderComponent from '../FollowupListHeaderComponent';
import FollowupListItem from '../FollowupListItem';
import styles from './style';
import SurveyItemListView from '../SurveyItemListView';
interface IFollowupViewProps {
  taskName: string;
  assigneeRole: string;
  enquiryId: string;
}

const FollowupView: React.FC<IFollowupViewProps> = ({
  taskName,
  assigneeRole,
  enquiryId,
}) => {
  const dispatch = useAppDispatch();
  const {followups, getFollowupsRequesting,
    surveyItemList} = useAppSelector(state => state.Enquiry,);
  const {data} = followups || {};
  const {data: surveyItemData} = surveyItemList || {};
  const {surveyList, getSurveyListRequesting} = useAppSelector(state => state.Enquiry);
  const { addCompanyInfo, companies } = useAppSelector(state => state.Company);
  const {data: surveyData} = surveyList || {};
  const [taskData, setTaskData] = useState<string>('')

  const getCompanyId = () => {
    let id;
    const { data } = addCompanyInfo || {};
    const { data: companiesData } = companies || {};
    if (data && Object.keys(data).length > 0) {
      id = data._id;
    } else if (
      companiesData &&
      Array.isArray(companiesData) &&
      companiesData.length > 0
    ) {
      const firstCompany = companiesData[0];
      id = firstCompany._id;
    } else if (companiesData && companiesData.hasOwnProperty('_id')) {
      id = companiesData._id;
    }
    return id;
  };
  
  useEffect(() => {
    if(taskName == 'FOLLOW UP') {
      dispatch(getFollowupsRequest(enquiryId));
    } else if(taskName == 'SURVEY') {
      dispatch(getSurveyListRequest(enquiryId));
    }
    if(taskData =='SURVEY ITEM'){
      const payload :any= {
        companyId:getCompanyId()
      }
      dispatch(getSurveyItemListRequest(payload));
    }
  }, [taskName, taskData]);

  const taskNameCallback= (event:string)=>{
    setTaskData(event);
  }
  
  
  const getDataSet = () => {
    let listData = [];
    if(taskName == 'FOLLOW UP' && data && Array.isArray(data) && data.length > 0) {
      listData = data;
    } else if(taskName == 'SURVEY'&& taskData=='' && surveyData && Array.isArray(surveyData) && surveyData.length > 0) {
      listData = surveyData;
    }else if(taskData == 'SURVEY ITEM' && surveyItemData && Array.isArray(surveyItemData) && surveyItemData.length > 0){
      listData = surveyItemData;
    }
    return [...listData].reverse();
  }

  console.log('getDataSet---', JSON.stringify(getDataSet()));

  const getNextFollowupOrSurveyDate = () => {
    let date = 'NA';
    if(getDataSet().length > 0) {
      const firstItem = getDataSet()[0];
      console.log('firstItem---', JSON.stringify(firstItem));
      
      if(taskName == 'FOLLOW UP') {
        date = formatDate3(firstItem.followUpDate)
      } else if(taskName == 'SURVEY') {
        date = formatDate3(firstItem.surveyDate)
      }
    }
    return date;
  }

  return (
    <View style={styles.container}>
      {getFollowupsRequesting ? (
        <Spinner show={getFollowupsRequesting || getSurveyListRequesting} />
      ) : (
        <View style={styles.listWrapper}>
          <FlatList
          //@ts-ignore
          data={getDataSet()}
          renderItem={({item, index}) => taskData == 'SURVEY ITEM'?(
            <SurveyItemListView
            item={item}
          />
          ): (
            <FollowupListItem
              comment={item?.comment}
              date={new Date(item?.followUpDate || item?.surveyDate)}
              enquiryManager=""
            />
          )}
          ListEmptyComponent={() => (
            <View style={styles.emptyView}>
              <Text>{taskName == 'FOLLOW UP' ? 'No Followups found!' :
               taskData == 'SURVEY ITEM'?'No Survey Item found!':'No Survey found!'}</Text>
            </View>
          )}
          ListHeaderComponent={
            <FollowupListHeaderComponent
              taskName={taskName}
              assigneeRole={assigneeRole}
              enquiryId={enquiryId}
              nextFollowupOrSurveyDate={getNextFollowupOrSurveyDate()}
              taskNameCallback={taskNameCallback}
            />
          }
        />
        </View>
      )}
    </View>
  );
};

export default FollowupView;
