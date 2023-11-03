import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import styles from './style';
import Spacer from '../../../../common/Spacer';


export interface IAddLorryItem {
            entityType: string,
            driverName: string,
            branchName: string,
            lorryCompanyName: string,
            vehicleManufacturingYear: string,
            lorryType: string,
            vehicleRegistrationNo: string,
            vehicleChassisNo: string,
            vehicleEngineNo: string,
            permitNo: string,
            permitRenewalDate: string,
            vehicleRCNo:string,
            pollutionCertificateNo: string,
            pollutionRenewalDate: string,
            createdBy: string,
            createdAt: string,
}

interface IAddLorryListItemProps {
    item: IAddLorryItem;
    index: number;
}

const AddLorryListItem: React.FC<IAddLorryListItemProps> = ({
    item,
    index,
}:IAddLorryListItemProps) => {


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
                            <Text style={styles.labelText}>Entity Type</Text>
                        </View>
                        <View style={styles.rowItemContainer2}>
                            <Text style={styles.valueText}>{item.entityType}</Text>
                        </View>
                    </View>
                    <Spacer height={2} />
                    <View style={styles.rowContainer}>
                        <View style={styles.rowItemContainer}>
                            <Text style={styles.labelText}>Dreiver Name</Text>
                        </View>
                        <View style={styles.rowItemContainer2}>
                            <Text style={styles.valueText}>{item.driverName}</Text>
                        </View>
                    </View>
                    <Spacer height={2} />
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
                            <Text style={styles.labelText}>lorry Company Name</Text>
                        </View>
                        <View style={styles.rowItemContainer2}>
                            <Text style={styles.valueText}>{item.lorryCompanyName}</Text>
                        </View>
                    </View>
                    <View style={styles.rowContainer}>
                        <View style={styles.rowItemContainer}>
                            <Text style={styles.labelText}>vehicle Manufacturing Year</Text>
                        </View>
                        <View style={styles.rowItemContainer2}>
                            <Text style={styles.valueText}>{item.vehicleManufacturingYear}</Text>
                        </View>
                    </View>
                    <View style={styles.rowContainer}>
                        <View style={styles.rowItemContainer}>
                            <Text style={styles.labelText}>lorryType</Text>
                        </View>
                        <View style={styles.rowItemContainer2}>
                            <Text style={styles.valueText}>{item.lorryType}</Text>
                        </View>
                    </View>
                    <View style={styles.rowContainer}>
                        <View style={styles.rowItemContainer}>
                            <Text style={styles.labelText}>vehicleRegistration No</Text>
                        </View>
                        <View style={styles.rowItemContainer2}>
                            <Text style={styles.valueText}>{item.vehicleRegistrationNo}</Text>
                        </View>
                    </View>
                    <Spacer height={6} />
                </TouchableOpacity>
            </Shadow>
        </>
    );
};

export default AddLorryListItem;
