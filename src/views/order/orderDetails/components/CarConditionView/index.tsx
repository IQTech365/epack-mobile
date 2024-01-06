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
import styles from './styles';
import ListViewIcon from '../../../../../images/icons/list_view_icon.svg';
import ListViewIcon2 from '../../../../../images/icons/list_view_icon2.svg';
import CreateIcon from '../../../../../images/icons/create_icon.svg';
import CreateIcon2 from '../../../../../images/icons/create_icon2.svg';
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
import { IHtmlTemplateRequest } from '../../../../../interface/order/templates/ITemplateResponse';

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

  const _getListData = () => {
    const {data} = carConditionList || {};
    let list: ICarCondition[] = [];
    if (data && Array.isArray(data) && data.length > 0) {
      list = data.map((d: ICardConditionData) => {
        const item: ICarCondition = {
          id:d._id,
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
  };

  const handleShowCarConditionList = () => {
    setShowCarConditionList(true);
    setCreateNewCarCondition(false);
  };

  const handleShowPreviewModalClose = () => {
    dispatch(resetGetCarConditionHtmlRequest());
    setShowPreview(false);
  };

  const onEdit = () => {};

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

  const handleDocDownload = (docId:string) => {
    const payload: IHtmlTemplateRequest = {
      templateId: '657d77534a69ca45d2255096',
      docId: docId,
    };
    dispatch(getCarConditionHtmlRequest(payload));
  }

  const showForm = () => {
    if (createNewCarCondition) {
      return <CarConditionFormView orderId={orderId} />;
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
                onEdit={onEdit}
              />
            )}
            ListEmptyComponent={showEmptyView()}
          />
          <ModalHOC
            visible={showModal}
            onClose={handleShowPreviewModalClose}
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
      <View style={styles.container}>
        <TouchableOpacity
          onPress={handleShowCarConditionList}
          activeOpacity={0.4}>
          {showCarConditionList ? (
            <ListViewIcon2 width={30} height={30} />
          ) : (
            <ListViewIcon width={30} height={30} />
          )}
        </TouchableOpacity>
        <Spacer width={10} />
        <TouchableOpacity
          onPress={handleCreateNewCarCondition}
          activeOpacity={0.4}>
          {createNewCarCondition ? (
            <CreateIcon2 width={30} height={30} />
          ) : (
            <CreateIcon width={30} height={30} />
          )}
        </TouchableOpacity>
        <Spacer width={10} />
      </View>
      {showForm()}
      {showList()}
      <Spinner show={getCarConditionListRequesting || loading} />
    </>
  );
};

export default CarConditionView;
