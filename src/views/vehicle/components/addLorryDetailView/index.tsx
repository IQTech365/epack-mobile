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
import AddLorryView from '../addLorryView';
import Header from '../../../../common/Header';
import { getLorryRequest } from '../../../../redux/slices/VehicleSlice';
import AddLorryListItem from '../addLorryListView';
import Spinner from '../../../../common/Spinner';

interface IAddLorryDetailViewProps {

}

const AddLorryDetailView: React.FC<IAddLorryDetailViewProps> = ({}) => {
  const dispatch = useAppDispatch();
  const {lorryData, getLorryRequesting} = useAppSelector(state => state.Vehicle);
  
  const {
    addCompanyInfo,
    companies
} = useAppSelector(state => state.Company);

  const [showAddLorryDetailList, setShowAddLorryDetailList] = useState<boolean>(false);
  const [createNewAddLorryDetail, setCreateNewAddLorryDetail] = useState<boolean>(true);
  const {data: lorryArray = []} = lorryData || {};

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
    }
    return id;
};

  const handleCreateNewAddLorryDetail = () => {
    setShowAddLorryDetailList(false);
    setCreateNewAddLorryDetail(true);
  };

  const handleShowAddLorryDetailList = () => {
    setShowAddLorryDetailList(true);
    setCreateNewAddLorryDetail(false);
  };

  useEffect(() => {
    dispatch(getLorryRequest(getCompanyId()));
  }, []);

  const showEmptyView = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text>No AddLorryDetail Found!</Text>
      </View>
    );
  };

  const handleOnRefresh = useCallback(() => {
    dispatch(getLorryRequest(getCompanyId()));
  }, []);

  const showForm = () => {
    if (createNewAddLorryDetail) {
      return <AddLorryView />;
    }
    return null;
  };

  const showList = () => {
    if (showAddLorryDetailList) {
      return (
        <FlatList
          contentContainerStyle={{alignItems: 'center', paddingVertical: 10}}
          data={lorryArray}
          refreshControl={
            <RefreshControl refreshing={getLorryRequesting} onRefresh={handleOnRefresh} />
          }
            renderItem={({item, index}) => (
                <View style={{padding: 10}}>
                <AddLorryListItem
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
    <Header label="Add Lorry" canGoBack={true} />
      <View style={styles.container}>
        <TouchableOpacity onPress={handleShowAddLorryDetailList} activeOpacity={0.4}>
          {showAddLorryDetailList ? (
            <ListViewIcon2 width={30} height={30} />
          ) : (
            <ListViewIcon width={30} height={30} />
          )}
        </TouchableOpacity>
        <Spacer width={10} />
        <TouchableOpacity onPress={handleCreateNewAddLorryDetail} activeOpacity={0.4}>
          {createNewAddLorryDetail ? (
            <CreateIcon2 width={30} height={30} />
          ) : (
            <CreateIcon width={30} height={30} />
          )}
        </TouchableOpacity>
        <Spacer width={10} />
      </View>
      {showForm()}
      {showList()}
      <Spinner show={getLorryRequesting} />
    </>
  );
};

export default AddLorryDetailView;
