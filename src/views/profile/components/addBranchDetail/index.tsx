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
import AddBranchUpdateView from '../addBranchUpdateView';
import { getBranchsRequest } from '../../../../redux/slices/MyProfile';
import Spinner from '../../../../common/Spinner';
import AddBranchListItem from '../addBranchList';
import useCompanyId from '../../../../hooks/useCompanyId';

const AddBranchView = () => {
  const [showBranchList, setshowBranchList] = useState<boolean>(false);
  const [showAddBranch, setshowAddBranch] = useState<boolean>(true);
  const {Branchs, getBranchsRequesting} = useAppSelector(
    state => state.Myprofile,
  );
  const {data: BranchsData = []} = Branchs || {};
  const dispatch = useAppDispatch();
  const companyId = useCompanyId();

  const handleCreateNewContent = () => {
    setshowBranchList(false);
    setshowAddBranch(true);
  };

  const handleShowContent = () => {
    setshowBranchList(true);
    setshowAddBranch(false);
  };

  const showEmptyView = () => {
    return (
      <View style={styles.emptyContainer2}>
        <Text>No content Found!</Text>
      </View>
    );
  };

  const showForm = () => {
    if (showAddBranch) {
      return <AddBranchUpdateView/>;
    }
    return null;
  };

  const showList = () => {
    if (showBranchList) {
      return (
        <FlatList
          data={BranchsData}
          refreshControl={
            <RefreshControl
              refreshing={getBranchsRequesting}
              onRefresh={handleOnRefresh}
            />
          }
          renderItem={({item, index}) => (
            <View style={{padding: 10}}>
              <AddBranchListItem
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
    dispatch(getBranchsRequest(companyId));
  }, []);

  useEffect(() => {
    dispatch(getBranchsRequest(companyId))
  }, []);

  return (
    <View style={styles.container}>
         <Header label="Add Branch" canGoBack={true} />
      <View style={styles.container2}>
        <TouchableOpacity onPress={handleShowContent} activeOpacity={0.4}>
          {showBranchList ? (
            <ListViewIcon2 width={30} height={30} />
          ) : (
            <ListViewIcon width={30} height={30} />
          )}
        </TouchableOpacity>
        <Spacer width={10} />
        <TouchableOpacity onPress={handleCreateNewContent} activeOpacity={0.4}>
          {showAddBranch ? (
            <CreateIcon2 width={30} height={30} />
          ) : (
            <CreateIcon width={30} height={30} />
          )}
        </TouchableOpacity>
        <Spacer width={10} />
      </View>
      {showForm()}
      {showList()}
      <Spinner show={getBranchsRequesting} />
    </View>
  );
};

export default AddBranchView;
