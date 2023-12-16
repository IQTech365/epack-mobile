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
import BiltyListItem from './BiltyListItem';
import {IBiltyItem} from './IBiltyItem';
import {
  IBilty,
  IBiltyFreight,
} from '../../../../../interface/order/IGetBiltyListResponse';

interface IBiltyViewProps {
  orderId: string;
}

const BiltyView: React.FC<IBiltyViewProps> = ({orderId}) => {
  const dispatch = useAppDispatch();
  const {biltyList, getBiltyListRequesting} = useAppSelector(
    state => state.Order,
  );
  console.log('biltyList----', JSON.stringify(biltyList));

  const [showBiltyList, setShowBiltyList] = useState<boolean>(false);
  const [createNewBilty, setCreateNewBilty] = useState<boolean>(true);

  const _getBiltyType = (bilty: IBilty) => {
    let biltyType: string = '';
    const {biltyfreights} = bilty;
    if (biltyfreights && biltyfreights.length > 0) {
      const biltyFreight: IBiltyFreight = biltyfreights[0];
      biltyType = biltyFreight.freightDetails.billingStatus;
    }
    return biltyType;
  };

  const _getBiltyData = () => {
    const {data} = biltyList || {};
    let items: IBiltyItem[] = [];
    if (data && Array.isArray(data) && data.length > 0) {
      items = data.map((bilty: IBilty) => {
        const item: IBiltyItem = {
          id: bilty._id,
          enter_date: bilty.createdAt,
          bilty_date: bilty.biltyDate,
          bilty_no: bilty.biltyNumber,
          billing_by: 'NA',
          moving_type: 'NA', // TODO: Not available in the api response
          from_location: bilty.vehicle.shiftingFrom,
          to_location: bilty.vehicle.shiftingTo,
          transit_days: bilty.vehicle.transitDays,
          risk_type: bilty.riskType,
          tax_liability: 'NA', //TODO: Not available in the api response
          billing_type: _getBiltyType(bilty),
          expected_date_of_delivery: bilty.vehicle.expectedDateOfDelivery,
        };
        return item;
      });
    }
    return items;
  };

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

  const onPress = () => {};

  const onShare = () => {};

  const onDownload = () => {};

  const onPreview = () => {};

  const onEdit = () => {};

  const showList = () => {
    if (showBiltyList) {
      return (
        <FlatList
          contentContainerStyle={{alignItems: 'center', paddingVertical: 10}}
          data={_getBiltyData()}
          refreshControl={
            <RefreshControl
              refreshing={getBiltyListRequesting}
              onRefresh={handleOnRefresh}
            />
          }
          renderItem={({item, index}) => (
            <BiltyListItem
              item={item}
              index={index}
              onPress={onPress}
              onShare={onShare}
              onDownload={onDownload}
              onPreview={onPreview}
              onEdit={onEdit}
            />
          )}
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
