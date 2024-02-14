import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  Text,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import styles from './styles';
import CarConditionFormView from '../CarConditionFormView';
import {
  getCarConditionHtmlRequest,
  getCarConditionListRequest,
  resetGetCarConditionHtmlRequest,
} from '../../../../../redux/slices/OrderSlice';
import Spinner from '../../../../../common/Spinner';
import {
  getVehicleAccessoriesRequest,
  getVehicleColorRequest,
  getVehicleCompanyRequest,
  getVehicleModelsRequest,
  getVehicleTypesRequest,
} from '../../../../../redux/slices/CommonSlice';
import {ICarCondition} from './ICarCondition';
import {ICardConditionData} from '../../../../../interface/order/IGetCarConditionListResponse';
import CarConditionListItem from './CarConditionListItem';
import ModalHOC from '../../../../../common/ModalHOC';
import TemplateViewer from '../../../../../common/TemplateViewer';
import {startShare} from '../../../../../utils/utility';
import {IHtmlTemplateRequest} from '../../../../../interface/order/templates/ITemplateResponse';
import useTemplateIdHook from '../../../../../hooks/useTemplateIdHook';
import ActionHeaderView from '../../../../../common/ActionHeaderView';

interface ICarConditionViewProps {
  orderId: string;
}

const CarConditionView: React.FC<ICarConditionViewProps> = ({orderId}) => {
  const dispatch = useAppDispatch();
  const {
    carConditionList,
    getCarConditionListRequesting,
    carConditionTemplateHtml,
    getCarConditionHtmlRequesting,
    getCarConditionHtmlSuccess,
    getCarConditionHtmlFailure,
  } = useAppSelector(state => state.Order);
  const {
    vehicleTypesRequesting,
    vehicleCompaniesRequesting,
    vehicleColorsRequesting,
    vehicleAccessoriesRequesting,
    vehicleModelsRequesting,
  } = useAppSelector(state => state.Common);
  const [showCarConditionList, setShowCarConditionList] =
    useState<boolean>(false);
  const [createNewCarCondition, setCreateNewCarCondition] =
    useState<boolean>(true);
  const loading =
    vehicleTypesRequesting ||
    vehicleCompaniesRequesting ||
    vehicleColorsRequesting ||
    vehicleAccessoriesRequesting ||
    vehicleModelsRequesting;

  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [showShare, setShowShare] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isEditData, setisEditData] = useState<any>(null);
  const templateId = useTemplateIdHook('658d3cab585e3dde644da977');

  const _getListData = () => {
    const {data} = carConditionList || {};
    let list: ICarCondition[] = [];
    if (data && Array.isArray(data) && data.length > 0) {
      list = data.map((d: ICardConditionData) => {
        const item: ICarCondition = {
          id: d._id,
          created_date: d.createdAt,
          vehicle_condition_no: d.carConditionNumber,
          car_condition_date: d.dateOfCarCondition,
          registration_no: d.vehicleRegistrationNumber,
          running_km: d.vehicleCoveredDistanceInKM,
          model: d.model,
        };
        return item;
      });
    }
    return list;
  };

  const handleCreateNewCarCondition = () => {
    setShowCarConditionList(false);
    setCreateNewCarCondition(true);
    setIsEdit(false);
  };

  const handleShowCarConditionList = () => {
    setShowCarConditionList(true);
    setCreateNewCarCondition(false);
    setIsEdit(false);
    
  };

  const onSuccess = () => {
    setShowCarConditionList(true);
    setCreateNewCarCondition(false);
    dispatch(getCarConditionListRequest(orderId));
  }

  const handleShowPreviewModalClose = () => {
    dispatch(resetGetCarConditionHtmlRequest());
    setShowPreview(false);
    setShowModal(false);
  };

  const onEdit = (item:ICarCondition) => {
    setCreateNewCarCondition(true)
    setShowCarConditionList(false);
    setisEditData(item);
    setIsEdit(true);
  };

  useEffect(() => {
    dispatch(getCarConditionListRequest(orderId));
    dispatch(getVehicleTypesRequest());
    dispatch(getVehicleCompanyRequest());
    dispatch(getVehicleColorRequest());
    dispatch(getVehicleAccessoriesRequest());
    dispatch(getVehicleModelsRequest());
  }, []);

  const showEmptyView = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.text}>No CarCondition Found!</Text>
      </View>
    );
  };

  const handleOnRefresh = useCallback(() => {
    dispatch(getCarConditionListRequest(orderId));
  }, []);

  const handleDocDownload = (docId: string) => {
    const payload: IHtmlTemplateRequest = {
      templateId: templateId,
      quotationId: docId,
    };
    dispatch(getCarConditionHtmlRequest(payload));
  };

  const showForm = () => {
    if (createNewCarCondition) {
      return <CarConditionFormView orderId={orderId} onSuccess={onSuccess} isEditData = {isEditData} isEdit = {isEdit}/>;
    }
    return null;
  };

  const showList = () => {
    if (showCarConditionList) {
      return (
        <View style={{flex: 1}}>
          <FlatList
            contentContainerStyle={{alignItems: 'center', paddingVertical: 10}}
            data={_getListData()}
            refreshControl={
              <RefreshControl
                refreshing={getCarConditionListRequesting}
                onRefresh={handleOnRefresh}
              />
            }
            renderItem={({item, index}) => (
              <CarConditionListItem
                item={item}
                index={index}
                onPress={() => {
                  // presentModal(item.id)
                }}
                onShare={() => {
                  setShowPreview(false);
                  setShowShare(true);
                  handleDocDownload(item.id);
                }}
                onDownload={() => {
                  //
                }}
                onPreview={() => {
                  setShowPreview(true);
                  setShowShare(false);
                  handleDocDownload(item.id);
                }}
                onEdit={() =>onEdit(item)}
              />
            )}
            ListEmptyComponent={showEmptyView()}
          />
          <ModalHOC
            visible={showModal}
            onClose={handleShowPreviewModalClose}
            modalStyle={styles.modalStyle}
            headerStyle={styles.headerStyle}
            title="Preview">
            <View style={{flex: 1}}>
              <TemplateViewer html={carConditionTemplateHtml} />
            </View>
          </ModalHOC>
        </View>
      );
    }
    return null;
  };

  useEffect(() => {
    if (!getCarConditionHtmlRequesting && getCarConditionHtmlSuccess) {
      if (showPreview) {
        setShowModal(true);
      } else if (showShare) {
        startShare(
          carConditionTemplateHtml,
          'VehicleCondition',
          dispatch(resetGetCarConditionHtmlRequest()),
        );
      }
    } else if (!getCarConditionHtmlRequesting && getCarConditionHtmlFailure) {
      setShowPreview(false);
      setShowShare(false);
      // setShowDownload(false);
      dispatch(resetGetCarConditionHtmlRequest());
    }
  }, [
    getCarConditionHtmlRequesting,
    getCarConditionHtmlSuccess,
    getCarConditionHtmlFailure,
  ]);

  return (
    <>
      <ActionHeaderView
        count={_getListData().length}
        onShow={handleShowCarConditionList}
        onCreate={handleCreateNewCarCondition}
        isEdit = {isEdit}
      />
      {showForm()}
      {showList()}
      <Spinner show={getCarConditionListRequesting || loading} />
    </>
  );
};

export default CarConditionView;
