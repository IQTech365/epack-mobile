import React from 'react';
import {View} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import CollapsibleView from '../../../../../common/CollapsibleView';
import Spacer from '../../../../../common/Spacer';
import { IGetOrdersData } from '../../../../../interface/order/IGetOrdersResponse';
import OrderDetailListItem from '../OrderDetailListItem';
import styles from './style';

interface IDetailsViewProps {
  item: IGetOrdersData | null;
}

const DetailsView: React.FC<IDetailsViewProps> = ({item}) => {

  const showIndividualContactDetails = () => {
    return (
      <>
        <OrderDetailListItem label='Contact Person' value={item?.partyName} />
        <OrderDetailListItem label='Mobile' value={item?.mobile} isLast={true} />
      </>
    );
  }

  const showCompanyContactDetails = () => {
    return (
      <>
        <OrderDetailListItem label='Company Name' value={item?.billingDetails?.companyName} />
        <OrderDetailListItem label='Company Address' value={item?.billingDetails?.companyAddress} />
        <OrderDetailListItem label='Company GST' value={item?.billingDetails?.companyGST} />
        <OrderDetailListItem label='Approval Authority' value={item?.billingDetails?.approvalAuthority} />
        <OrderDetailListItem label='Authority Person' value={item?.billingDetails?.authorityPersonName} />
        <OrderDetailListItem label='Mobile Number' value={item?.billingDetails?.authorityPersonMobile} />
        <OrderDetailListItem label='Employee Name' value={item?.billingDetails?.employeeName} />
        <OrderDetailListItem label='Employee Desig.' value={item?.billingDetails?.employeeDesignation} />
        <OrderDetailListItem label='Employee Mobile' value={item?.billingDetails?.employeeMobile} isLast={true} />
      </>
    );
  }

  const getShiftingLuggages = (item: IGetOrdersData | null) => {
    //@ts-ignore
    const {shiftingLuggage} = item;
    if(shiftingLuggage && Array.isArray(shiftingLuggage) && shiftingLuggage?.length > 0) {
      return shiftingLuggage.join(", ");
    }
    return '';
  }

  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.container}>
        <Spacer height={4} />
        <CollapsibleView title="SHIFTING DETAILS" collapsed={false}>
          <View>
            <View style={styles.elementContainer}>
              <OrderDetailListItem label='Shifting Type' value={item?.shiftingType} />
              <OrderDetailListItem label='Shifting From' value={`${item?.pickupAddress?.address}, ${item?.pickupAddress?.city}, ${item?.pickupAddress?.state}, ${item?.pickupAddress?.pincode}` as string} />
              <OrderDetailListItem label='Shifting To' value={`${item?.dropAddress?.address}, ${item?.dropAddress?.city}, ${item?.dropAddress?.state}, ${item?.dropAddress?.pincode}` as string}/>
              <OrderDetailListItem label='Shifting Luggage' value={getShiftingLuggages(item)} />
              <OrderDetailListItem label='Billing By' value={item?.billingBy} isLast={true} />
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
            <OrderDetailListItem label='Shifting From' value={item?.pickupAddress?.shiftingFrom} />
            <OrderDetailListItem label='State' value={item?.pickupAddress?.state} />
            <OrderDetailListItem label='City' value={item?.pickupAddress?.city} />
            <OrderDetailListItem label='Address' value={item?.pickupAddress?.address} />
            <OrderDetailListItem label='Pincode' value={item?.pickupAddress?.pincode} />
            <OrderDetailListItem label='Floor' value={item?.pickupAddress?.floor} />
            <OrderDetailListItem label='Lift Available' value={item?.pickupAddress?.isLiftAvailable} isLast={true} />
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={8} />
        <CollapsibleView title="DELIVERY ADDRESS" collapsed={true}>
          <View>
            <View style={styles.elementContainer}>
            <OrderDetailListItem label='Shifting To' value={item?.dropAddress?.shiftingTo} />
            <OrderDetailListItem label='State' value={item?.dropAddress?.state} />
            <OrderDetailListItem label='City' value={item?.dropAddress?.city} />
            <OrderDetailListItem label='Address' value={item?.dropAddress?.address} />
            <OrderDetailListItem label='Pincode' value={item?.dropAddress?.pincode} />
            <OrderDetailListItem label='Floor' value={item?.dropAddress?.floor} />
            <OrderDetailListItem label='Lift Available' value={item?.dropAddress?.isLiftAvailable} isLast={true} />
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={8} />
      </View>
    </AvoidSoftInputViewHOC>
  );
};

export default DetailsView;
