import {NavigationProp} from '@react-navigation/native';
import React, {useCallback, useEffect} from 'react';
import {View, RefreshControl, FlatList} from 'react-native';
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

interface IQuotationPageViewProps {
  navigation: NavigationProp<any, any>;
}

const QuotationPageView: React.FC<IQuotationPageViewProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {
    quotations,
    getQuotationsRequesting,
    getQuotationsSuccess,
    getQuotationsFailure,
  } = useAppSelector(state => state.Quotation);
  const {addCompanyInfo, companies} = useAppSelector(state => state.Company);

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

  const handleAddNew = () => {
    navigation.navigate(QuotationStackRoute.AddQuotation);
  };

  const handleOnRefresh = useCallback(() => {
    dispatch(getQuotationsRequest(getCompanyId()));
  }, []);

  useEffect(() => {
    dispatch(getQuotationsRequest(getCompanyId()));
  }, []);

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
        data={[tempItem]}
        refreshControl={
          <RefreshControl
            refreshing={getQuotationsRequesting}
            onRefresh={handleOnRefresh}
          />
        }
        renderItem={({item, index}) => (
          <QuotationListItem item={item} index={1} onPress={() => {}} />
        )}
      />
    </View>
  );
};

export default QuotationPageView;
