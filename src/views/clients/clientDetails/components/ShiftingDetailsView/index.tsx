import React, {useEffect} from 'react';
import {View, FlatList} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import CollapsibleView from '../../../../../common/CollapsibleView';
import Spacer from '../../../../../common/Spacer';
import EnquiryDetailListItem from '../../../../enquiry/enquiryDetails/components/EnquiryDetailListItem';
import styles from './style';
import {ICustomer} from '../../../../../interface/customer/customer';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import {IGetOrdersRequest} from '../../../../../interface/order/IGetOrdersRequest';
import useCompanyId from '../../../../../hooks/useCompanyId';
import {getOrdersRequest} from '../../../../../redux/slices/OrderSlice';
import Spinner from '../../../../../common/Spinner';
import {IGetOrdersData} from '../../../../../interface/order/IGetOrdersResponse';
import {formatDate4} from '../../../../../utils/formatter';

interface IShiftingDetailsViewProps {
  item: ICustomer;
}

const ShiftingDetailsView: React.FC<IShiftingDetailsViewProps> = ({item}) => {
  const {orders, getOrdersRequesting} = useAppSelector(state => state.Order);
  console.log('ShiftingDetailsView--orders--', JSON.stringify(orders));

  const dispatch = useAppDispatch();
  

  const _fetchOrders = async () => {
    const companyId = await useCompanyId();
    const payload: Partial<IGetOrdersRequest> = {
      companyId: companyId,
    };
    dispatch(getOrdersRequest(payload));
  };

  const _getOrderList = (): IGetOrdersData[] => {
    let list: IGetOrdersData[] = [];
    const {data} = orders || {};
    if (data && Array.isArray(data) && data.length > 0) {
      // list = data.filter((d:IGetOrdersData) => d.customerId == item._id);
      list = data;
    }
    return list;
  };

  const renderShiftingInfoItem = (item: IGetOrdersData, index: number) => {
    return (
      <>
        <CollapsibleView
          title={`SHIFTING DATE - ${formatDate4(new Date(item.shiftingDate))}`}
          collapsed={false}>
          <View>
            <View style={styles.elementContainer}>
              <EnquiryDetailListItem
                label="Shifting Type"
                value={item.shiftingType}
              />
              <EnquiryDetailListItem
                label="Shifting From"
                value={item.pickupAddress.city}
              />
              <EnquiryDetailListItem
                label="Shifting To"
                value={item.dropAddress.city}
              />
              <EnquiryDetailListItem
                label="Shifting Luggage"
                value={item.shiftingLuggage.join(', ')}
              />
              <EnquiryDetailListItem
                label="Delivery Date"
                value={item.deliveryDate}
              />
              <EnquiryDetailListItem
                label="Delivered Date"
                value={item.deliveredDate}
                isLast={true}
              />
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={8} />
      </>
    );
  };

  useEffect(() => {
    _fetchOrders();
  }, []);

  return (
    <View style={styles.container}>
      <Spacer height={4} />
      <FlatList
        data={_getOrderList()}
        renderItem={({item, index}) => renderShiftingInfoItem(item, index)}
      />
      <Spacer height={8} />
      <Spinner show={getOrdersRequesting} />
    </View>
  );
};

export default ShiftingDetailsView;
