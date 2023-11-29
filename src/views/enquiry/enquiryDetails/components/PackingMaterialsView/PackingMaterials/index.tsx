import React, {useEffect} from 'react';
import {FlatList, View, Text} from 'react-native';
import styles from './style';
import {useAppDispatch, useAppSelector} from '../../../../../../redux/hooks';
import {
  getPackingMaterialsRequest,
  resetGetPackingMaterialsRequest,
} from '../../../../../../redux/slices/EnquirySlice';
import {
  IGetPackingMaterialsRequest,
  IMaterial,
  IPackingMaterial,
} from '../../../../../../interface/enquiry/IPackingMaterialsResponse';
import Spacer from '../../../../../../common/Spacer';
import {formatDate5} from '../../../../../../utils/formatter';
import Spinner from '../../../../../../common/Spinner';

interface Props {
  enquiryId: string;
}

const PackingMaterials: React.FC<Props> = ({enquiryId}) => {
  const dispatch = useAppDispatch();
  const {
    packingMaterials,
    getPackingMaterialsRequesting,
    getPackingMaterialsSuccess,
    getPackingMaterialsFailure,
  } = useAppSelector(state => state.Enquiry);
  const {data} = packingMaterials || {};

  useEffect(() => {
    const payload: IGetPackingMaterialsRequest = {
      enquiryId: enquiryId,
    };
    dispatch(getPackingMaterialsRequest(payload));
  }, []);

  useEffect(() => {
    if (
      !getPackingMaterialsRequesting &&
      (getPackingMaterialsSuccess || getPackingMaterialsFailure)
    ) {
      dispatch(resetGetPackingMaterialsRequest());
    }
  }, [
    getPackingMaterialsRequesting,
    getPackingMaterialsSuccess,
    getPackingMaterialsFailure,
  ]);

  const _getPackingMaterials = () => {
    let materials: IMaterial[] = [];
    if (data && Array.isArray(data) && data.length > 0) {
      const item: IPackingMaterial = data[0];
      materials = item.packingMaterial;
    }
    return materials;
  };

  const _getHeaderData = () => {
    let content: IPackingMaterial | null = null;
    if (data && Array.isArray(data) && data.length > 0) {
      content = data[0];
    }
    return content;
  };

  const renderItem = (item: IMaterial, index: number) => {
    return (
      <View style={styles.itemContainer} key={`{${index}`}>
        <View style={styles.itemNameContainer}>
          <Text>{item.name}</Text>
        </View>
        <View style={styles.itemQuantityContainer}>
          <Text>{item.quantity}</Text>
        </View>
        <View style={styles.itemUnitContainer}>
          <Text>{item.type}</Text>
        </View>
      </View>
    );
  };

  const renderHeaderComponent = (data: IPackingMaterial | null) => {
    if (_getPackingMaterials().length == 0) return null;
    return (
      <>
        <View style={styles.packingInfoContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.infoValueText}>
              <Text style={styles.infoLabelText}>Date:</Text>
              {`  ${formatDate5(new Date())}`}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoValueText}>
              <Text style={styles.infoLabelText}>ID:</Text>
              {`  ${data?.enquiryId}`}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoValueText}>
              <Text style={styles.infoLabelText}>Prepared By:</Text>
              {`  Admin`}
            </Text>
          </View>
        </View>
        <View style={styles.headerContainer}>
          <View style={styles.itemNameContainer}>
            <Text style={styles.headerTitleText}>Material Name</Text>
          </View>
          <View style={styles.itemQuantityContainer}>
            <Text style={styles.headerTitleText}>Quantity</Text>
          </View>
          <View style={styles.itemUnitContainer}>
            <Text style={styles.headerTitleText}>Units</Text>
          </View>
        </View>
      </>
    );
  };

  const _renderEmptyView = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text>No Packing Materials Prepared</Text>
      </View>
    );
  };

  if (getPackingMaterialsRequesting) {
    return (
      <View style={styles.emptyContainer}>
        <Spinner show={getPackingMaterialsRequesting} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Spacer height={10} />
      <FlatList
        data={_getPackingMaterials()}
        renderItem={({item, index}) => renderItem(item, index)}
        ListHeaderComponent={renderHeaderComponent(_getHeaderData())}
        ListEmptyComponent={_renderEmptyView()}
      />
    </View>
  );
};

export default PackingMaterials;
