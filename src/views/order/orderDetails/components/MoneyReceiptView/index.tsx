import React, {useCallback, useEffect, useState, useRef} from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import Spacer from '../../../../../common/Spacer';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import styles from './styles';
import ListViewIcon from '../../../../../images/icons/list_view_icon.svg';
import ListViewIcon2 from '../../../../../images/icons/list_view_icon2.svg';
import CreateIcon from '../../../../../images/icons/create_icon.svg';
import CreateIcon2 from '../../../../../images/icons/create_icon2.svg';
import MoneyReceiptFormView from '../MoneyReceiptFormView';
import { getMoneyReceiptListRequest } from '../../../../../redux/slices/OrderSlice';
import Spinner from '../../../../../common/Spinner';
import AddMoneyReceiptListItem from '../MoneyReceiptList';
import FormModal from '../../../../settings/formModal';
import { COLOR_BLACK, COLOR_BLUE } from '../../../../../utils/colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

interface IMoneyReceiptViewProps {
  orderId: string;
}

const MoneyReceiptView: React.FC<IMoneyReceiptViewProps> = ({navigation, orderId}) => {
  const dispatch = useAppDispatch();
  const {getMoneyReceiptListRequesting, moneyReceiptList} = useAppSelector(state => state.Order);
  const bottomSheetRef = useRef<BottomSheet>(null);
  console.log('MoneyReceiptList--', JSON.stringify(moneyReceiptList));
  const {data: MoneyReceiptData = []} = moneyReceiptList || {};
  const downloadOptions = ['With Sign. & Stamp', 'Without Sign. & Stamp'];

  const [showMoneyReceiptList, setShowMoneyReceiptList] = useState<boolean>(false);
  const [createNewBiltyMoneyReceipt, setCreateNewMoneyReceipt] = useState<boolean>(true);
  const [downloadOption, setDownloadOption] = useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editData, setEditData] = useState<any>([]);

  const handleCreateNewMoneyReceipt = () => {
    setShowMoneyReceiptList(false);
    setCreateNewMoneyReceipt(true);
    setIsEdit(false);
  };

  const handleShowMoneyReceipt = () => {
    setShowMoneyReceiptList(true);
    setCreateNewMoneyReceipt(false);
  };
  const presentModal = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };

  const dismissModal = () => {
    setDownloadOption('');
    bottomSheetRef.current?.close();
  };

  const handleEditClick = (index: number) => {
    const item: any = MoneyReceiptData[index];
    
    setCreateNewMoneyReceipt(true);
    setShowMoneyReceiptList(false);
    setEditData(item);
    setIsEdit(true);
  };


  useEffect(() => {
    dispatch(getMoneyReceiptListRequest(orderId));
  }, []);

  const showEmptyView = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text>No MoneyReceipt Found!</Text>
      </View>
    );
  };

  const handleOnRefresh = useCallback(() => {
    dispatch(getMoneyReceiptListRequest(orderId));
  }, []);

  const showForm = () => {
    if (createNewBiltyMoneyReceipt) {
      return <MoneyReceiptFormView orderId={orderId}  editData = {editData} isEdit = {isEdit}/>;
    }
    return null;
  };

  const downloadButtonStyle =
  downloadOption == ''
    ? styles.downloadDisabledButton
    : styles.downloadButton;

  const showList = () => {
    if (showMoneyReceiptList) {
      return (
        <View  style={{flex: 1}}>
        <FlatList
          contentContainerStyle={{alignItems: 'center', paddingVertical: 10, paddingHorizontal: 5,}}
          data={MoneyReceiptData}
          refreshControl={
            <RefreshControl refreshing={getMoneyReceiptListRequesting} onRefresh={handleOnRefresh} />
          }
            renderItem={({item, index}) => (
              <AddMoneyReceiptListItem item={item} index={1} 
              onPress={() => {}}
              onShare={() => {}}
              onDownload={presentModal}
              onPreview={() => {}}
              onEdit={() => handleEditClick(index)}
              />
            )}
          ListEmptyComponent={showEmptyView()}
        />
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
                  iconStyle={{borderColor: 'red', borderRadius: 0}}
                  innerIconStyle={{borderWidth: 1, borderRadius: 0}}
                  onPress={(isChecked: boolean) => {
                    setDownloadOption(option);
                  }}
                  textStyle={{
                    fontFamily: 'JosefinSans-Regular',
                    textDecorationLine: 'none',
                    fontSize: 14,
                    color: COLOR_BLACK,
                  }}
                  style={{paddingRight: 8, marginBottom: 20}}
                  textContainerStyle={{marginLeft: 10, marginRight: 4}}
                  isChecked={option == downloadOption}
                  disableBuiltInState={true}
                />
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
      </FormModal>
      </View>
      );
    }
    return null;
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleShowMoneyReceipt} activeOpacity={0.4}>
          {showMoneyReceiptList ? (
            <ListViewIcon2 width={30} height={30} />
          ) : (
            <ListViewIcon width={30} height={30} />
          )}
        </TouchableOpacity>
        <Spacer width={10} />
        <TouchableOpacity onPress={handleCreateNewMoneyReceipt} activeOpacity={0.4}>
          {createNewBiltyMoneyReceipt ? (
            <CreateIcon2 width={30} height={30} />
          ) : (
            <CreateIcon width={30} height={30} />
          )}
        </TouchableOpacity>
        <Spacer width={10} />
      </View>
      {showForm()}
      {showList()}
      <Spinner show={getMoneyReceiptListRequesting} />
    </>
  );
};

export default MoneyReceiptView;
