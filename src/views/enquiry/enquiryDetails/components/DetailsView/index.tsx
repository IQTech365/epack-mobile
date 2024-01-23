import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import CollapsibleView from '../../../../../common/CollapsibleView';
import ModalHOC from '../../../../../common/ModalHOC';
import Spacer from '../../../../../common/Spacer';
import {MODULE_NAME} from '../../../../order/orderDetails/components/DetailsView/enum/EModuleName';
import AddressForm, {
  ADDRESS_TYPE,
} from '../../../../order/orderDetails/components/DetailsView/Forms/AddressForm';
import ContactDetailForm from '../../../../order/orderDetails/components/DetailsView/Forms/ContactDetailForm';
import ShifingDetailForm from '../../../../order/orderDetails/components/DetailsView/Forms/ShifingDetailForm';
import EnquiryDetailListItem from '../EnquiryDetailListItem';
import styles from './style';
import Toast from 'react-native-toast-message';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { getEnquiryRequest } from '../../../../../redux/slices/EnquirySlice';
import Spinner from '../../../../../common/Spinner';
import { ISingleEnquiryData } from '../../../../../interface/enquiry/ISingleEnquiryResponse';

interface IDetailsViewProps {
  enquiryId: string;
}

const DetailsView: React.FC<IDetailsViewProps> = ({enquiryId}) => {
  const [editShiftingDetail, setEditShifingDetail] = useState<boolean>(false);
  const [editContactDetail, setEditContactDetail] = useState<boolean>(false);
  const [editPickupAddress, setEditPickupAddress] = useState<boolean>(false);
  const [editDropAddress, setEditDropAddress] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const {enquiry, getEnquiryRequesting} = useAppSelector(state => state.Enquiry);
  const {data} = enquiry || {};
  console.log('Single Enquiry-enquiryId--', enquiryId);
  console.log('Single Enquiry-data--', JSON.stringify(data));

  const getSingleEnquiry = () => {
    let enquiry:ISingleEnquiryData;
    if(data && Array.isArray(data) && data.length > 0) {
      enquiry = data[0];
    }
    //@ts-ignore
    return enquiry;
  }

  const singleEnquiry = getSingleEnquiry();
  

  useEffect(() => {
    dispatch(getEnquiryRequest(enquiryId));
  }, [enquiryId]);

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
          item={singleEnquiry as ISingleEnquiryData}
          enquiryId={enquiryId}
          onClose={handleModalClose}
        />
      );
    } else if (editContactDetail) {
      return (
        <ContactDetailForm
          moduleName={MODULE_NAME.ENQUIRY}
          item={singleEnquiry as ISingleEnquiryData}
          enquiryId={enquiryId}
          onClose={handleModalClose}
        />
      );
    } else if (editPickupAddress) {
      return (
        <AddressForm
          addressType={ADDRESS_TYPE.PICKUP}
          moduleName={MODULE_NAME.ENQUIRY}
          item={singleEnquiry as ISingleEnquiryData}
          enquiryId={enquiryId}
          onClose={handleModalClose}
        />
      );
    } else if (editDropAddress) {
      return (
        <AddressForm
          addressType={ADDRESS_TYPE.DROP}
          moduleName={MODULE_NAME.ENQUIRY}
          item={getSingleEnquiry() as ISingleEnquiryData}
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
        <EnquiryDetailListItem label="Contact Person" value={singleEnquiry?.partyName} />
        <EnquiryDetailListItem
          label="Email"
          value={singleEnquiry?.email}
        />
        <EnquiryDetailListItem
          label="Mobile"
          value={singleEnquiry?.mobile}
        />
        <EnquiryDetailListItem
          label="Landline"
          value={singleEnquiry?.landline}
        />
        <EnquiryDetailListItem
          label="Alternate Numbers"
          value={singleEnquiry?.alternateNumbers.join(", ")}
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
          value={singleEnquiry?.billingDetails?.companyName}
        />
        <EnquiryDetailListItem
          label="Company Address"
          value={singleEnquiry?.billingDetails?.companyAddress}
        />
        <EnquiryDetailListItem
          label="Company GST"
          value={singleEnquiry?.billingDetails?.companyGST}
        />
        <EnquiryDetailListItem
          label="Approval Authority"
          value={singleEnquiry?.billingDetails?.approvalAuthority}
        />
        <EnquiryDetailListItem
          label="Authority Person"
          value={singleEnquiry?.billingDetails?.authorityPersonName}
        />
        <EnquiryDetailListItem
          label="Mobile Number"
          value={singleEnquiry?.billingDetails?.authorityPersonMobile}
        />
        <EnquiryDetailListItem
          label="Employee Name"
          value={singleEnquiry?.billingDetails?.employeeName}
        />
        <EnquiryDetailListItem
          label="Employee Desig."
          value={singleEnquiry?.billingDetails?.employeeDesignation}
        />
        <EnquiryDetailListItem
          label="Employee Mobile"
          value={singleEnquiry?.billingDetails?.employeeMobile}
          isLast={true}
        />
      </>
    );
  };

  const _shiftingFromAddress = (item: ISingleEnquiryData | null) => {
    let _address:string = '';
    const {pickupAddress} = item || {};
    const {address, city, state, pincode} = pickupAddress || {};
    if(address) {
      _address += `${address},`;
    }
    if(city) {
      _address += `${city},`;
    }
    if(state) {
      _address += `${state},`;
    }
    if(pincode) {
      _address += `${pincode}`;
    }
    return _address;
  }

  const _shiftingToAddress = (item: ISingleEnquiryData | null) => {
    let _address:string = '';
    const {dropAddress} = item || {};
    const {address, city, state, pincode} = dropAddress || {};
    if(address) {
      _address += `${address},`;
    }
    if(city) {
      _address += `${city},`;
    }
    if(state) {
      _address += `${state},`;
    }
    if(pincode) {
      _address += `${pincode}`;
    }
    return _address;
  }
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
                value={singleEnquiry?.shiftingType}
              />
              <EnquiryDetailListItem
                label="Shifting From"
                value={_shiftingFromAddress(singleEnquiry)}
              />
              <EnquiryDetailListItem
                label="Shifting To"
                value={_shiftingToAddress(singleEnquiry)}
              />
              <EnquiryDetailListItem
                label="Shifting Luggage"
                value={singleEnquiry?.shiftingLuggage.join(', ')}
              />
              <EnquiryDetailListItem
                label="Billing By"
                value={singleEnquiry?.billingBy}
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
              {singleEnquiry?.billingBy == 'by Company'
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
                value={singleEnquiry?.pickupAddress.shiftingFrom}
              />
              <EnquiryDetailListItem
                label="State"
                value={singleEnquiry?.pickupAddress.state}
              />
              <EnquiryDetailListItem
                label="City"
                value={singleEnquiry?.pickupAddress.city}
              />
              <EnquiryDetailListItem
                label="Address"
                value={singleEnquiry?.pickupAddress.address}
              />
              <EnquiryDetailListItem
                label="Landmark"
                value={singleEnquiry?.pickupAddress.landmark}
              />
              <EnquiryDetailListItem
                label="Locality"
                //@ts-ignore
                value={singleEnquiry?.pickupAddress.locality}
              />
              <EnquiryDetailListItem
                label="Pincode"
                value={singleEnquiry?.pickupAddress.pincode}
              />
              <EnquiryDetailListItem
                label="Floor"
                value={singleEnquiry?.pickupAddress.floor}
              />
              <EnquiryDetailListItem
                label="Lift Available"
                value={singleEnquiry?.pickupAddress.isLiftAvailable}
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
                value={singleEnquiry?.dropAddress.shiftingTo}
              />
              <EnquiryDetailListItem
                label="State"
                value={singleEnquiry?.dropAddress.state}
              />
              <EnquiryDetailListItem
                label="City"
                value={singleEnquiry?.dropAddress.city}
              />
              <EnquiryDetailListItem
                label="Address"
                value={singleEnquiry?.dropAddress.address}
              />
              <EnquiryDetailListItem
                label="Landmark"
                value={singleEnquiry?.dropAddress.landmark}
              />
              <EnquiryDetailListItem
                label="Locality"
                //@ts-ignore
                value={singleEnquiry?.dropAddress.locality}
              />
              <EnquiryDetailListItem
                label="Pincode"
                value={singleEnquiry?.dropAddress.pincode}
              />
              <EnquiryDetailListItem
                label="Floor"
                value={singleEnquiry?.dropAddress.floor}
              />
              <EnquiryDetailListItem
                label="Lift Available"
                value={singleEnquiry?.dropAddress.isLiftAvailable}
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
          modalStyle={styles.modalStyle}
          headerStyle={styles.headerStyle}
          onClose={handleModalClose}
          title={getModalTitle()}>
          <>
          {getForm()}
          <Toast />
          </>
        </ModalHOC>
        <Spinner show={getEnquiryRequesting} />
      </View>
    </AvoidSoftInputViewHOC>
  );
};

export default DetailsView;
