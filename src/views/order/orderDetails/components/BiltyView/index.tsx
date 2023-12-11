import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
} from 'react-native';
import Spacer from '../../../../../common/Spacer';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import BiltyFormView from '../BiltyFormView';
import styles from './styles';
import ListViewIcon from '../../../../../images/icons/list_view_icon.svg';
import ListViewIcon2 from '../../../../../images/icons/list_view_icon2.svg';
import CreateIcon from '../../../../../images/icons/create_icon.svg';
import CreateIcon2 from '../../../../../images/icons/create_icon2.svg';
import {getBiltyListRequest} from '../../../../../redux/slices/OrderSlice';
import Spinner from '../../../../../common/Spinner';
import {BiltyFormContextProvider} from '../../../../../provider/BiltyFormContextProvider';

interface IBiltyViewProps {
  orderId: string;
}

const BiltyView: React.FC<IBiltyViewProps> = ({orderId}) => {
  const dispatch = useAppDispatch();
  const {biltyList, getBiltyListRequesting} = useAppSelector(
    state => state.Order,
  );

  const [showBiltyList, setShowBiltyList] = useState<boolean>(false);
  const [createNewBilty, setCreateNewBilty] = useState<boolean>(true);

  const handleCreateNewBilty = () => {
    setShowBiltyList(false);
    setCreateNewBilty(true);
  };

  const handleShowBiltyList = () => {
    setShowBiltyList(true);
    setCreateNewBilty(false);
  };

  useEffect(() => {
    dispatch(getBiltyListRequest(orderId));
  }, []);

  const showEmptyView = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text>No Bilty Found!</Text>
      </View>
    );
  };

  const handleOnRefresh = useCallback(() => {
    dispatch(getBiltyListRequest(orderId));
  }, []);

  const showForm = () => {
    if (createNewBilty) {
      return (
        <BiltyFormContextProvider>
          <BiltyFormView orderId={orderId} />
        </BiltyFormContextProvider>
      );
    }
    return null;
  };

  const showList = () => {
    if (showBiltyList) {
      return (
        <FlatList
          contentContainerStyle={{alignItems: 'center', paddingVertical: 10}}
          data={[]}
          refreshControl={
            <RefreshControl
              refreshing={getBiltyListRequesting}
              onRefresh={handleOnRefresh}
            />
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
      <View style={styles.container}>
        <TouchableOpacity onPress={handleShowBiltyList} activeOpacity={0.4}>
          {showBiltyList ? (
            <ListViewIcon2 width={30} height={30} />
          ) : (
            <ListViewIcon width={30} height={30} />
          )}
        </TouchableOpacity>
        <Spacer width={10} />
        <TouchableOpacity onPress={handleCreateNewBilty} activeOpacity={0.4}>
          {createNewBilty ? (
            <CreateIcon2 width={30} height={30} />
          ) : (
            <CreateIcon width={30} height={30} />
          )}
        </TouchableOpacity>
        <Spacer width={10} />
      </View>
      {showForm()}
      {showList()}
      <Spinner show={getBiltyListRequesting} />
    </>
  );
};

export default BiltyView;
