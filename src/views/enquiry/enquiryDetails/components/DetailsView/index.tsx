import React from 'react';
import {View} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import CollapsibleView from '../../../../../common/CollapsibleView';
import Spacer from '../../../../../common/Spacer';
import { IGetEnquiriesData } from '../../../../../interface/enquiry/IGetEnquiriesResponse';
import EnquiryDetailListItem from '../EnquiryDetailListItem';
import styles from './style';

interface IDetailsViewProps {
  item: IGetEnquiriesData | undefined;
}

const DetailsView: React.FC<IDetailsViewProps> = ({item}) => {

  const showIndividualContactDetails = () => {
    return (
      <>
        <EnquiryDetailListItem label='Contact Person' value={item?.partyName} />
        <EnquiryDetailListItem label='Mobile' value={item?.mobile} isLast={true} />
      </>
    );
  }

  const showCompanyContactDetails = () => {
    return (
      <>
        <EnquiryDetailListItem label='Company Name' value={item?.billingDetails?.companyName} />
        <EnquiryDetailListItem label='Company Address' value={item?.billingDetails?.companyAddress} />
        <EnquiryDetailListItem label='Company GST' value={item?.billingDetails?.companyGST} />
        <EnquiryDetailListItem label='Approval Authority' value={item?.billingDetails?.approvalAuthority} />
        <EnquiryDetailListItem label='Authority Person' value={item?.billingDetails?.authorityPersonName} />
        <EnquiryDetailListItem label='Mobile Number' value={item?.billingDetails?.authorityPersonMobile} />
        <EnquiryDetailListItem label='Employee Name' value={item?.billingDetails?.employeeName} />
        <EnquiryDetailListItem label='Employee Desig.' value={item?.billingDetails?.employeeDesignation} />
        <EnquiryDetailListItem label='Employee Mobile' value={item?.billingDetails?.employeeMobile} isLast={true} />
      </>
    );
  }
  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.container}>
        <Spacer height={4} />
        <CollapsibleView title="SHIFTING DETAILS" collapsed={false}>
          <View>
            <View style={styles.elementContainer}>
            <EnquiryDetailListItem label='Shifting Type' value={item?.shiftingType} />
              <EnquiryDetailListItem label='Shifting From' value={`${item?.pickupAddress.address}, ${item?.pickupAddress.city}, ${item?.pickupAddress.state}, ${item?.pickupAddress.pincode}` as string} />
              <EnquiryDetailListItem label='Shifting To' value={`${item?.dropAddress.address}, ${item?.dropAddress.city}, ${item?.dropAddress.state}, ${item?.dropAddress.pincode}` as string}/>
              <EnquiryDetailListItem label='Shifting Luggage' value={item?.shiftingLuggage.join(', ')} />
              <EnquiryDetailListItem label='Billing By' value={item?.billingBy} isLast={true} />
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={8} />
        <CollapsibleView title="CONTACT DETAILS" collapsed={true}>
          <View>
            <View style={styles.elementContainer}>
            {item?.billingBy == 'by Company' ? showCompanyContactDetails() : showIndividualContactDetails()}
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={8} />
        <CollapsibleView title="PICKUP ADDRESS" collapsed={true}>
          <View>
            <View style={styles.elementContainer}>
            <EnquiryDetailListItem label='Shifting From' value={item?.pickupAddress.shiftingFrom} />
            <EnquiryDetailListItem label='State' value={item?.pickupAddress.state} />
            <EnquiryDetailListItem label='City' value={item?.pickupAddress.city} />
            <EnquiryDetailListItem label='Address' value={item?.pickupAddress.address} />
            <EnquiryDetailListItem label='Pincode' value={item?.pickupAddress.pincode} />
            <EnquiryDetailListItem label='Floor' value={item?.pickupAddress.floor} />
            <EnquiryDetailListItem label='Lift Available' value={item?.pickupAddress.isLiftAvailable} isLast={true} />
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={8} />
        <CollapsibleView title="DELIVERY ADDRESS" collapsed={true}>
          <View>
            <View style={styles.elementContainer}>
            <EnquiryDetailListItem label='Shifting To' value={item?.dropAddress.shiftingTo} />
            <EnquiryDetailListItem label='State' value={item?.dropAddress.state} />
            <EnquiryDetailListItem label='City' value={item?.dropAddress.city} />
            <EnquiryDetailListItem label='Address' value={item?.dropAddress.address} />
            <EnquiryDetailListItem label='Pincode' value={item?.dropAddress.pincode} />
            <EnquiryDetailListItem label='Floor' value={item?.dropAddress.floor} />
            <EnquiryDetailListItem label='Lift Available' value={item?.dropAddress.isLiftAvailable} isLast={true} />
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={8} />
      </View>
    </AvoidSoftInputViewHOC>
  );
};

export default DetailsView;
