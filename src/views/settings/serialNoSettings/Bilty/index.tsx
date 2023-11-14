import React, {useRef, useState, useEffect, useCallback} from 'react';
import {View, Text, TouchableOpacity, FlatList, RefreshControl} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import styles from './style';
import SerilaNoSettingFormView from '../SerialNoSettingFormView';
import ListViewIcon from '../../../../images/icons/list_view_icon.svg';
import ListViewIcon2 from '../../../../images/icons/list_view_icon2.svg';
import CreateIcon from '../../../../images/icons/create_icon.svg';
import CreateIcon2 from '../../../../images/icons/create_icon2.svg';
import Spacer from '../../../../common/Spacer';
import BiltyListItem from '../BiltyListItem';
import FormModal from '../../formModal';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { COLOR_BLACK, COLOR_BLUE } from '../../../../utils/colors';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { getSerialNoRequest } from '../../../../redux/slices/SerialNoSettingSlice';

interface IBiltySNProps {
  moduleId: string;
  moduleName: string;
}

const BiltySN: React.FC<IBiltySNProps> = ({moduleId, moduleName}) => {
  const {getSerialNumberRequesting, paymentMethods} = useAppSelector(state => state.SNSetting);
  const {addCompanyInfo, companies} = useAppSelector(state => state.Company);
  const [showMoneyReceiptList, setShowMoneyReceiptList] = useState<boolean>(false);
  const [createNewBiltyMoneyReceipt, setCreateNewMoneyReceipt] = useState<boolean>(true);
  const [downloadOption, setDownloadOption] = useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [showList, setShowList] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(true);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const downloadOptions = ['With Sign. & Stamp', 'Without Sign. & Stamp'];
  const {data: PaymentMethodsData = []} = paymentMethods || {};
  const dispatch = useAppDispatch();

  const showEmptyView = () => {
    return (
      <View style={styles.emptyContainer2}>
        <Text>No Bilty Serial No.# Found!</Text>
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
      return <SerilaNoSettingFormView  moduleId={moduleId} moduleName={moduleName} />;
    }
    return null;
  };

  const downloadButtonStyle =
  downloadOption == ''
    ? styles.downloadDisabledButton
    : styles.downloadButton;

  const presentModal = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };

  const dismissModal = () => {
    setDownloadOption('');
    bottomSheetRef.current?.close();
  };

  const handleEditClick = (index: number) => {
    // const item: any = MoneyReceiptData[index];
    
    setCreateNewMoneyReceipt(true);
    setShowMoneyReceiptList(false);
    // setEditData(item);
    setIsEdit(true);
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
        <><FlatList
          data={PaymentMethodsData}
          refreshControl={
            <RefreshControl
              refreshing={getSerialNumberRequesting}
              onRefresh={handleOnRefresh}
            />
          }
          renderItem={({ item, index }) => 
          item.moduleName == 'BILTY'?
          <BiltyListItem item={item} index={1}
            onPress={() => { } }
            onShare={() => { } }
            onDownload={presentModal}
            onPreview={() => { } }
            onEdit={() => handleEditClick(index)} />:null}
          ListEmptyComponent={showEmptyView()} />
          <FormModal ref={bottomSheetRef} onClose={dismissModal}>
            <>
              <View style={styles.checkboxContainer}>
                {downloadOptions.slice(0, 3).map((option, index) => {
                  return (
                    <BouncyCheckbox
                      key={`${index}`}
                      size={20}
                      fillColor={COLOR_BLUE}
                      unfillColor="#FFFFFF"
                      text={option}
                      iconStyle={{ borderColor: 'red', borderRadius: 0 }}
                      innerIconStyle={{ borderWidth: 1, borderRadius: 0 }}
                      onPress={(isChecked: boolean) => {
                        setDownloadOption(option);
                      } }
                      textStyle={{
                        fontFamily: 'JosefinSans-Regular',
                        textDecorationLine: 'none',
                        fontSize: 14,
                        color: COLOR_BLACK,
                      }}
                      style={{ paddingRight: 8, marginBottom: 20 }}
                      textContainerStyle={{ marginLeft: 10, marginRight: 4 }}
                      isChecked={option == downloadOption}
                      disableBuiltInState={true} />
                  );
                })}
              </View>
              <TouchableOpacity
                style={downloadButtonStyle}
                activeOpacity={0.6}
                disabled={downloadOption == ''}>
                <Text style={styles.downloadText}>Download</Text>
              </TouchableOpacity>
            </>
          </FormModal></>
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

export default BiltySN;
