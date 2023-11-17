import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
} from 'react-native';
import Spacer from '../../../../common/Spacer';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import styles from './style';
import ListViewIcon from '../../../../images/icons/list_view_icon.svg';
import ListViewIcon2 from '../../../../images/icons/list_view_icon2.svg';
import CreateIcon from '../../../../images/icons/create_icon.svg';
import CreateIcon2 from '../../../../images/icons/create_icon2.svg';
// import Spinner from '../../../../../common/Spinner';
import Header from '../../../../common/Header';
import AddDriverView from '../addDriverView';
import AddDriverListItem from '../addDriverListView';
import Spinner from '../../../../common/Spinner';
import { getDriverRequest } from '../../../../redux/slices/VehicleSlice';

interface IAddDriverDetailViewProps {

}

const AddDriverDetailView: React.FC<IAddDriverDetailViewProps> = ({}) => {
  const dispatch = useAppDispatch();
  const {Drivers, getDriversRequesting} = useAppSelector(state => state.Vehicle);
  const {data: DriversData = []} = Drivers || {};
    
  const {
    addCompanyInfo,
    companies
} = useAppSelector(state => state.Company);

  const [showAddDriverDetailList, setShowAddDriverDetailList] = useState<boolean>(false);
  const [createNewAddDriverDetail, setCreateNewAddDriverDetail] = useState<boolean>(true);

  const handleCreateNewAddDriverDetail = () => {
    setShowAddDriverDetailList(false);
    setCreateNewAddDriverDetail(true);
  };

  const handleShowAddDriverDetailList = () => {
    setShowAddDriverDetailList(true);
    setCreateNewAddDriverDetail(false);
  };

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
    } else if(companiesData && companiesData.hasOwnProperty('_id')) {
      id = companiesData._id;
    }
    return id;
};

  useEffect(() => {
    dispatch(getDriverRequest(getCompanyId()));
  }, []);

  const showEmptyView = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text>No AddDriverDetail Found!</Text>
      </View>
    );
  };

  const handleOnRefresh = useCallback(() => {
    dispatch(getDriverRequest(getCompanyId()));
  }, []);

  const showForm = () => {
    if (createNewAddDriverDetail) {
      return <AddDriverView />;
    }
    return null;
  };

  const showList = () => {
    if (showAddDriverDetailList) {
      return (
        <FlatList
          contentContainerStyle={{alignItems: 'center', paddingVertical: 10}}
          data={DriversData}
          refreshControl={
            <RefreshControl refreshing={getDriversRequesting} onRefresh={handleOnRefresh} />
          }
            renderItem={({item, index}) => (
              <View style={{padding: 10}}>
                <AddDriverListItem
                  item={item}
                  index={index}
                  
                />
              </View>
            )}
         
          ListEmptyComponent={showEmptyView()}
        />
      );
    }
    return null;
  };

  return (
    <>
    <Header label="Add Driver" canGoBack={true} />
      <View style={styles.container}>
        <TouchableOpacity onPress={handleShowAddDriverDetailList} activeOpacity={0.4}>
          {showAddDriverDetailList ? (
            <ListViewIcon2 width={30} height={30} />
          ) : (
            <ListViewIcon width={30} height={30} />
          )}
        </TouchableOpacity>
        <Spacer width={10} />
        <TouchableOpacity onPress={handleCreateNewAddDriverDetail} activeOpacity={0.4}>
          {createNewAddDriverDetail ? (
            <CreateIcon2 width={30} height={30} />
          ) : (
            <CreateIcon width={30} height={30} />
          )}
        </TouchableOpacity>
        <Spacer width={10} />
      </View>
      {showForm()}
      {showList()}
      <Spinner show={getDriversRequesting} />
    </>
  );
};

export default AddDriverDetailView;
