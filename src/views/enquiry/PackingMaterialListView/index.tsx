import React, {useEffect} from 'react';
import {FlatList, View, Text, TouchableOpacity} from 'react-native';
import styles from './style';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {
  getPackingMaterialsRequest,
  resetGetPackingMaterialsRequest,
} from '../../../redux/slices/EnquirySlice';
import {
  IGetPackingMaterialsRequest,
  IMaterial,
  IPackingMaterial,
} from '../../../interface/enquiry/IPackingMaterialsResponse';
import Spacer from '../../../common/Spacer';
import {formatDate5} from '../../../utils/formatter';
import Spinner from '../../../common/Spinner';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {EnquiryStackParamList} from '../../../navigation/params/EnquiryStackParamList';
import Header from '../../../common/Header';
import EditIcon from '../../../images/icons/edit2.svg';
import DeleteIcon from '../../../images/icons/delete.svg';

type IProps = NativeStackScreenProps<
  EnquiryStackParamList,
  'EditPackingMaterials'
>;

const PackingMaterialListView: React.FC<IProps> = ({route, navigation}) => {
  const enquiryId: string | undefined = route.params?.enquiryId;
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
        <View style={styles.itemContentContainer}>
          <View style={styles.item}>
            <Text style={styles.label}>{`Material: `}</Text>
            <Text style={styles.text}>{item.name}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>{"Quantity: "}</Text>
            <Text style={styles.text}>{item.quantity}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>{"Unit: "}</Text>
            <Text style={styles.text}>{item.type ?? 'NA'}</Text>
          </View>
        </View>
        <View style={styles.itemActionContainer}>
          <TouchableOpacity>
            <EditIcon width={24} height={24} />
          </TouchableOpacity>
          <Spacer height={10} />
          <TouchableOpacity>
            <DeleteIcon width={24} height={24} />
          </TouchableOpacity>
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
      <Header canGoBack={true} label="PACKING MATERIALS" />
      <Spacer height={10} />
      <FlatList
        data={_getPackingMaterials()}
        renderItem={({item, index}) => renderItem(item, index)}
        // ListHeaderComponent={renderHeaderComponent(_getHeaderData())}
        ListEmptyComponent={_renderEmptyView()}
      />
    </View>
  );
};

export default PackingMaterialListView;
