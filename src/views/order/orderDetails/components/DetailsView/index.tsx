import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import CollapsibleView from '../../../../../common/CollapsibleView';
import ModalHOC from '../../../../../common/ModalHOC';
import Spacer from '../../../../../common/Spacer';
import {IGetOrdersData} from '../../../../../interface/order/IGetOrdersResponse';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import OrderDetailListItem from '../OrderDetailListItem';
import {MODULE_NAME} from './enum/EModuleName';
import AddressForm, {ADDRESS_TYPE} from './Forms/AddressForm';
import ContactDetailForm from './Forms/ContactDetailForm';
import ShifingDetailForm from './Forms/ShifingDetailForm';
import styles from './style';
import Toast from 'react-native-toast-message';
interface IDetailsViewProps {
  item: IGetOrdersData | null;
  enquiryId: string;
}

const DetailsView: React.FC<IDetailsViewProps> = ({item, enquiryId}) => {
  const [editShiftingDetail, setEditShifingDetail] = useState<boolean>(false);
  const [editContactDetail, setEditContactDetail] = useState<boolean>(false);
  const [editPickupAddress, setEditPickupAddress] = useState<boolean>(false);
  const [editDropAddress, setEditDropAddress] = useState<boolean>(false);

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
      title = 'Edit - Shifting Detail Info';
    } else if (editContactDetail) {
      title = 'Edit - Contact Detail Info';
    } else if (editPickupAddress) {
      title = 'Edit - Pickup Address';
    } else if (editDropAddress) {
      title = 'Edit - Delivery Address';
    }
    return title;
  };

  const getForm = () => {
    if (editShiftingDetail) {
      return (
        <ShifingDetailForm
          moduleName={MODULE_NAME.ORDER}
          item={item as IGetOrdersData}
        />
      );
    } else if (editContactDetail) {
      return (
        <ContactDetailForm
          moduleName={MODULE_NAME.ORDER}
          item={item as IGetOrdersData}
        />
      );
    } else if (editPickupAddress) {
      return (
        <AddressForm
          addressType={ADDRESS_TYPE.PICKUP}
          moduleName={MODULE_NAME.ORDER}
          item={item as IGetOrdersData}
          enquiryId={enquiryId}
        />
      );
    } else if (editDropAddress) {
      return (
        <AddressForm
          addressType={ADDRESS_TYPE.DROP}
          moduleName={MODULE_NAME.ORDER}
          item={item as IGetOrdersData}
          enquiryId={enquiryId}
        />
      );
    }
    return <></>;
  };

  const showIndividualContactDetails = () => {
    return (
      <>
        <OrderDetailListItem
          label="Billing By"
          value={item?.billingBy}
          isLast={true}
        />
        <OrderDetailListItem label="Contact Person" value={item?.partyName} />
        <OrderDetailListItem label="Email" value={item?.mobile} />
        <OrderDetailListItem label="Phone" value={item?.mobile} />
        <OrderDetailListItem label="Order Amount" value={item?.orderAmount} />
        <OrderDetailListItem
          label="Token Amount"
          value={item?.tokenAmount}
          isLast={true}
        />
      </>
    );
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
          label="Employee Mobile"
          //@ts-ignore
          value={item?.billingDetails?.employeeMobile}
          isLast={true}
        />
      </>
    );
  };

  const getShiftingLuggages = (item: IGetOrdersData | null) => {
    //@ts-ignore
    const {shiftingLuggage} = item;
    if (
      shiftingLuggage &&
      Array.isArray(shiftingLuggage) &&
      shiftingLuggage?.length > 0
    ) {
      return shiftingLuggage.join(', ');
    }
    return '';
  };

  return (
    <AvoidSoftInputViewHOC>
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
                value={
                  `${item?.pickupAddress?.address}, ${item?.pickupAddress?.city}, ${item?.pickupAddress?.state}, ${item?.pickupAddress?.pincode}` as string
                }
              />
              <OrderDetailListItem
                label="Shifting To"
                value={
                  `${item?.dropAddress?.address}, ${item?.dropAddress?.city}, ${item?.dropAddress?.state}, ${item?.dropAddress?.pincode}` as string
                }
              />
              <OrderDetailListItem
                label="Shifting Luggage"
                value={getShiftingLuggages(item)}
              />
              <OrderDetailListItem
                label="Delivery Date"
                value={getShiftingLuggages(item)}
              />
              <OrderDetailListItem
                label="Delivered Date"
                value={getShiftingLuggages(item)}
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
              <OrderDetailListItem
                label="City"
                value={item?.dropAddress?.city}
              />
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
          onClose={handleModalClose}
          title={getModalTitle()}>
          <>
            {getForm()}
            <Toast />
          </>
        </ModalHOC>
      </View>
    </AvoidSoftInputViewHOC>
  );
};

export default DetailsView;
