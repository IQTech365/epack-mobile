import React, {useEffect, useState} from 'react';
import {Modal, Text, View, FlatList, TouchableOpacity} from 'react-native';
import styles from './style';
import {ICompanyInfoData} from '../../interface/companyRegistration/IGetCompaniesResponse';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {IGetPurchasedSubscriptionParams} from '../../interface/subscription/subscription';
import {getPurchasedSubscriptionRequest} from '../../redux/slices/SubscriptionSlice';
import Spinner from '../Spinner';
import { setCurrentCompanyId, setIsRegistrationComplete, setLoginStatus } from '../../utils/storage';
import { useAuthContext } from '../../provider/AuthProvider';

interface IProps {
  visible: boolean;
  onPress: () => void;
  doCompleteRegistration: (step: number) => void;
  message?: string;
  data: ICompanyInfoData[];
}

const CompanyListModal: React.FC<IProps> = ({
  visible,
  onPress,
  message,
  data,
  doCompleteRegistration,
}) => {
  const dispatch = useAppDispatch();
  const [selectedCompany, setSelectedCompany] = useState<ICompanyInfoData|null>(null);
  const {verifiedData} = useAppSelector(state => state.OTP);
  const {
    getPurchasedSubscriptionsRequesting,
    getPurchasedSubscriptionsSuccess,
    getPurchasedSubscriptionsFailure,
    purchasedSubscriptions,
  } = useAppSelector(state => state.Subscription);
  const authContext = useAuthContext();
  const {setLoggedIn} = authContext;

  const _getSubscriptionList = () => {
    const {data} = verifiedData || {};
    const payload: IGetPurchasedSubscriptionParams = {
      authId: data?.id,
      companyId: selectedCompany?._id as string,
    };
    dispatch(getPurchasedSubscriptionRequest(payload));
  };

  const renderCompanyName = (item: ICompanyInfoData, index: number) => {
    return (
      <TouchableOpacity
        activeOpacity={0.4}
        onPress={() => setSelectedCompany(item)}
        style={styles.companyNameItem}>
        <Text style={styles.descriptionText}>{item.companyName}</Text>
      </TouchableOpacity>
    );
  };

  const showFooterComponent = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.4}
        onPress={onPress}
        style={styles.footerItem}>
        <Text style={styles.footerText}>Create New</Text>
      </TouchableOpacity>
    );
  };

  const completeRegistrationAndLoggedIn = async () => {
    await setIsRegistrationComplete();
    await setCurrentCompanyId(selectedCompany?._id as string);
    await setLoginStatus();
    setLoggedIn(true);
  };

  const _setCompanyIdAndDoCompleteRegistration = async (step: number) => {
    await setCurrentCompanyId(selectedCompany?._id as string);
    doCompleteRegistration && doCompleteRegistration(step);
  }

  useEffect(() => {
    if(selectedCompany) {
      _getSubscriptionList();
    }
  }, [selectedCompany]);

  useEffect(() => {
    return () => {
      setSelectedCompany(null);
    }
  }, []);

  useEffect(() => {
    if (
      !getPurchasedSubscriptionsRequesting &&
      getPurchasedSubscriptionsSuccess
    ) {
      const {data} = purchasedSubscriptions || {};
      console.log('purchasedSubscriptions----', JSON.stringify(data));
      // completeRegistrationAndLoggedIn();
      if (data && Array.isArray(data) && data.length > 0) {
        let isSubscribed: boolean = true;
        if(isSubscribed) {
          if(selectedCompany?.companyLogo && selectedCompany?.companySignature) {
            completeRegistrationAndLoggedIn();
          } else if(!selectedCompany?.companyLogo) {
            _setCompanyIdAndDoCompleteRegistration(2);
          } else if(!selectedCompany?.companySignature) {
            _setCompanyIdAndDoCompleteRegistration(3);
          }
        } else {
          // Close modal and send user to subscribe first
          onPress();
        }
      } else {
        // Close modal and send user to subscribe
        onPress();
      }
    } else if (
      !getPurchasedSubscriptionsRequesting &&
      getPurchasedSubscriptionsFailure
    ) {
      //
    }
  }, [
    getPurchasedSubscriptionsRequesting,
    getPurchasedSubscriptionsSuccess,
    getPurchasedSubscriptionsFailure,
  ]);
  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onPress}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.titleSuccessContainer}>
              <Text style={styles.modalText}>Your Linked Companies</Text>
            </View>
            <FlatList
              data={data}
              renderItem={({item, index}) => renderCompanyName(item, index)}
              ListFooterComponent={showFooterComponent()}
            />
          </View>
        </View>
      </Modal>
      <Spinner show={getPurchasedSubscriptionsRequesting} />
    </View>
  );
};

export default CompanyListModal;
