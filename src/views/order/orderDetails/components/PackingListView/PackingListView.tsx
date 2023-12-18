import React from 'react';
import {View, Text, FlatList} from 'react-native';
import styles from './style';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import {IPackingMaterialData} from '../../../../../interface/order/IPackingMaterialResponse';

interface Props {
  orderId: string;
}

const PackingListView: React.FC<Props> = ({orderId}) => {
  const dispatch = useAppDispatch();
  const {getPackingMaterialsRequesting, packingMaterials} = useAppSelector(
    state => state.Order,
  );

  const _getPackingMaterils = () => {
    let items: IPackingMaterialData[] = [];
    const {data} = packingMaterials || {};
    if (data && Array.isArray(data) && data.length > 0) {
      // items = data.map(d:I)
    }
    return items;
  };

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
