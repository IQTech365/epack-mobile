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

interface IAddLorryDetailViewProps {

}

const AddLorryDetailView: React.FC<IAddLorryDetailViewProps> = ({}) => {
  const dispatch = useAppDispatch();
  const {AddLorryDetailList, getAddLorryDetailListRequesting} = useAppSelector(state => state.Order);

  const [showAddLorryDetailList, setShowAddLorryDetailList] = useState<boolean>(false);
  const [createNewAddLorryDetail, setCreateNewAddLorryDetail] = useState<boolean>(true);

  const handleCreateNewAddLorryDetail = () => {
    setShowAddLorryDetailList(false);
    setCreateNewAddLorryDetail(true);
  };

  const handleShowAddLorryDetailList = () => {
    setShowAddLorryDetailList(true);
    setCreateNewAddLorryDetail(false);
  };

  useEffect(() => {
    // dispatch(getAddLorryDetailListRequest(orderId));
  }, []);

  const showEmptyView = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text>No AddLorryDetail Found!</Text>
      </View>
    );
  };

  const handleOnRefresh = useCallback(() => {
    // dispatch(getAddLorryDetailListRequest(orderId));
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
          data={[]}
          refreshControl={
            <RefreshControl refreshing={getAddLorryDetailListRequesting} onRefresh={handleOnRefresh} />
          }
          //   renderItem={({item, index}) => (
          //     <QuotationListItem item={item} index={1} onPress={() => {}} />
          //   )}
          renderItem={({item, index}) => <Text>Bilty item</Text>}
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
      {/* <Spinner show={getAddLorryDetailListRequesting} /> */}
    </>
  );
};

export default AddLorryDetailView;
