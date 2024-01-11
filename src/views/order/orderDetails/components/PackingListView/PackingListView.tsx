import React, { useEffect } from 'react';
import {View, Text, FlatList} from 'react-native';
import styles from './style';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import {IGetPackingListRequest, IPackingListData} from '../../../../../interface/order/IPackingMaterialResponse';
import { getPackingMaterialsRequest } from '../../../../../redux/slices/OrderSlice';
import { getCurrentCompanyId } from '../../../../../utils/storage';

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

  const showEmptyView = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.text}>No Packing Info Found!</Text>
      </View>
    );
  };

  const _getPackingMaterialsRequest = () => {
    getCurrentCompanyId().then(id => {
      const payload:IGetPackingListRequest = {
        companyId: id as string,
        enquiryId: orderId
    }
      dispatch(getPackingMaterialsRequest(payload));
    }).catch(err => console.log(err));
  }

  useEffect(() => {
    _getPackingMaterialsRequest();
  }, []);

  return (
    <View>
      <FlatList
        data={_getPackingMaterils()}
        renderItem={({item, index}) => <Text>Hello</Text>}
        ListEmptyComponent={showEmptyView()}
      />
    </View>
  );
};

export default PackingListView;
