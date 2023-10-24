import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import styles from './style';
import Spacer from '../../../../common/Spacer';


export interface IAddFranchiseItem {
    franchiseName: string;
    franchiseOwnerName:string;
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

interface IAddFranchiseListItemProps {
    item: IAddFranchiseItem;
    index: number;
}

const AddFranchiseListItem: React.FC<IAddFranchiseListItemProps> = ({
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
                            <Text style={styles.labelText}>Franchise Name</Text>
                        </View>
                        <View style={styles.rowItemContainer2}>
                            <Text style={styles.valueText}>{item.franchiseName}</Text>
                        </View>
                    </View>
                    <Spacer height={6} />
                    <View style={styles.rowContainer}>
                        <View style={styles.rowItemContainer}>
                            <Text style={styles.labelText}>Franchise Owner Name</Text>
                        </View>
                        <View style={styles.rowItemContainer2}>
                            <Text style={styles.valueText}>{item.franchiseOwnerName}</Text>
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

export default AddFranchiseListItem;
