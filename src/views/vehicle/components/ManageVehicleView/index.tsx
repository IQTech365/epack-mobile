import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
} from 'react-native';
import Spacer from '../../../../common/Spacer';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import styles from './style';
import ListViewIcon from '../../../../images/icons/list_view_icon.svg';
import ListViewIcon2 from '../../../../images/icons/list_view_icon2.svg';
import CreateIcon from '../../../../images/icons/create_icon.svg';
import CreateIcon2 from '../../../../images/icons/create_icon2.svg';
// import Spinner from '../../../../../common/Spinner';
import AddLorryView from './AddVehicleFormView';
import Header from '../../../../common/Header';
import {getLorryRequest} from '../../../../redux/slices/VehicleSlice';
import VehicleListItem from './AddVehicleListView/components/VehicleListItem';
import Spinner from '../../../../common/Spinner';
import {AddLorryFormContextProvider} from '../../../../provider/AddLorryFormContextProvider';
import {COLOR_WHITE} from '../../../../utils/colors';
import { IVehicle } from '../../../../interface/vehicle/IGetLorryResponse';
import { NavigationProp } from '@react-navigation/native';
import { getCurrentCompanyId } from '../../../../utils/storage';

interface IAddLorryDetailViewProps {
  navigation: NavigationProp<any, any>;
}

const ManageVehicleView: React.FC<IAddLorryDetailViewProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {lorryData, getLorryRequesting} = useAppSelector(
    state => state.Vehicle,
  );

  const [showAddLorryDetailList, setShowAddLorryDetailList] =
    useState<boolean>(false);
  const [createNewAddLorryDetail, setCreateNewAddLorryDetail] =
    useState<boolean>(true);
  const {data: lorryArray = []} = lorryData || {};

  const handleCreateNewAddLorryDetail = () => {
    setShowAddLorryDetailList(false);
    setCreateNewAddLorryDetail(true);
  };

  const handleShowAddLorryDetailList = () => {
    setShowAddLorryDetailList(true);
    setCreateNewAddLorryDetail(false);
  };

  const _getLorryRequest = () => {
    getCurrentCompanyId().then(id => {
      dispatch(getLorryRequest(id as string));
    }).catch(err => console.log(err));
  }

  useEffect(() => {
    _getLorryRequest();
  }, []);

  const showEmptyView = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.text}>No Vehicle List Found!</Text>
      </View>
    );
  };

  const handleOnRefresh = useCallback(() => {
    _getLorryRequest();
  }, []);

  const goToVehicleDetails = (index: number) => {
    const vehicle:IVehicle = lorryArray[index];
    navigation.navigate("VehicleDetails", {item: vehicle});
  }

  const handleSuccess = () => {
    setCreateNewAddLorryDetail(false);
    setShowAddLorryDetailList(true);
    
  }

  const showForm = () => {
    if (createNewAddLorryDetail) {
      return (
        <AddLorryFormContextProvider>
          <AddLorryView onSuccess={handleSuccess} />
        </AddLorryFormContextProvider>
      );
    }
    return null;
  };

  const showList = () => {
    if (showAddLorryDetailList) {
      return (
        <FlatList
          contentContainerStyle={{alignItems: 'center'}}
          data={lorryArray}
          refreshControl={
            <RefreshControl
              refreshing={getLorryRequesting}
              onRefresh={handleOnRefresh}
            />
          }
          renderItem={({item, index}) => (
            <View style={{padding: 10}}>
              <VehicleListItem item={item} index={index} onPress={goToVehicleDetails} />
            </View>
          )}
          ListEmptyComponent={showEmptyView()}
        />
      );
    }
    return null;
  };

  return (
    <View style={{flex: 1, backgroundColor: COLOR_WHITE}}>
      <Header label="Manage Vehicle" canGoBack={true} />
      <Spacer height={8} />
      <View style={styles.container}>
        <TouchableOpacity
          onPress={handleShowAddLorryDetailList}
          activeOpacity={0.4}>
          {showAddLorryDetailList ? (
            <ListViewIcon2 width={30} height={30} />
          ) : (
            <ListViewIcon width={30} height={30} />
          )}
        </TouchableOpacity>
        <Spacer width={10} />
        <TouchableOpacity
          onPress={handleCreateNewAddLorryDetail}
          activeOpacity={0.4}>
          {createNewAddLorryDetail ? (
            <CreateIcon2 width={30} height={30} />
          ) : (
            <CreateIcon width={30} height={30} />
          )}
        </TouchableOpacity>
        <Spacer width={10} />
      </View>
      {showForm()}
      {showList()}
      <Spinner show={getLorryRequesting} />
    </View>
  );
};

export default ManageVehicleView;
