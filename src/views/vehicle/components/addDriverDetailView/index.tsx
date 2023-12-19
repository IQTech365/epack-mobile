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
import {getDriverRequest} from '../../../../redux/slices/VehicleSlice';
import useCompanyId from '../../../../hooks/useCompanyId';
import {AddDriverFormContextProvider} from '../../../../provider/AddDriverFormContextProvider';

interface IAddDriverDetailViewProps {}

const AddDriverDetailView: React.FC<IAddDriverDetailViewProps> = ({}) => {
  const dispatch = useAppDispatch();
  const {Drivers, getDriversRequesting} = useAppSelector(
    state => state.Vehicle,
  );
  const {data: DriversData = []} = Drivers || {};

  const {addCompanyInfo, companies} = useAppSelector(state => state.Company);
  const companyId = useCompanyId();

  const [showAddDriverDetailList, setShowAddDriverDetailList] =
    useState<boolean>(false);
  const [createNewAddDriverDetail, setCreateNewAddDriverDetail] =
    useState<boolean>(true);

  const handleCreateNewAddDriverDetail = () => {
    setShowAddDriverDetailList(false);
    setCreateNewAddDriverDetail(true);
  };

  const handleShowAddDriverDetailList = () => {
    setShowAddDriverDetailList(true);
    setCreateNewAddDriverDetail(false);
  };

  useEffect(() => {
    dispatch(getDriverRequest(companyId));
  }, []);

  const showEmptyView = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text>No AddDriverDetail Found!</Text>
      </View>
    );
  };

  const handleOnRefresh = useCallback(() => {
    dispatch(getDriverRequest(companyId));
  }, []);

  const showForm = () => {
    if (createNewAddDriverDetail) {
      return (
        <AddDriverFormContextProvider>
          <AddDriverView />
        </AddDriverFormContextProvider>
      );
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
            <RefreshControl
              refreshing={getDriversRequesting}
              onRefresh={handleOnRefresh}
            />
          }
          renderItem={({item, index}) => (
            <View style={{padding: 10}}>
              <AddDriverListItem item={item} index={index} />
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
        <TouchableOpacity
          onPress={handleShowAddDriverDetailList}
          activeOpacity={0.4}>
          {showAddDriverDetailList ? (
            <ListViewIcon2 width={30} height={30} />
          ) : (
            <ListViewIcon width={30} height={30} />
          )}
        </TouchableOpacity>
        <Spacer width={10} />
        <TouchableOpacity
          onPress={handleCreateNewAddDriverDetail}
          activeOpacity={0.4}>
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
