import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import CollapsibleView from '../../../../../common/CollapsibleView';
import ModalHOC from '../../../../../common/ModalHOC';
import Spacer from '../../../../../common/Spacer';
import OrderDetailListItem from '../OrderDetailListItem';
import {MODULE_NAME} from './enum/EModuleName';
import AddressForm, {ADDRESS_TYPE} from './Forms/AddressForm';
import ContactDetailForm from './Forms/ContactDetailForm';
import ShifingDetailForm from './Forms/ShifingDetailForm';
import styles from './style';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import {getOrderRequest} from '../../../../../redux/slices/OrderSlice';
import {ISingleOrderRequest} from '../../../../../interface/order/ISingleOrderRequest';
import Spinner from '../../../../../common/Spinner';
import {ISingleEnquiryData} from '../../../../../interface/enquiry/ISingleEnquiryResponse';
import { COLOR_BLACK, COLOR_GREEN } from '../../../../../utils/colors';
interface IDetailsViewProps {
  enquiryId: string;
}

const DetailsView: React.FC<IDetailsViewProps> = ({enquiryId}) => {
  const [editShiftingDetail, setEditShifingDetail] = useState<boolean>(false);
  const [editContactDetail, setEditContactDetail] = useState<boolean>(false);
  const [editPickupAddress, setEditPickupAddress] = useState<boolean>(false);
  const [editDropAddress, setEditDropAddress] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const {getOrderRequesting, order} = useAppSelector(state => state.Order);
  const {data: orderData} = order || {};
  
  const toastConfig = {
    success: (props: any) => (
      <BaseToast
        {...props}
        style={{borderLeftColor: COLOR_GREEN}}
        contentContainerStyle={{paddingHorizontal: 10, paddingVertical: 15}}
        contentContainerProps={{paddingHorizontal: 15}}
        text1Style={{
          fontSize: 18,
          fontFamily: 'WorkSans-SemiBold',
          color: COLOR_BLACK,
        }}
        text2Style={{
          fontSize: 16,
          fontFamily: 'WorkSans-Medium',
          color: COLOR_BLACK,
        }}
      />
    ),
    error: (props: any) => (
      <ErrorToast
        {...props}
        contentContainerStyle={{paddingHorizontal: 10, paddingVertical: 15}}
        contentContainerProps={{paddingHorizontal: 15}}
        text1Style={{
          fontSize: 18,
          fontFamily: 'WorkSans-SemiBold',
          color: COLOR_BLACK,
        }}
        text2Style={{
          fontSize: 16,
          fontFamily: 'WorkSans-Medium',
          color: COLOR_BLACK,
        }}
      />
    ),
  };

  const getSingleOrder = () => {
    let order: ISingleEnquiryData;
    if (orderData && Array.isArray(orderData) && orderData.length > 0) {
      order = orderData[0];
    }
    //@ts-ignore
    return order;
  };

  const item = getSingleOrder() || {};

  useEffect(() => {
    const payload: ISingleOrderRequest = {
      _id: enquiryId,
    };
    dispatch(getOrderRequest(payload));
  }, []);

  const handleEditShiftingDetail = () => {
    setEditShifingDetail(true);
  };

  const handleEditContactDetail = () => {
    setEditContactDetail(true);
  };

  const handleEditPickupAddress = () => {
    setEditPickupAddress(true);
  };

  const handleEditDropAddress = () => {
    setEditDropAddress(true);
  };

  const handleModalClose = () => {
    setEditShifingDetail(false);
    setEditContactDetail(false);
    setEditPickupAddress(false);
    setEditDropAddress(false);
  };

  const getModalTitle = () => {
    let title: string = '';
    if (editShiftingDetail) {
      title = 'UPDATE - SHIFTING DETAIL INFO';
    } else if (editContactDetail) {
      title = 'UPDATE - CONTACT DETAIL INFO';
    } else if (editPickupAddress) {
      title = 'UPDATE - PICKUP ADDRESS';
    } else if (editDropAddress) {
      title = 'UPDATE - DELIVERY ADDRESS';
    }
    return title;
  };

  const _orderAmount = () => {
    let amount: string | undefined = undefined;
    if (item?.orderAmount) {
      amount = parseFloat(item?.orderAmount).toFixed(2);
    }
    return amount ? `₹ ${amount}` : amount;
  };

  const _tokenAmount = () => {
    let amount: string | undefined = undefined;
    if (item?.tokenAmount) {
      amount = parseFloat(item?.tokenAmount).toFixed(2);
    }
    return amount ? `₹ ${amount}` : amount;
  };

  const getForm = () => {
    if (editShiftingDetail) {
      return (
        <ShifingDetailForm
          moduleName={MODULE_NAME.ORDER}
          item={item as ISingleEnquiryData}
          enquiryId={enquiryId}
          onClose={handleModalClose}
        />
      );
    } else if (editContactDetail) {
      return (
        <ContactDetailForm
          moduleName={MODULE_NAME.ORDER}
          item={item as ISingleEnquiryData}
          enquiryId={enquiryId}
          onClose={handleModalClose}
        />
      );
    } else if (editPickupAddress) {
      return (
        <AddressForm
          addressType={ADDRESS_TYPE.PICKUP}
          moduleName={MODULE_NAME.ORDER}
          item={item as ISingleEnquiryData}
          enquiryId={enquiryId}
          onClose={handleModalClose}
        />
      );
    } else if (editDropAddress) {
      return (
        <AddressForm
          addressType={ADDRESS_TYPE.DROP}
          moduleName={MODULE_NAME.ORDER}
          item={item as ISingleEnquiryData}
          enquiryId={enquiryId}
          onClose={handleModalClose}
        />
      );
    }
    return <></>;
  };

  const showIndividualContactDetails = () => {
    return (
      <>
        <OrderDetailListItem label="Billing By" value={item?.billingBy} />
        <OrderDetailListItem label="Contact Person" value={item?.partyName} />
        <OrderDetailListItem label="Mobile Number" value={item?.mobile} />
        <OrderDetailListItem
          label="Alternate Numbers"
          //@ts-ignore
          value={displayAlternateNumbers()}
        />
        <OrderDetailListItem
          label="Landline Number"
          //@ts-ignore
          value={item?.landline}
        />
        <OrderDetailListItem
          label="Email"
          //@ts-ignore
          value={item?.email}
        />
        <OrderDetailListItem label="Order Amount" value={_orderAmount()} />
        <OrderDetailListItem
          label="Token Amount"
          value={_tokenAmount()}
          isLast={true}
        />
      </>
    );
  };

  const displayAlternateNumbers = () => {
    let altNumbers = 'Not Available';
    const {alternateNumbers} = item || {};
    if (
      alternateNumbers &&
      Array.isArray(alternateNumbers) &&
      alternateNumbers.length > 0
    ) {
      altNumbers = alternateNumbers.join(', ');
    }
    return altNumbers;
  };

  const showCompanyContactDetails = () => {
    return (
      <>
        <OrderDetailListItem
          label="Billing By"
          value={item?.billingBy}
          isLast={true}
        />
        <OrderDetailListItem
          label="Company Name"
          //@ts-ignore
          value={item?.billingDetails?.companyName}
        />
        <OrderDetailListItem
          label="Company Address"
          //@ts-ignore
          value={item?.billingDetails?.companyAddress}
        />
        <OrderDetailListItem
          label="Company GST"
          //@ts-ignore
          value={item?.billingDetails?.companyGST}
        />
        <OrderDetailListItem
          label="Approval Authority"
          //@ts-ignore
          value={item?.billingDetails?.approvalAuthority}
        />
        <OrderDetailListItem
          label="Authority Person"
          //@ts-ignore
          value={item?.billingDetails?.authorityPersonName}
        />
        <OrderDetailListItem
          label="Mobile Number"
          //@ts-ignore
          value={item?.billingDetails?.authorityPersonMobile}
        />
        <OrderDetailListItem
          label="Employee Name"
          //@ts-ignore
          value={item?.billingDetails?.employeeName}
        />
        <OrderDetailListItem
          label="Employee Desig."
          //@ts-ignore
          value={item?.billingDetails?.employeeDesignation}
        />
        <OrderDetailListItem
          label="Alternate Numbers"
          //@ts-ignore
          value={displayAlternateNumbers()}
        />
        <OrderDetailListItem
          label="Landline Number"
          //@ts-ignore
          value={item?.landline}
        />
        <OrderDetailListItem
          label="Email"
          //@ts-ignore
          value={item?.email}
        />
        <OrderDetailListItem
          label="Employee Mobile"
          //@ts-ignore
          value={item?.billingDetails?.employeeMobile}
        />
        <OrderDetailListItem label="Order Amount" value={_orderAmount()} />
        <OrderDetailListItem
          label="Token Amount"
          value={_tokenAmount()}
          isLast={true}
        />
      </>
    );
  };

  const getShiftingLuggages = (item: ISingleEnquiryData | null) => {
    //@ts-ignore
    const {shiftingLuggage} = item || {};
    if (
      shiftingLuggage &&
      Array.isArray(shiftingLuggage) &&
      shiftingLuggage?.length > 0
    ) {
      return shiftingLuggage.join(', ');
    }
    return '';
  };

  const _shiftingFromAddress = (item: ISingleEnquiryData | null) => {
    let _address: string = '';
    const {pickupAddress} = item || {};
    const {address, city, state, pincode} = pickupAddress || {};
    if (address) {
      _address += `${address},`;
    }
    if (city) {
      _address += `${city},`;
    }
    if (state) {
      _address += `${state},`;
    }
    if (pincode) {
      _address += `${pincode}`;
    }
    return _address;
  };

  const _shiftingToAddress = (item: ISingleEnquiryData | null) => {
    let _address: string = '';
    const {dropAddress} = item || {};
    const {address, city, state, pincode} = dropAddress || {};
    if (address) {
      _address += `${address},`;
    }
    if (city) {
      _address += `${city},`;
    }
    if (state) {
      _address += `${state},`;
    }
    if (pincode) {
      _address += `${pincode}`;
    }
    return _address;
  };

  return (
    <View style={styles.container}>
      <Spacer height={4} />
      <CollapsibleView
        title="SHIFTING DETAILS"
        collapsed={false}
        isEdit={true}
        onEditPress={handleEditShiftingDetail}>
        <View>
          <View style={styles.elementContainer}>
            <OrderDetailListItem
              label="Shifting Type"
              value={item?.shiftingType}
            />
            <OrderDetailListItem
              label="Shifting From"
              value={_shiftingFromAddress(item)}
            />
            <OrderDetailListItem
              label="Shifting To"
              value={_shiftingToAddress(item)}
            />
            <OrderDetailListItem
              label="Shifting Luggage"
              value={getShiftingLuggages(item)}
            />
            <OrderDetailListItem
              label="Delivery Date"
              value={item?.deliveryDate || 'Not Available'}
            />
            <OrderDetailListItem
              label="Delivered Date"
              value={item?.deliveredDate || 'Not Available'}
              isLast={true}
            />
          </View>
        </View>
      </CollapsibleView>
      <Spacer height={8} />
      <CollapsibleView
        title="CONTACT DETAILS"
        collapsed={true}
        isEdit={true}
        onEditPress={handleEditContactDetail}>
        <View>
          <View style={styles.elementContainer}>
            {item?.billingBy == 'by Company'
              ? showCompanyContactDetails()
              : showIndividualContactDetails()}
          </View>
        </View>
      </CollapsibleView>
      <Spacer height={8} />
      <CollapsibleView
        title="PICKUP ADDRESS"
        collapsed={true}
        isEdit={true}
        onEditPress={handleEditPickupAddress}>
        <View>
          <View style={styles.elementContainer}>
            <OrderDetailListItem
              label="Shifting From"
              value={item?.pickupAddress?.shiftingFrom}
            />
            <OrderDetailListItem
              label="State"
              value={item?.pickupAddress?.state}
            />
            <OrderDetailListItem
              label="City"
              value={item?.pickupAddress?.city}
            />
            <OrderDetailListItem
              label="Address"
              value={item?.pickupAddress?.address}
            />
            <OrderDetailListItem
              label="Landmark"
              value={item?.pickupAddress?.landmark || 'Not Available'}
            />
            <OrderDetailListItem
              label="Locality"
              value={item?.pickupAddress?.locality || 'Not Available'}
            />
            <OrderDetailListItem
              label="Pincode"
              value={item?.pickupAddress?.pincode}
            />
            <OrderDetailListItem
              label="Floor"
              value={item?.pickupAddress?.floor}
            />
            <OrderDetailListItem
              label="Lift Available"
              value={item?.pickupAddress?.isLiftAvailable}
              isLast={true}
            />
          </View>
        </View>
      </CollapsibleView>
      <Spacer height={8} />
      <CollapsibleView
        title="DELIVERY ADDRESS"
        collapsed={true}
        isEdit={true}
        onEditPress={handleEditDropAddress}>
        <View>
          <View style={styles.elementContainer}>
            <OrderDetailListItem
              label="Shifting To"
              value={item?.dropAddress?.shiftingTo}
            />
            <OrderDetailListItem
              label="State"
              value={item?.dropAddress?.state}
            />
            <OrderDetailListItem label="City" value={item?.dropAddress?.city} />
            <OrderDetailListItem
              label="Address"
              value={item?.dropAddress?.address}
            />
            <OrderDetailListItem
              label="Landmark"
              value={item?.dropAddress?.landmark || 'Not Available'}
            />
            <OrderDetailListItem
              label="Locality"
              value={item?.dropAddress?.locality || 'Not Available'}
            />
            <OrderDetailListItem
              label="Pincode"
              value={item?.dropAddress?.pincode}
            />
            <OrderDetailListItem
              label="Floor"
              value={item?.dropAddress?.floor}
            />
            <OrderDetailListItem
              label="Lift Available"
              value={item?.dropAddress?.isLiftAvailable}
              isLast={true}
            />
          </View>
        </View>
      </CollapsibleView>
      <Spacer height={8} />
      <ModalHOC
        visible={
          editShiftingDetail ||
          editContactDetail ||
          editPickupAddress ||
          editDropAddress
        }
        // modalStyle={styles.modalStyle}
        // headerStyle={styles.headerStyle}
        onClose={handleModalClose}
        title={getModalTitle()}>
          <View>
            {getForm()}
            <Toast config={toastConfig} />
          </View>
      </ModalHOC>
      <Spinner show={getOrderRequesting} />
    </View>
  );
};

export default DetailsView;
