import React, {useEffect, useState} from 'react';
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
import ModalHOC from '../../../common/ModalHOC';
import UpdatePackingMaterialView from '../enquiryDetails/components/PackingMaterialsView/UpdatePackingMaterial';

type IProps = NativeStackScreenProps<
  EnquiryStackParamList,
  'EditPackingMaterials'
>;

const PackingMaterialListView: React.FC<IProps> = ({route, navigation}) => {
  const [packingMaterial, setPackingMaterial] = useState<IMaterial | null>(
    null,
  );
  const [openModal, setOpenModal] = useState<boolean>(false);
  // const [packingsMaterial,setPackingsMaterial] = useState<IPackingMaterial[]>([]);
  const [packingsMaterial, setPackingsMaterial] = useState<IMaterial[]>([]);
  const [shouldSave, setShouldSave] = useState<boolean>(false);
  const [itemIndex, setItemIndex] = useState<number>(-1);
  const [addNew, setAddNew] = useState<boolean>(false);
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

  const _handleDelete = (index: number) => {
    const copy = [...packingsMaterial];
    copy.splice(index, 1);
    setPackingsMaterial(copy);
    setShouldSave(true);
  };

  const _handleUpdate = (index: number, item: IPackingMaterial) => {
    setPackingMaterial(item);
    setItemIndex(index);
    setOpenModal(true);
  };

  const _handleModalClose = () => {
    setOpenModal(false);
  };

  const _onUpdate = (index: number, item: IPackingMaterial) => {
    const copy = [...packingsMaterial];
    if (addNew) {
      copy.push(item);
    } else {
      copy.splice(index, 1, item);
    }
    setOpenModal(false);
    setPackingsMaterial(copy);
    setShouldSave(true);
  };

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
            <Text style={styles.label}>{'Quantity: '}</Text>
            <Text style={styles.text}>{item.quantity}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>{'Unit: '}</Text>
            <Text style={styles.text}>{item.type ?? 'NA'}</Text>
          </View>
        </View>
        <View style={styles.itemActionContainer}>
          <TouchableOpacity onPress={() => _handleUpdate(index, item)}>
            <EditIcon width={24} height={24} />
          </TouchableOpacity>
          <Spacer height={10} />
          <TouchableOpacity onPress={() => _handleDelete(index)}>
            <DeleteIcon width={24} height={24} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const _renderEmptyView = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.text}>No Packing Materials Prepared</Text>
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
      <ModalHOC
        visible={openModal}
        onClose={_handleModalClose}
        title="PACKING MATERIAL">
        <View>
          <UpdatePackingMaterialView
            item={packingMaterial as IMaterial}
            index={itemIndex}
            onUpdate={_onUpdate}
            // isNew={addNew}
          />
        </View>
      </ModalHOC>
    </View>
  );
};

export default PackingMaterialListView;
