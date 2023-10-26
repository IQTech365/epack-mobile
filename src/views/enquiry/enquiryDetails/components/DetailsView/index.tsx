import React, {useState} from 'react';
import {View} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import CollapsibleView from '../../../../../common/CollapsibleView';
import ModalHOC from '../../../../../common/ModalHOC';
import Spacer from '../../../../../common/Spacer';
import {IGetEnquiriesData} from '../../../../../interface/enquiry/IGetEnquiriesResponse';
import {MODULE_NAME} from '../../../../order/orderDetails/components/DetailsView/enum/EModuleName';
import AddressForm, {
  ADDRESS_TYPE,
} from '../../../../order/orderDetails/components/DetailsView/Forms/AddressForm';
import ContactDetailForm from '../../../../order/orderDetails/components/DetailsView/Forms/ContactDetailForm';
import ShifingDetailForm from '../../../../order/orderDetails/components/DetailsView/Forms/ShifingDetailForm';
import EnquiryDetailListItem from '../EnquiryDetailListItem';
import styles from './style';
import Toast from 'react-native-toast-message';

interface IDetailsViewProps {
  item: IGetEnquiriesData | undefined;
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
          moduleName={MODULE_NAME.ENQUIRY}
          item={item as IGetEnquiriesData}
        />
      );
    } else if (editContactDetail) {
      return (
        <ContactDetailForm
          moduleName={MODULE_NAME.ENQUIRY}
          item={item as IGetEnquiriesData}
        />
      );
    } else if (editPickupAddress) {
      return (
        <AddressForm
          addressType={ADDRESS_TYPE.PICKUP}
          moduleName={MODULE_NAME.ENQUIRY}
          item={item as IGetEnquiriesData}
          enquiryId={enquiryId}
        />
      );
    } else if (editDropAddress) {
      return (
        <AddressForm
          addressType={ADDRESS_TYPE.DROP}
          moduleName={MODULE_NAME.ENQUIRY}
          item={item as IGetEnquiriesData}
          enquiryId={enquiryId}
        />
      );
    }
    return <></>;
  };

  const showIndividualContactDetails = () => {
    return (
      <>
        <EnquiryDetailListItem label="Contact Person" value={item?.partyName} />
        <EnquiryDetailListItem
          label="Mobile"
          value={item?.mobile}
          isLast={true}
        />
      </>
    );
  };

  const showCompanyContactDetails = () => {
    return (
      <>
        <EnquiryDetailListItem
          label="Company Name"
          value={item?.billingDetails?.companyName}
        />
        <EnquiryDetailListItem
          label="Company Address"
          value={item?.billingDetails?.companyAddress}
        />
        <EnquiryDetailListItem
          label="Company GST"
          value={item?.billingDetails?.companyGST}
        />
        <EnquiryDetailListItem
          label="Approval Authority"
          value={item?.billingDetails?.approvalAuthority}
        />
        <EnquiryDetailListItem
          label="Authority Person"
          value={item?.billingDetails?.authorityPersonName}
        />
        <EnquiryDetailListItem
          label="Mobile Number"
          value={item?.billingDetails?.authorityPersonMobile}
        />
        <EnquiryDetailListItem
          label="Employee Name"
          value={item?.billingDetails?.employeeName}
        />
        <EnquiryDetailListItem
          label="Employee Desig."
          value={item?.billingDetails?.employeeDesignation}
        />
        <EnquiryDetailListItem
          label="Employee Mobile"
          value={item?.billingDetails?.employeeMobile}
          isLast={true}
        />
      </>
    );
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
              <EnquiryDetailListItem
                label="Shifting Type"
                value={item?.shiftingType}
              />
              <EnquiryDetailListItem
                label="Shifting From"
                value={
                  `${item?.pickupAddress.address}, ${item?.pickupAddress.city}, ${item?.pickupAddress.state}, ${item?.pickupAddress.pincode}` as string
                }
              />
              <EnquiryDetailListItem
                label="Shifting To"
                value={
                  `${item?.dropAddress.address}, ${item?.dropAddress.city}, ${item?.dropAddress.state}, ${item?.dropAddress.pincode}` as string
                }
              />
              <EnquiryDetailListItem
                label="Shifting Luggage"
                value={item?.shiftingLuggage.join(', ')}
              />
              <EnquiryDetailListItem
                label="Billing By"
                value={item?.billingBy}
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
              <EnquiryDetailListItem
                label="Shifting From"
                value={item?.pickupAddress.shiftingFrom}
              />
              <EnquiryDetailListItem
                label="State"
                value={item?.pickupAddress.state}
              />
              <EnquiryDetailListItem
                label="City"
                value={item?.pickupAddress.city}
              />
              <EnquiryDetailListItem
                label="Address"
                value={item?.pickupAddress.address}
              />
              <EnquiryDetailListItem
                label="Landmark"
                value={item?.pickupAddress.landmark || 'Not Available'}
              />
              <EnquiryDetailListItem
                label="Locality"
                //@ts-ignore
                value={item?.pickupAddress.locality || 'Not Available'}
              />
              <EnquiryDetailListItem
                label="Pincode"
                value={item?.pickupAddress.pincode}
              />
              <EnquiryDetailListItem
                label="Floor"
                value={item?.pickupAddress.floor}
              />
              <EnquiryDetailListItem
                label="Lift Available"
                value={item?.pickupAddress.isLiftAvailable}
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
              <EnquiryDetailListItem
                label="Shifting To"
                value={item?.dropAddress.shiftingTo}
              />
              <EnquiryDetailListItem
                label="State"
                value={item?.dropAddress.state}
              />
              <EnquiryDetailListItem
                label="City"
                value={item?.dropAddress.city}
              />
              <EnquiryDetailListItem
                label="Address"
                value={item?.dropAddress.address}
              />
              <EnquiryDetailListItem
                label="Landmark"
                value={item?.dropAddress.landmark || 'Not Available'}
              />
              <EnquiryDetailListItem
                label="Locality"
                //@ts-ignore
                value={item?.dropAddress.locality || 'Not Available'}
              />
              <EnquiryDetailListItem
                label="Pincode"
                value={item?.dropAddress.pincode}
              />
              <EnquiryDetailListItem
                label="Floor"
                value={item?.dropAddress.floor}
              />
              <EnquiryDetailListItem
                label="Lift Available"
                value={item?.dropAddress.isLiftAvailable}
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
