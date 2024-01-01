import React, { useEffect } from 'react';
import {View, Text, FlatList} from 'react-native';
import styles from './style';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import {IGetPackingListRequest, IPackingListData} from '../../../../../interface/order/IPackingMaterialResponse';
import { getPackingMaterialsRequest } from '../../../../../redux/slices/OrderSlice';
import useCompanyId from '../../../../../hooks/useCompanyId';

interface Props {
  orderId: string;
}

const PackingListView: React.FC<Props> = ({orderId}) => {
  const dispatch = useAppDispatch();
  const {getPackingMaterialsRequesting, packingMaterials} = useAppSelector(
    state => state.Order,
  );
  console.log('packingMaterials-----', JSON.stringify(packingMaterials));
  
  const _getPackingMaterils = () => {
    let items: IPackingListData[] = [];
    const {data} = packingMaterials || {};
    if (data && Array.isArray(data) && data.length > 0) {
      // items = data.map(d:I)
    }
    return items;
  };

  const _getPackingMaterialsRequest = async () => {
    const companyId = await useCompanyId();
    const payload:IGetPackingListRequest = {
      companyId: companyId,
      enquiryId: orderId
  }
  dispatch(getPackingMaterialsRequest(payload));
  }

  useEffect(() => {
    _getPackingMaterialsRequest();
  }, []);

  return (
    <View>
      <FlatList
        data={_getPackingMaterils()}
        renderItem={({item, index}) => <Text>Hello</Text>}
      />
    </View>
  );
};

export default PackingListView;
