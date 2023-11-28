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
import {
  EnquiryStackRoute,
  QuotationStackRoute,
  TabRoute,
} from '../../utils/constants';
import QuotationListItem, {
  IQuotationItem,
} from './quotationList/components/QuotationListItem';
import styles from './style';
import BottomSheet from '@gorhom/bottom-sheet';
import FormModal from '../settings/formModal';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {COLOR_BLACK, COLOR_BLUE} from '../../utils/colors';
import {IGetQuotationRequest} from '../../interface/quotation/IGetQuotationRequest';
import {
  IGetQuotationData,
} from '../../interface/quotation/IGetQuotationsResponse';
import {IGetEnquiriesData} from '../../interface/enquiry/IGetEnquiriesResponse';
import useCompanyId from '../../hooks/useCompanyId';
interface IQuotationPageViewProps {
  navigation: NavigationProp<any, any>;
}

const downloadOptions = ['With Sign. & Stamp', 'Without Sign. & Stamp'];

const QuotationPageView: React.FC<IQuotationPageViewProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {quotations = [], getQuotationsRequesting} = useAppSelector(
    state => state.Quotation,
  );
  const [downloadOption, setDownloadOption] = useState<string>('');
  const bottomSheetRef = useRef<BottomSheet>(null);
  console.log('quotations----', JSON.stringify(quotations));
  const {data: quotationData} = quotations || {};
  const companyId = useCompanyId();

  const getTotalQuotations = () => {
    let _count = 0;
    if (
      quotationData &&
      Array.isArray(quotationData) &&
      quotationData.length > 0
    ) {
      _count = quotationData.length;
    }
    return _count;
  };

  const transformQuotationData = () => {
    let _data: IQuotationItem[] = [];
    if (
      quotationData &&
      Array.isArray(quotationData) &&
      quotationData.length > 0
    ) {
      _data = quotationData.map((quotation: IGetQuotationData) => {
        const {quotationNumber, enquiries, quotationData, quotationAmount} = quotation;
        const item: IQuotationItem = {
          quotationNo: quotationNumber,
          clientName: enquiries.length !== 0 ? enquiries[0].partyName : '',
          fromDestination: enquiries.length !== 0 ? enquiries[0].pickupAddress.city : '',
          toDestination: enquiries.length !== 0 ? enquiries[0].dropAddress.city : '',
          shiftingType: enquiries.length !== 0 ? enquiries[0].shiftingType : '',
          quotationAmount: quotationAmount,
          quotationDate: quotationData,
          phoneNumber: enquiries.length !== 0 ? enquiries[0].mobile : '',
        };
        return item;
      });
      return _data;
    }
    return _data;
  };

  const handleCardClick = (index: number) => {
    const item: IGetEnquiriesData = quotationData[index]?.enquiries[0];
    // navigation.navigate(TabRoute.EnquiryStack, {
    //   screen: EnquiryStackRoute.EnquiryDetails,
    //   params: {enquiryId: item._id, item: item},
    // });
    //@ts-ignore
    navigation.jumpTo(TabRoute.EnquiryStack, {screen: EnquiryStackRoute.EnquiryDetails, params: {enquiryId: item._id, item: item},});
  };

  const handleEditClick = (index: number) => {
    const item: IGetQuotationData = quotationData[index];
    navigation.navigate(QuotationStackRoute.AddQuotation, {item: item, isEdit: true});
  };

  const presentModal = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };

  const dismissModal = () => {
    setDownloadOption('');
    bottomSheetRef.current?.close();
  };

  const handleAddNew = () => {
    navigation.navigate(QuotationStackRoute.AddQuotation);
  };

  const handleOnRefresh = useCallback(() => {
    const payload: IGetQuotationRequest = {
      companyId: companyId,
    };
    dispatch(getQuotationsRequest(payload));
  }, []);

  useEffect(() => {
    const payload: IGetQuotationRequest = {
      //Note: we can also pass branchId, authId, or id to get the quotation info.
      companyId: companyId,
    };
    dispatch(getQuotationsRequest(payload));
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
        count={getTotalQuotations().toString()}
        onPress={handleAddNew}
      />
      <Spacer height={12} />
      <FlatList
        contentContainerStyle={styles.listContent}
        data={transformQuotationData()}
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
            index={index}
            onPress={() => handleCardClick(index)}
            onShare={() => {}}
            onDownload={presentModal}
            onPreview={() => {}}
            onEdit={() => handleEditClick(index)}
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
