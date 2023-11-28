import React from 'react';
import {View} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import CollapsibleView from '../../../../../common/CollapsibleView';
import Spacer from '../../../../../common/Spacer';
import EnquiryDetailListItem from '../../../../enquiry/enquiryDetails/components/EnquiryDetailListItem';
import styles from './style';

interface IContactDetailsViewProps {
  item:any
}

const ContactDetailsView: React.FC<IContactDetailsViewProps> = ({item}) => {
  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.container}>
        <Spacer height={4} />
        <CollapsibleView title="CONTACT DETAILS" collapsed={false}>
          <View>
            {item.billingDetails ==''?
            <View style={styles.elementContainer}>
            <EnquiryDetailListItem label='Billing Type:' value='individual'/>
              <EnquiryDetailListItem label='Contact Person:' value={item.partyName}/>
              <EnquiryDetailListItem label='Email:' value={item.email}/>
              <EnquiryDetailListItem label='Mobile:' value={item.phone}/>
              <EnquiryDetailListItem label='Landline:' value={item.landline}/>
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
              <EnquiryDetailListItem label='Employee Designation:' value={item.billingDetails.employeeDesignation}/>
            </View>
            }
          </View>
        </CollapsibleView>
        <Spacer height={8} />
        
        <CollapsibleView title="REGISTERED ADDRESS" collapsed={true}>
          <View>
            <View style={styles.elementContainer}>
              {item.billingDetails ==''?
            <>
            <EnquiryDetailListItem label='Individual:' value='pickup address ' />
            <EnquiryDetailListItem
                  value={`${item.pickupAddress?.floor} ${item.pickupAddress?.city} ${item.pickupAddress?.address} ${item.pickupAddress?.state} ${item.pickupAddress?.pincode}`} /></>
              :
              <>
              <EnquiryDetailListItem label='company:' value='company address ' />
              <EnquiryDetailListItem
                  value={`${item.billingDetails?.companyAddress}`} />
                  </>
}
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={8} />
      </View>
    </AvoidSoftInputViewHOC>
  );
};

export default ContactDetailsView;
