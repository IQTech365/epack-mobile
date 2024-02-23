import React, { useEffect, useState } from 'react';
import {View, Text, FlatList} from 'react-native';
import styles from './style';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import {IGetPackingListRequest, IPackingListData} from '../../../../../interface/order/IPackingMaterialResponse';
import { getPackingListTemplateRequest, getPackingMaterialsRequest, resetGetPackingListTemplateRequest } from '../../../../../redux/slices/OrderSlice';
import { getCurrentCompanyId } from '../../../../../utils/storage';
import Spinner from '../../../../../common/Spinner';
import PackingListItem from './PackingListItem';
import { ToastType, showToast, startShare } from '../../../../../utils/utility';
import { IPackingListTemplatePayload } from '../../../../../interface/order/IPackingListTemplate';
import ModalHOC from '../../../../../common/ModalHOC';
import TemplateViewer from '../../../../../common/TemplateViewer';

interface Props {
  orderId: string;
}

const PackingListView: React.FC<Props> = ({orderId}) => {
  const dispatch = useAppDispatch();
  const [showTemplate, setShowTemplate] = useState<boolean>(false);
  const [shouldShare, setShouldShare] = useState<boolean>(false);
  // const templateId = useTemplateIdHook('65d48f14ad0f8972472d49ca');
  const templateId = "65d724058f60045a67469a80";
  const {
    getPackingMaterialsRequesting,
    packingMaterials,
    packingListTemplateRequesting,
    packingListTemplateSuccess,
    packingListTemplateFailure,
    packingListTemplate,
  } = useAppSelector(state => state.Order);

  const _getPackingMaterils = () => {
    let items: IPackingListData[] = [];
    const {data} = packingMaterials || {};
    if (data && Array.isArray(data) && data.length > 0) {
      items = data;
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
        // companyId: id as string,
        enquiryId: orderId
    }
      dispatch(getPackingMaterialsRequest(payload));
    }).catch(err => console.log(err));
  }

  const _showPackingListItemTemplate = (packingListId:string) => {
    setShouldShare(false);
    if(templateId) {
      getCurrentCompanyId().then(id => {
        const payload:IPackingListTemplatePayload = {
          companyId: id as string,
          packingListId: packingListId,
          templateId: templateId,
          orderId: orderId,
        }
        dispatch(getPackingListTemplateRequest(payload));
      }).catch(err => console.log('error getting company id from storage'));
    } else {
      showToast("Template Not Selected!", ToastType.ERROR);
    }
  }

  const _sharePackingList = (packingListId:string) => {
    if(templateId) {
      setShouldShare(true);
      getCurrentCompanyId().then(id => {
        const payload:IPackingListTemplatePayload = {
          companyId: id as string,
          packingListId: packingListId,
          templateId: templateId,
          orderId: orderId,
        }
        dispatch(getPackingListTemplateRequest(payload));
      }).catch(err => console.log('error getting company id from storage'));
    } else {
      showToast("Template Not Selected!", ToastType.ERROR);
    }
  }

  const _hanldeCloseShowPreviewModal = () => {
    dispatch(resetGetPackingListTemplateRequest());
    setShowTemplate(false);
    setShouldShare(false);
  }

  useEffect(() => {
    _getPackingMaterialsRequest();
  }, []);

  useEffect(() => {
    if(!packingListTemplateRequesting && packingListTemplateSuccess) {
      if(shouldShare) {
        startShare(
          packingListTemplate,
          'Packing List',
          dispatch(resetGetPackingListTemplateRequest()),
        );
      } else {
        setShowTemplate(true);
      }
    } else if(!packingListTemplateRequesting && packingListTemplateFailure) {
      setShowTemplate(false);
      dispatch(resetGetPackingListTemplateRequest());
    }
  }, [packingListTemplateRequesting, packingListTemplateSuccess, packingListTemplateFailure]);

  return (
    <View>
      <FlatList
        data={_getPackingMaterils()}
        renderItem={({item, index}) => (
          <PackingListItem
            item={item}
            index={index}
            onShowPreview={_showPackingListItemTemplate}
            onShare={_sharePackingList}
            orderId={orderId}
          />
        )}
        ListEmptyComponent={showEmptyView()}
      />
      <Spinner
        show={getPackingMaterialsRequesting || packingListTemplateRequesting}
      />
      <ModalHOC
        visible={showTemplate}
        onClose={_hanldeCloseShowPreviewModal}
        modalStyle={styles.modalStyle}
        headerStyle={styles.headerStyle}
        title="Preview">
        <View style={{flex: 1}}>
          <TemplateViewer html={packingListTemplate} />
        </View>
      </ModalHOC>
    </View>
  );
};

export default PackingListView;
