import React from 'react';
import {View} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import CollapsibleView from '../../../../../common/CollapsibleView';
import Spacer from '../../../../../common/Spacer';
import EnquiryDetailListItem from '../../../../enquiry/enquiryDetails/components/EnquiryDetailListItem';
import styles from './style';
import { ICustomerBillingInfo } from '../../../../../interface/customer/customer';

interface IContactDetailsViewProps {
  item:any
}

const ContactDetailsView: React.FC<IContactDetailsViewProps> = ({item}) => {

  const _getClientName = () => {
    let name:string = '';
    if(item.billingBy == 'by Individual') {
      name = item.partyName;
    } else {
      const billingInfo: ICustomerBillingInfo =
        item.billingDetails as ICustomerBillingInfo;
        name = billingInfo.authorityPersonName || billingInfo.employeeName;
    }
    return name;
  }

  const _getContactNo = () => {
    let contact: string = '';
    if (item.billingBy == 'by Individual') {
      contact = item.mobile;
    } else {
      const billingInfo: ICustomerBillingInfo =
        item.billingDetails as ICustomerBillingInfo;
      contact = billingInfo.authorityPersonMobile || billingInfo.employeeMobile;
    }
    return contact;
  };

  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.container}>
        <Spacer height={4} />
        <CollapsibleView title="CONTACT DETAILS" collapsed={false}>
          <View>
            {item.billingDetails ==''?
            <View style={styles.elementContainer}>
            <EnquiryDetailListItem label='Billing Type:' value='individual'/>
              <EnquiryDetailListItem label='Contact Person:' value={_getClientName()}/>
              <EnquiryDetailListItem label='Email:' value={item.email}/>
              <EnquiryDetailListItem label='Mobile:' value={_getContactNo()}/>
              <EnquiryDetailListItem label='Landline:' value={item.landline} isLast={true}/>
            </View>:
            <View style={styles.elementContainer}>
            <EnquiryDetailListItem label='Billing Type:' value={'Company'}  />
              <EnquiryDetailListItem label='Company Name:' value={item.billingDetails.companyName}/>
              <EnquiryDetailListItem label='Company GST:' value={item.billingDetails.companyGST}/>
              <EnquiryDetailListItem label='Approval Authority:' value={item.billingDetails.approvalAuthority}/>
              <EnquiryDetailListItem label='Approval Person:' value={item.billingDetails.authorityPersonName}/>
              <EnquiryDetailListItem label='Mobile Number:' value={item.billingDetails.authorityPersonMobile}/>
              <EnquiryDetailListItem label='Employee Name:' value={item.billingDetails.employeeName}/>
              <EnquiryDetailListItem label='Employee Number:' value={item.billingDetails.employeeMobile}/>
              <EnquiryDetailListItem label='Employee Designation:' value={item.billingDetails.employeeDesignation} isLast={true}/>
            </View>
            }
          </View>
        </CollapsibleView>
        <Spacer height={8} />
        
        <CollapsibleView title="REGISTERED ADDRESS" collapsed={false}>
          <View>
            <View style={styles.elementContainer}>
            <EnquiryDetailListItem label='City:' value={item?.pickupAddress?.city} />
            <EnquiryDetailListItem label="State:" value={item?.pickupAddress?.state} />
            <EnquiryDetailListItem label="Pincode:" value={item?.pickupAddress?.pincode} />
            <EnquiryDetailListItem label="Address:" value={item?.pickupAddress?.address} />
            <EnquiryDetailListItem label="Locality:" value={item?.pickupAddress?.locality} />
            <EnquiryDetailListItem label="Landmark:" value={item?.pickupAddress?.landmark} />
            <EnquiryDetailListItem label="Floor:" value={item?.pickupAddress?.floor} />
            <EnquiryDetailListItem label="Lift Status:" value={item?.pickupAddress?.isLiftAvailable} isLast={true} />
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={8} />
      </View>
    </AvoidSoftInputViewHOC>
  );
};

export default ContactDetailsView;
