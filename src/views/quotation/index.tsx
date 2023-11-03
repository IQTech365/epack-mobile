import {NavigationProp} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  RefreshControl,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import AddNew from '../../common/AddNew';
import Header from '../../common/Header';
import Spacer from '../../common/Spacer';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {getQuotationsRequest} from '../../redux/slices/QuotationSlice';
import {QuotationStackRoute} from '../../utils/constants';
import QuotationListItem, {
  IQuotationItem,
} from './quotationList/components/QuotationListItem';
import styles from './style';
import BottomSheet from '@gorhom/bottom-sheet';
import FormModal from '../settings/formModal';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {COLOR_BLACK, COLOR_BLUE} from '../../utils/colors';
interface IQuotationPageViewProps {
  navigation: NavigationProp<any, any>;
}

const downloadOptions = ['With Sign. & Stamp', 'Without Sign. & Stamp'];

const QuotationPageView: React.FC<IQuotationPageViewProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {
    quotations,
    getQuotationsRequesting,
    getQuotationsSuccess,
    getQuotationsFailure,
  } = useAppSelector(state => state.Quotation);
  const {addCompanyInfo, companies} = useAppSelector(state => state.Company);
  const {verifiedData} = useAppSelector(state => state.OTP);
  const [downloadOption, setDownloadOption] = useState<string>('');
  const bottomSheetRef = useRef<BottomSheet>(null);
  console.log('quotations----', JSON.stringify(quotations));

  const tempItem: IQuotationItem = {
    quotationNo: '#9877654',
    clientName: 'Ms. Vanshika',
    fromDestination: 'Delhi',
    toDestination: 'Gurgaon',
    shiftingType: 'Home',
    quotationAmount: '12000.00',
    quotationDate: '14-07-2023',
    phoneNumber: '9898989898',
  };

  const presentModal = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };

  const dismissModal = () => {
    setDownloadOption('');
    bottomSheetRef.current?.close();
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

  const getAuthId = () => {
    const {data} = verifiedData || {};
    return data?.id;
  };

  const handleAddNew = () => {
    navigation.navigate(QuotationStackRoute.AddQuotation);
  };

  const handleOnRefresh = useCallback(() => {
    const urlParams = `${getAuthId()}/${getCompanyId()}`;
    dispatch(getQuotationsRequest(urlParams));
  }, []);

  useEffect(() => {
    const urlParams = `${getAuthId()}/${getCompanyId()}`;
    dispatch(getQuotationsRequest(urlParams));
  }, []);

  const downloadButtonStyle =
    downloadOption == ''
      ? styles.downloadDisabledButton
      : styles.downloadButton;

  return (
    <View style={styles.container}>
      <Header
        label="Quotation Management"
        canGoBack={true}
        showDrawerIcon={true}
      />
      <Spacer height={4} />
      <AddNew
        countLabel="Total Quotations"
        count="200"
        onPress={handleAddNew}
      />
      <Spacer height={12} />
      <FlatList
        contentContainerStyle={styles.listContent}
        data={[tempItem, tempItem, tempItem]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={getQuotationsRequesting}
            onRefresh={handleOnRefresh}
          />
        }
        renderItem={({item, index}) => (
          <QuotationListItem
            item={item}
            index={1}
            onPress={() => {}}
            onDownload={presentModal}
          />
        )}
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
                    // setWithSignAndStamp(isChecked);
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
};

export default QuotationPageView;
