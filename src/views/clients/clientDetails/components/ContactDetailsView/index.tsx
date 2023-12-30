import React from 'react';
import {View} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import CollapsibleView from '../../../../../common/CollapsibleView';
import Spacer from '../../../../../common/Spacer';
import EnquiryDetailListItem from '../../../../enquiry/enquiryDetails/components/EnquiryDetailListItem';
import styles from './style';
import { ICustomer, ICustomerBillingInfo } from '../../../../../interface/customer/customer';

interface IContactDetailsViewProps {
  item:ICustomer
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

  const _getBillingInfo = ():ICustomerBillingInfo|null => {
    let billingInfo:ICustomerBillingInfo | null = null;
    if (item.billingBy == 'by Company') {
      billingInfo = item.billingDetails as ICustomerBillingInfo;
    } 
    return billingInfo;
  }

  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.container}>
        <Spacer height={4} />
        <CollapsibleView title="CONTACT DETAILS" collapsed={false}>
          <View>
            {item.billingDetails ==''?
            <View style={styles.elementContainer}>
            <EnquiryDetailListItem label='Billing Type:' value='Individual'/>
              <EnquiryDetailListItem label='Contact Person:' value={_getClientName()}/>
              <EnquiryDetailListItem label='Mobile:' value={_getContactNo()} isLast={true}/>
            </View>:
            <View style={styles.elementContainer}>
            <EnquiryDetailListItem label='Billing Type:' value={'Company'}  />
              <EnquiryDetailListItem label='Company Name:' value={_getBillingInfo()?.companyName}/>
              <EnquiryDetailListItem label='Company GST:' value={_getBillingInfo()?.companyGST}/>
              <EnquiryDetailListItem label='Approval Authority:' value={_getBillingInfo()?.approvalAuthority}/>
              <EnquiryDetailListItem label='Approval Person:' value={_getBillingInfo()?.authorityPersonName}/>
              <EnquiryDetailListItem label='Mobile Number:' value={_getBillingInfo()?.authorityPersonMobile}/>
              <EnquiryDetailListItem label='Employee Name:' value={_getBillingInfo()?.employeeName}/>
              <EnquiryDetailListItem label='Employee Number:' value={_getBillingInfo()?.employeeMobile}/>
              <EnquiryDetailListItem label='Employee Designation:' value={_getBillingInfo()?.employeeDesignation} isLast={true}/>
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
