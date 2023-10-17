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
import styles from './styles';
import ListViewIcon from '../../../../../images/icons/list_view_icon.svg';
import ListViewIcon2 from '../../../../../images/icons/list_view_icon2.svg';
import CreateIcon from '../../../../../images/icons/create_icon.svg';
import CreateIcon2 from '../../../../../images/icons/create_icon2.svg';
import CarConditionFormView from '../CarConditionFormView';
import { getCarConditionListRequest } from '../../../../../redux/slices/OrderSlice';
import Spinner from '../../../../../common/Spinner';

interface ICarConditionViewProps {
  orderId: string;
}

const CarConditionView: React.FC<ICarConditionViewProps> = ({orderId}) => {
  const dispatch = useAppDispatch();
  const {carConditionList, getCarConditionListRequesting} = useAppSelector(state => state.Order);

  const [showCarConditionList, setShowCarConditionList] = useState<boolean>(false);
  const [createNewCarCondition, setCreateNewCarCondition] = useState<boolean>(true);

  const handleCreateNewCarCondition = () => {
    setShowCarConditionList(false);
    setCreateNewCarCondition(true);
  };

  const handleShowCarConditionList = () => {
    setShowCarConditionList(true);
    setCreateNewCarCondition(false);
  };

  useEffect(() => {
    dispatch(getCarConditionListRequest(orderId));
  }, []);

  const showEmptyView = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text>No CarCondition Found!</Text>
      </View>
    );
  };

  const handleOnRefresh = useCallback(() => {
    dispatch(getCarConditionListRequest(orderId));
  }, []);

  const showForm = () => {
    if (createNewCarCondition) {
      return <CarConditionFormView orderId={orderId} />;
    }
    return null;
  };

  const showList = () => {
    if (showCarConditionList) {
      return (
        <FlatList
          contentContainerStyle={{alignItems: 'center', paddingVertical: 10}}
          data={[]}
          refreshControl={
            <RefreshControl refreshing={getCarConditionListRequesting} onRefresh={handleOnRefresh} />
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
        <TouchableOpacity onPress={handleShowCarConditionList} activeOpacity={0.4}>
          {showCarConditionList ? (
            <ListViewIcon2 width={30} height={30} />
          ) : (
            <ListViewIcon width={30} height={30} />
          )}
        </TouchableOpacity>
        <Spacer width={10} />
        <TouchableOpacity onPress={handleCreateNewCarCondition} activeOpacity={0.4}>
          {createNewCarCondition ? (
            <CreateIcon2 width={30} height={30} />
          ) : (
            <CreateIcon width={30} height={30} />
          )}
        </TouchableOpacity>
        <Spacer width={10} />
      </View>
      {showForm()}
      {showList()}
      <Spinner show={getCarConditionListRequesting} />
    </>
  );
};

export default CarConditionView;
