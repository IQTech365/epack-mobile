import React, {useEffect, useState} from 'react';
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import styles from './style';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {
  getPackingMaterialsRequest,
  resetUpdatePackingMaterialListRequest,
  updatePackingMaterialListRequest,
} from '../../../redux/slices/EnquirySlice';
import {
  IGetPackingMaterialsRequest,
  IMaterial,
  IPackingMaterial,
} from '../../../interface/enquiry/IPackingMaterialsResponse';
import Spacer from '../../../common/Spacer';
import Spinner from '../../../common/Spinner';
import EditIcon from '../../../images/icons/edit2.svg';
import DeleteIcon from '../../../images/icons/delete.svg';
import MaterialListUpdateModal from '../../../common/MaterialListUpdateModal';
import _ from 'underscore';
import {
  IUpdatePackingMaterialPayload,
  IUpdatePackingMaterialRequest,
} from '../../../interface/enquiry/IUpdatePackingMaterialResponse';
import MaterialListAddModal from '../../../common/MaterialListAddModal';
import {IPackingItem} from '../enquiryDetails/components/PackingMaterialsView/utils';
import MaterialListUpdateVehicleSizeModal from '../../../common/MaterialListUpdateVehicleSizeModal';

interface IProps {
  enquiryId: string;
}

const PackingMaterialListView: React.FC<IProps> = ({enquiryId}) => {
  const [packingMaterial, setPackingMaterial] = useState<IMaterial | null>(
    null,
  );
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openVehicleSizeModal, setOpenVehicleSizeModal] = useState(false);
  const [itemIndex, setItemIndex] = useState<number>(-1);
  const dispatch = useAppDispatch();
  const {
    packingMaterials,
    getPackingMaterialsRequesting,
    updatePackingMaterialRequesting,
    updatePackingMaterialSuccess,
    updatePackingMaterialFailure,
  } = useAppSelector(state => state.Enquiry);
  const {data} = packingMaterials || {};
  const _handleDelete = (index: number) => {
    const copy = [..._getPackingMaterials()];
    copy.splice(index, 1);
    const material: IPackingMaterial =
      _getPackingMaterialList() as IPackingMaterial;
    if (!_.isNull(material)) {
      const data: IUpdatePackingMaterialRequest = {
        enquiryId: enquiryId as string,
        vehicleLoadSize: material.vehicleLoadSize,
        packingMaterial: copy,
      };
      const payload: IUpdatePackingMaterialPayload = {
        id: material._id,
        data,
      };
      dispatch(updatePackingMaterialListRequest(payload));
    }
  };

  const _handleUpdate = (index: number, item: IMaterial) => {
    setPackingMaterial(item);
    setItemIndex(index);
    setOpenModal(true);
  };

  const _handleModalClose = () => {
    setOpenModal(false);
    setOpenVehicleSizeModal(false);
  };

  const _handleAddModalClose = () => {
    setOpenAddModal(false);
  };

  const _onUpdate = (index: number, item: IMaterial) => {
    setOpenModal(false);
    setOpenVehicleSizeModal(false);
    const copy = [..._getPackingMaterials()];
    copy.splice(index, 1, item);
    const material: IPackingMaterial =
      _getPackingMaterialList() as IPackingMaterial;
    if (!_.isNull(material)) {
      const data: IUpdatePackingMaterialRequest = {
        enquiryId: enquiryId as string,
        vehicleLoadSize: material.vehicleLoadSize,
        packingMaterial: copy,
      };
      const payload: IUpdatePackingMaterialPayload = {
        id: material._id,
        data,
      };
      dispatch(updatePackingMaterialListRequest(payload));
    }
  };

  const _onAdd = (items: IPackingItem[]) => {
    setOpenAddModal(false);
    const material: IPackingMaterial =
      _getPackingMaterialList() as IPackingMaterial;
    if (!_.isNull(material)) {
      const data: IUpdatePackingMaterialRequest = {
        enquiryId: enquiryId as string,
        vehicleLoadSize: material.vehicleLoadSize,
        packingMaterial: items,
      };
      const payload: IUpdatePackingMaterialPayload = {
        id: material._id,
        data,
      };
      dispatch(updatePackingMaterialListRequest(payload));
    }
  };

  useEffect(() => {
    if (
      !updatePackingMaterialRequesting &&
      (updatePackingMaterialSuccess || updatePackingMaterialFailure)
    ) {
      dispatch(resetUpdatePackingMaterialListRequest());
      const payload: IGetPackingMaterialsRequest = {
        enquiryId: enquiryId,
      };
      dispatch(getPackingMaterialsRequest(payload));
    }
  }, [
    updatePackingMaterialRequesting,
    updatePackingMaterialSuccess,
    updatePackingMaterialFailure,
  ]);

  const _getPackingMaterials = () => {
    let materials: IMaterial[] = [];
    if (data && Array.isArray(data) && data.length > 0) {
      const item: IPackingMaterial = data[0];
      materials = item.packingMaterial;
    }

    return materials;
  };
  const _getPackingMaterialsVehicleize = () => {
    let vehicleLoadSizeData: string = '';
    if (data && Array.isArray(data) && data.length > 0) {
      const item: IPackingMaterial = data[0];
      vehicleLoadSizeData = item.vehicleLoadSize;
    }
  console.log(vehicleLoadSizeData,"vehicleLoadSizeData");
  
    return vehicleLoadSizeData;
  };

  const _getPackingMaterialList = () => {
    let materialList: IPackingMaterial | null = null;
    if (data && Array.isArray(data) && data.length > 0) {
      materialList = data[0];
    }
    return materialList;
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
        <Text style={styles.text}>Packing Materials List is Empty.</Text>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            setOpenAddModal(true);
          }}>
          <Text style={styles.buttonText}>Add Materials</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const _handleRefresh = () => {
    const payload: IGetPackingMaterialsRequest = {
      enquiryId: enquiryId,
    };
    dispatch(getPackingMaterialsRequest(payload));
  };

  if (getPackingMaterialsRequesting) {
    return (
      <View style={styles.emptyContainer}>
        <Spinner show={getPackingMaterialsRequesting} />
      </View>
    );
  }

  return (
    <>
      <View style={styles.itemContainer}>
        <View style={styles.itemContentContainer}>
          <View style={styles.item}>
            <Text style={styles.label}>{`Vehicle Load Size: `}</Text>
            <Text style={styles.text}>{`ggg`}</Text>
          </View>
        </View>
        <View style={styles.itemActionContainer}>
          <TouchableOpacity onPress={() => setOpenVehicleSizeModal(true)}>
            <EditIcon width={24} height={24} />
          </TouchableOpacity>
          <Spacer height={10} />
        </View>
      </View>
      <View style={styles.container}>
        <Spacer height={10} />
        <FlatList
          data={_getPackingMaterials()}
          renderItem={({item, index}) => renderItem(item, index)}
          refreshControl={
            <RefreshControl
              refreshing={getPackingMaterialsRequesting}
              onRefresh={_handleRefresh}
            />
          }
          ListEmptyComponent={_renderEmptyView()}
          // ListFooterComponent={() => {
          //   return (
          //     <>
          //     {_getPackingMaterials().length > 0 ? <TouchableOpacity
          //       style={styles.buttonContainer}
          //       onPress={() => {
          //         setOpenAddModal(true);
          //       }}>
          //       <Text style={styles.buttonText}>Add MORE ITEMS</Text>
          //     </TouchableOpacity> : null}
          //     </>
          //   );
          // }}
        />
        <MaterialListUpdateModal
          item={packingMaterial}
          visible={openModal}
          index={itemIndex}
          onClose={_handleModalClose}
          onUpdate={_onUpdate}
        />

        <MaterialListUpdateVehicleSizeModal
          item={packingMaterial}
          visible={openVehicleSizeModal}
          index={itemIndex}
          onClose={_handleModalClose}
          onUpdate={_onUpdate}
        />
        <MaterialListAddModal
          visible={openAddModal}
          onClose={_handleAddModalClose}
          onAdd={_onAdd}
        />
        <Spinner show={updatePackingMaterialRequesting} />
      </View>
    </>
  );
};

export default PackingMaterialListView;
