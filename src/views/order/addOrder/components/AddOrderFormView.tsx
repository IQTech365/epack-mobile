import React, {FC, useEffect} from 'react';
import styles from '../style';
import GeneralInfoView from './GeneralInfoView';
import Spacer from '../../../../common/Spacer';
import OrderPickupAddressView from './OrderPickupAddressView';
import OrderDropAddressView from './OrderDropAddressView';
import Spinner from '../../../../common/Spinner';
import {useOrderFormContextHook} from '../../../../provider/OrderFormContextProvider';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import {addOrderRequest, getOrdersRequest, resetAddOrderRequest} from '../../../../redux/slices/OrderSlice';
import {IAddOrderRequest} from '../../../../interface/order/IAddOrderRequest';
import useAuthId from '../../../../hooks/useAuthId';
import Button from '../../../../common/Button';
import { ToastType, showToast } from '../../../../utils/utility';
import { NavigationProp } from '@react-navigation/native';
import { IGetOrdersRequest } from '../../../../interface/order/IGetOrdersRequest';
import { getCurrentCompanyId } from '../../../../utils/storage';
import { EventRegister } from 'react-native-event-listeners';

interface IProps {
    navigation: NavigationProp<any, any>;
}

const AddOrderFormView: FC<IProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const authId = useAuthId();
  const {state} = useOrderFormContextHook();

  const {addOrderRequesting, addOrderSuccess, addOrderFailure, addOrderError} =
    useAppSelector(state => state.Order);

    const _fetchOrders = async () => {
      getCurrentCompanyId().then(id => {
        const payload: Partial<IGetOrdersRequest> = {
          companyId: id as string,
        };
        dispatch(getOrdersRequest(payload));
      }).catch(err => console.log(err));
      }

  const handleAddOrder = async () => {
    // setShowErrors(true);
    // if (!isFormValid) {
    //   Toast.show({
    //     type: 'error',
    //     text1: 'Form',
    //     text2: 'Form data is not valid. Please correct!',
    //   });
    //   showToast('Form is not valid. Please check!', ToastType.ERROR);
    //   return;
    // }
    getCurrentCompanyId().then(id => {
      const data: IAddOrderRequest = {
        companyId: id as string,
        customerId: state.customer_id,
        authId: authId,
        enquiryManager: '',
        shiftingType: state.shifting_type.toUpperCase(),
        partyCompanyName: '',
        partyName: state.party_name,
        email: '',
        mobile: state.party_mobile_no,
        phone: '',
        orderAmount: state.order_amount,
        tokenAmount: state.token_amount,
        shiftingLuggage: state.shifting_luggages,
        enquirySource: '',
        gstNumber: '',
        alternateNumbers: [],
        landline: '',
        deliveryDate: '',
        deliveredDate: '',
        shiftingDate: state.date_of_moving,
        pickupAddress: {
          shiftingFrom: state.p_city,
          state: state.p_state,
          city: state.p_city,
          address: state.p_address,
          pincode: state.p_pincode,
          locality: 'Not Available',
          landmark: 'Not Available',
          floor: state.p_current_floor,
          isLiftAvailable: state.p_lift_status.toUpperCase(),
        },
        dropAddress: {
          shiftingTo: state.d_city,
          state: state.d_state,
          city: state.d_city,
          address: state.d_address,
          pincode: state.d_pincode,
          locality: 'Not Available',
          landmark: 'Not Available',
          floor: state.d_current_floor,
          isLiftAvailable: state.d_lift_status.toUpperCase(),
        },
        billingBy: state.billing_by,
        billingDetails:
          state.billing_by == 'by Company'
            ? {
                companyName: state.company_name,
                approvalAuthority: state.approval_authority,
                authorityPersonName: state.authority_person_name,
                authorityPersonMobile: state.authority_mobile_no,
                companyAddress: state.company_address,
                companyGST: state.company_gst,
                employeeName: state.employee_name,
                employeeDesignation: state.employee_designation,
                employeeMobile: state.employee_mobile_no,
              }
            : {},
        status: 'APPROVED',
      };
      dispatch(addOrderRequest(data));
    }).catch(err => console.log(err));
    
  };

  useEffect(() => {
    if (!addOrderRequesting && addOrderSuccess) {
      showToast("New Order Created.", ToastType.SUCCESS);
      dispatch(resetAddOrderRequest());
      EventRegister.emit('onUpdateEvent', true);
      _fetchOrders();
      navigation?.goBack();
    } else if (!addOrderRequesting && addOrderFailure) {
      showToast("New Order Not Created. Try again!", ToastType.ERROR);
      dispatch(resetAddOrderRequest());
    }
  }, [addOrderRequesting, addOrderSuccess, addOrderFailure]);

  return (
    <>
      <GeneralInfoView />
      <Spacer height={4} />
      <OrderPickupAddressView />
      <Spacer height={4} />
      <OrderDropAddressView />
      <Spacer height={12} />
      <Button
        text="SUBMIT"
        onPress={handleAddOrder}
        disabled={false}
        style={styles.previewButtonStyle}
        textStyle={styles.textStyle}
      />
      <Spacer height={12} />
      <Spinner show={addOrderRequesting} />
    </>
  );
};

export default AddOrderFormView;
