import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import styles from './style';
import PhoneBlueIcon from '../../../../../images/icons/phone-blue.svg';
import WhatsappIcon from '../../../../../images/icons/whatsapp.svg';
import MoreIcon from '../../../../../images/icons/dots-vertical.svg';
import Spacer from '../../../../common/Spacer';


export interface IAddBranchItem {
    branchName: string;
    registeredMobile: string;
    pincode: string;
    shiftingType: string;
    state: string;
    city: string;
    locality: string;
    landmark: string;
    email: string,
    address: string,
    createdBy: string,
}

interface IAddBranchListItemProps {
    item: IAddBranchItem;
    index: number;
}

const AddBranchListItem: React.FC<IAddBranchListItemProps> = ({
    item,
    index,
}) => {


    return (
        <>
            <Shadow style={styles.cardWrapper} distance={8}>
                <TouchableOpacity
                    style={styles.container}
                    activeOpacity={0.6}
                >
                    <Spacer height={6} />
                    <View style={styles.rowContainer}>
                        <View style={styles.rowItemContainer}>
                            <Text style={styles.labelText}>Branch Name</Text>
                        </View>
                        <View style={styles.rowItemContainer2}>
                            <Text style={styles.valueText}>{item.branchName}</Text>
                        </View>
                    </View>
                    <Spacer height={2} />
                    <View style={styles.rowContainer}>
                        <View style={styles.rowItemContainer}>
                            <Text style={styles.labelText}>Register Mobile</Text>
                        </View>
                        <View style={styles.rowItemContainer2}>
                            <Text style={styles.valueText}>{item.registeredMobile}</Text>
                        </View>
                    </View>
                    <Spacer height={2} />
                    <View style={styles.rowContainer}>
                        <View style={styles.rowItemContainer}>
                            <Text style={styles.labelText}>Email</Text>
                        </View>
                        <View style={styles.rowItemContainer2}>
                            <Text style={styles.valueText}>{item.email}</Text>
                        </View>
                    </View>
                    <Spacer height={2} />
                    <View style={styles.rowContainer}>
                        <View style={styles.rowItemContainer}>
                            <Text style={styles.labelText}>Pincode</Text>
                        </View>
                        <View style={styles.rowItemContainer2}>
                            <Text style={styles.valueText}>{item.pincode}</Text>
                        </View>
                    </View>
                    <View style={styles.rowContainer}>
                        <View style={styles.rowItemContainer}>
                            <Text style={styles.labelText}>Address</Text>
                        </View>
                        <View style={styles.rowItemContainer2}>
                            <Text style={styles.valueText}>{item.address}</Text>
                        </View>
                    </View>
                    <View style={styles.rowContainer}>
                        <View style={styles.rowItemContainer}>
                            <Text style={styles.labelText}>state</Text>
                        </View>
                        <View style={styles.rowItemContainer2}>
                            <Text style={styles.valueText}>{item.state}</Text>
                        </View>
                    </View>
                    <View style={styles.rowContainer}>
                        <View style={styles.rowItemContainer}>
                            <Text style={styles.labelText}>city</Text>
                        </View>
                        <View style={styles.rowItemContainer2}>
                            <Text style={styles.valueText}>{item.city}</Text>
                        </View>
                    </View>
                    <Spacer height={6} />
                </TouchableOpacity>
            </Shadow>
        </>
    );
};

export default AddBranchListItem;
