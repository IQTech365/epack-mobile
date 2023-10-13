import React, {useCallback, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, RefreshControl} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import AddQuotationView from '../../../../quotation/addQuotation';
import QuotationListItem, {
  IQuotationItem,
} from '../../../../quotation/quotationList/components/QuotationListItem';
import styles from './style';
import ListViewIcon from '../../../../../images/icons/list_view_icon.svg';
import ListViewIcon2 from '../../../../../images/icons/list_view_icon2.svg';
import CreateIcon from '../../../../../images/icons/create_icon.svg';
import CreateIcon2 from '../../../../../images/icons/create_icon2.svg';
import Spacer from '../../../../../common/Spacer';
import { getQuotationsRequest } from '../../../../../redux/slices/QuotationSlice';

interface IQuotationViewProps {
    enquiryId: string;
}

const QuotationView: React.FC<IQuotationViewProps> = ({enquiryId}) => {
  const {
    quotations,
    getQuotationsRequesting,
    getQuotationsSuccess,
    getQuotationsFailure,
  } = useAppSelector(state => state.Quotation);
  const dispatch = useAppDispatch();

  const [showQuotationList, setShowQuotationList] = useState<boolean>(false);
  const [createNewQuotation, setCreateNewQuotation] = useState<boolean>(true);

  // Temp Data
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

  const handleCreateNewQuotation = () => {
    setShowQuotationList(false);
    setCreateNewQuotation(true);
  };

  const handleShowQuotationList = () => {
    setShowQuotationList(true);
    setCreateNewQuotation(false);
  }

  const handleOnRefresh = useCallback(() => {
    dispatch(getQuotationsRequest(enquiryId));
  }, []);

  const showEmptyView = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text>No Quotations Found!</Text>
      </View>
    );
  };

  const showForm = () => {
    if (createNewQuotation) {
      return <AddQuotationView showHeader={false} />;
    }
    return null;
  };

  const showList = () => {
    if (showQuotationList) {
      return (
        <FlatList
        contentContainerStyle={{alignItems: 'center', paddingVertical: 10}}
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
          ListEmptyComponent={showEmptyView()}
        />
      );
    }
    return null;
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleShowQuotationList} activeOpacity={0.4}>
          {showQuotationList ? <ListViewIcon2 width={30} height={30} /> : <ListViewIcon width={30} height={30} />}
        </TouchableOpacity>
        <Spacer width={10} />
        <TouchableOpacity onPress={handleCreateNewQuotation} activeOpacity={0.4}>
          {createNewQuotation ? <CreateIcon2 width={30} height={30} /> : <CreateIcon width={30} height={30} />}
        </TouchableOpacity>
        <Spacer width={10} />
      </View>
      {showForm()}
      {showList()}
    </>
  );
};

export default QuotationView;
