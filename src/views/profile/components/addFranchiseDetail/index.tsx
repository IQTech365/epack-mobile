import React, {useCallback, useEffect, useState} from 'react';
import {View, FlatList, TouchableOpacity, Text, RefreshControl} from 'react-native';
import styles from './style';
import ListViewIcon from '../../../../images/icons/list_view_icon.svg';
import ListViewIcon2 from '../../../../images/icons/list_view_icon2.svg';
import CreateIcon from '../../../../images/icons/create_icon.svg';
import CreateIcon2 from '../../../../images/icons/create_icon2.svg';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import Spacer from '../../../../common/Spacer';
import Header from '../../../../common/Header';
import AddFranchiseUpdateView from '../addFranchiseUpdateView';
import { getFranchiseRequest } from '../../../../redux/slices/MyProfile';
import AddFranchiseListItem from '../addFranchiseList';
import Spinner from '../../../../common/Spinner';
import useCompanyId from '../../../../hooks/useCompanyId';

const AddFranchiseView = () => {
  const [showFranchiseList, setshowFranchiseList] = useState<boolean>(false);
  const [showAddFranchise, setshowAddFranchise] = useState<boolean>(true);
  const {Franchises, getFranchiseRequesting} = useAppSelector(
    state => state.Myprofile,
  );
  const dispatch = useAppDispatch();
  const {data: franchiseData = []} = Franchises || {};
  const companyId = useCompanyId();

  const handleCreateNewContent = () => {
    setshowFranchiseList(false);
    setshowAddFranchise(true);
  };

  const handleShowContent = () => {
    setshowFranchiseList(true);
    setshowAddFranchise(false);
    dispatch(getFranchiseRequest(companyId));
  };

  const showEmptyView = () => {
    return (
      <View style={styles.emptyContainer2}>
        <Text>No content Found!</Text>
      </View>
    );
  };

  const showForm = () => {
    if (showAddFranchise) {
      return <AddFranchiseUpdateView/>;
    }
    return null;
  };

  const showList = () => {
    if (showFranchiseList) {
      return (
        <FlatList
          data={franchiseData}
          refreshControl={
            <RefreshControl
              refreshing={getFranchiseRequesting}
              onRefresh={handleOnRefresh}
            />
          }
          renderItem={({item, index}) =>(
            <View style={{padding: 10}}>
              <AddFranchiseListItem
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
  const handleOnRefresh = useCallback(() => {
    dispatch(getFranchiseRequest(companyId));
  }, []);

  useEffect(() => {
    dispatch(getFranchiseRequest(companyId))
  }, []);


  return (
    <View style={styles.container}>
         <Header label="Add Franchise" canGoBack={true} />
      <View style={styles.container2}>
        <TouchableOpacity onPress={handleShowContent} activeOpacity={0.4}>
          {showFranchiseList ? (
            <ListViewIcon2 width={30} height={30} />
          ) : (
            <ListViewIcon width={30} height={30} />
          )}
        </TouchableOpacity>
        <Spacer width={10} />
        <TouchableOpacity onPress={handleCreateNewContent} activeOpacity={0.4}>
          {showAddFranchise ? (
            <CreateIcon2 width={30} height={30} />
          ) : (
            <CreateIcon width={30} height={30} />
          )}
        </TouchableOpacity>
        <Spacer width={10} />
      </View>
      {showForm()}
      {showList()}
      <Spinner show={getFranchiseRequesting} />
    </View>
  );
};

export default AddFranchiseView;
