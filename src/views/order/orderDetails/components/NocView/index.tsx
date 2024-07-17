import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import styles from './style';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import {
  IGetPackingListRequest,
  IPackingListData,
} from '../../../../../interface/order/IPackingMaterialResponse';
import {
  getNocFormTemplateRequest,
  getNocFormTemplateSuccess,
  getPackingListTemplateRequest,
  getPackingMaterialsRequest,
  resetGetPackingListTemplateRequest,
  resetNocFormTemplateRequest,
} from '../../../../../redux/slices/OrderSlice';
import {getCurrentCompanyId} from '../../../../../utils/storage';
import Spinner from '../../../../../common/Spinner';
import {ToastType, showToast, startShare} from '../../../../../utils/utility';
import {IPackingListTemplatePayload} from '../../../../../interface/order/IPackingListTemplate';
import ModalHOC from '../../../../../common/ModalHOC';
import TemplateViewer from '../../../../../common/TemplateViewer';
import useTemplateIdHook from '../../../../../hooks/useTemplateIdHook';
import {
  IGetNocList,
  INocTemplatePayload,
} from '../../../../../interface/order/IGetNocListResponse';
import NocListItemView from '../NocListView';

interface Props {
  orderId: string;
  items: string[];
}

const NocView: React.FC<Props> = ({orderId}) => {
  const dispatch = useAppDispatch();
  const [showTemplate, setShowTemplate] = useState<boolean>(false);
  const [shouldShare, setShouldShare] = useState<boolean>(false);
  const templateId = useTemplateIdHook('667e3d2e8a4f37cd5090a7ff');
  const {getNocDoc, getNocFormTemplateRequesting,  getNocFormTemplateFailure,getNocFormTemplate,
    getNocFormTemplateSuccess,getNocDocRequesting
  } = useAppSelector(
    state => state.Order,
  );

  const _getNocDocData = () => {
    let items: IGetNocList[] = [];
    const {data} = getNocDoc || {};
    if (data && Array.isArray(data) && data.length > 0) {
      items = data;
    }
    return items;
  };

  const showEmptyView = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.text}>No Noc Info Found!</Text>
      </View>
    );
  };

  const _showNocDocTemplate = (nocId: string) => {
    setShouldShare(false);
    if (templateId) {
      getCurrentCompanyId()
        .then(id => {
          const payload: INocTemplatePayload = {
            companyId: id as string,
            nocId: nocId,
            templateId: templateId,
            orderId: orderId,
          };
          dispatch(getNocFormTemplateRequest(payload));
          setShowTemplate(true)
        })
        .catch(err => console.log('error getting company id from storage'));
    } else {
      showToast('Template Not Selected!', ToastType.ERROR);
    }
  };

  const _shareNocFormTemplate = (nocId: string) => {
    if (templateId) {
      setShouldShare(true);
      getCurrentCompanyId()
        .then(id => {
          const payload: INocTemplatePayload = {
            companyId: id as string,
            nocId: nocId,
            templateId: templateId,
            orderId: orderId,
          };
          console.log("payloadpayload",payload)
          dispatch(getNocFormTemplateRequest(payload));
        })
        .catch(err => console.log('error getting company id from storage'));
    } else {
      showToast('Template Not Selected!', ToastType.ERROR);
    }
  };

  const _hanldeCloseShowPreviewModal = () => {
    dispatch(resetNocFormTemplateRequest());
    setShowTemplate(false);
    setShouldShare(false);
  };

    useEffect(() => {
      if(!getNocFormTemplateRequesting && getNocFormTemplateSuccess) {
        if(shouldShare) {
          startShare(
            getNocFormTemplate,
            'Noc Doc',
            dispatch(resetNocFormTemplateRequest()),
          );
        } else {
          setShowTemplate(true);
        }
      } else if(!getNocFormTemplateRequesting && getNocFormTemplateFailure) {
        setShowTemplate(false);
        dispatch(resetNocFormTemplateRequest());
      }
    }, [getNocFormTemplateRequesting, getNocFormTemplateSuccess, getNocFormTemplateFailure]);

  return (
    <View>
      <FlatList
        data={_getNocDocData()}
        renderItem={({item, index}) => (
          <NocListItemView
            item={item}
            index={index}
            onShowPreview={_showNocDocTemplate}
            onShare={_shareNocFormTemplate}
            orderId={orderId}    
            />
        )}
        ListEmptyComponent={showEmptyView()}
      />
      <Spinner
        show={getNocDocRequesting || getNocFormTemplateRequesting}
      />
      <ModalHOC
        visible={showTemplate}
        onClose={_hanldeCloseShowPreviewModal}
        modalStyle={styles.modalStyle}
        headerStyle={styles.headerStyle}
        title="Preview">
        <View style={{flex: 1}}>
          <TemplateViewer html={getNocFormTemplate} />
        </View>
      </ModalHOC>
    </View>
  );
};

export default NocView;
