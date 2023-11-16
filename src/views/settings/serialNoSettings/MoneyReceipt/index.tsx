import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList, RefreshControl} from 'react-native';
import styles from './style';
import SerilaNoSettingFormView from '../SerialNoSettingFormView';
import ListViewIcon from '../../../../images/icons/list_view_icon.svg';
import ListViewIcon2 from '../../../../images/icons/list_view_icon2.svg';
import CreateIcon from '../../../../images/icons/create_icon.svg';
import CreateIcon2 from '../../../../images/icons/create_icon2.svg';
import Spacer from '../../../../common/Spacer';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { getSerialNoRequest } from '../../../../redux/slices/SerialNoSettingSlice';
import SerialNoListItem from '../SerialNoSettingListItem';

interface IMoneyReceiptSNProps {
  moduleId: string;
  moduleName: string;
}

const MoneyReceiptSN: React.FC<IMoneyReceiptSNProps> = ({moduleId, moduleName}) => {
  const {getSerialNumberRequesting, paymentMethods} = useAppSelector(state => state.SNSetting);
  const [showList, setShowList] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(true);
  const {addCompanyInfo, companies} = useAppSelector(state => state.Company);
  const {data: PaymentMethodsData = []} = paymentMethods || {};
  const dispatch = useAppDispatch();

  const showEmptyView = () => {
    return (
      <View style={styles.emptyContainer2}>
        <Text>No Receipts Serial No.# Found!</Text>
      </View>
    );
  };

  const handleShowForm = () => {
    setShowList(false);
    setShowForm(true);
  };

  const handleShowList = () => {
    setShowList(true);
    setShowForm(false);
  };

  const showFormView = () => {
    if (showForm) {
      return <SerilaNoSettingFormView  moduleId={moduleId} moduleName={moduleName}/>;
    }
    return null;
  };

  const getCompanyId = () => {
    let id;
    const {data} = addCompanyInfo || {};
    const {data: companiesData} = companies || {};
    if (data && Object.keys(data).length > 0) {
      id = data._id;
    } else if (
      companiesData &&
      Array.isArray(companiesData) &&
      companiesData.length > 0
    ) {
      const firstCompany = companiesData[0];
      id = firstCompany._id;
    }
    return id;
  };

  const handleOnRefresh = useCallback(() => {
    dispatch(getSerialNoRequest(getCompanyId()));
  }, []);

  useEffect(() => {
    dispatch(getSerialNoRequest(getCompanyId()));
  }, []);

  const showListView = () => {
    if (showList) {
      return (
        <FlatList
          data={PaymentMethodsData}
          refreshControl={
            <RefreshControl
              refreshing={getSerialNumberRequesting}
              onRefresh={handleOnRefresh}
            />
          }
          renderItem={({item, index}) => 
          item.moduleName == 'MONEY RECEIPT'?
          <SerialNoListItem item={item} index={1}
            onPress={() => { } }
            onShare={() => { } }
            onDownload={()=> {}}
            onPreview={() => { } }
            onEdit={() => {}} />:null
        }
          ListEmptyComponent={showEmptyView()}
        />
      );
    }
    return null;
  };

  return <View style={styles.container}>
      <View style={styles.container2}>
        <TouchableOpacity onPress={handleShowList} activeOpacity={0.4}>
          {showList ? (
            <ListViewIcon2 width={30} height={30} />
          ) : (
            <ListViewIcon width={30} height={30} />
          )}
        </TouchableOpacity>
        <Spacer width={10} />
        <TouchableOpacity onPress={handleShowForm} activeOpacity={0.4}>
          {showForm ? (
            <CreateIcon2 width={30} height={30} />
          ) : (
            <CreateIcon width={30} height={30} />
          )}
        </TouchableOpacity>
        <Spacer width={10} />
      </View>
      {showFormView()}
      {showListView()}
  </View>;
};

export default MoneyReceiptSN;
