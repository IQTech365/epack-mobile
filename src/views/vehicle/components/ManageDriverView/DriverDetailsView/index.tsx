import React, { useState } from "react";
import {View, Text, ScrollView, TouchableOpacity,Modal, Image} from 'react-native';
import styles from './style';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { VehicleManagementStackParamList } from "../../../../../navigation/params/VehicleManagementStackParamList";
import Header from "../../../../../common/Header";
import Spacer from "../../../../../common/Spacer";
import { COLOR_WHITE } from "../../../../../utils/colors";
import { IDriver, IVehicle } from "../../../../../interface/order/IGetBiltyListResponse";
import CloseIcon from '../../../../../images/icons/close_icon2.svg';

type Props = NativeStackScreenProps<VehicleManagementStackParamList,"DriverDetails">;

const DriverDetailsView:React.FC<Props> = ({route,navigation}) => {
    const item: IDriver = route.params?.item;

    const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const openModal = (imageUri: string) => {
    
    setSelectedImage(imageUri);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedImage('');
  };

    return (
        <View style={{flex: 1, backgroundColor: COLOR_WHITE}}>
        <Header label="DRIVER DETAILS" canGoBack={true} />
        <Spacer height={10} />
        <ScrollView contentContainerStyle={styles.contentWrapper}>
          <View style={styles.rowContainer}>
            <View style={styles.rowItemContainer1}>
              <Text style={styles.labelText}>Driver Name</Text>
            </View>
            <View style={styles.rowItemContainer2}>
              <Text style={styles.valueText}>{item.driverName}</Text>
            </View>
          </View>
    
          <View style={styles.rowContainer}>
            <View style={styles.rowItemContainer1}>
              <Text style={styles.labelText}>Driver Mobile</Text>
            </View>
            <View style={styles.rowItemContainer2}>
              <Text style={styles.valueText}>{item.mobile}</Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.rowItemContainer1}>
              <Text style={styles.labelText}>Vehicle Licence</Text>
            </View>
            <View style={styles.rowItemContainer2}>
              <Text style={styles.valueText}>
                {item.licenceNo}
              </Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.rowItemContainer1}>
              <Text style={styles.labelText}>Driver AadharNo</Text>
            </View>
            <View style={styles.rowItemContainer2}>
            <Text style={styles.valueText}>
                {item.aadharNo}
              </Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.rowItemContainer1}>
              <Text style={styles.labelText}>Driver Current Address</Text>
            </View>
            <View style={styles.rowItemContainer2}>
              <Text style={styles.valueText}>{item.currentAddress.address}</Text>
            </View>
          </View>
           <View style={styles.rowContainer}>
            <View style={styles.rowItemContainer1}>
              <Text style={styles.labelText}>Driver Current City</Text>
            </View>
            <View style={styles.rowItemContainer2}>
              <Text style={styles.valueText}>{item.currentAddress.city}</Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.rowItemContainer1}>
              <Text style={styles.labelText}>Driver Parmanent Address</Text>
            </View>
            <View style={styles.rowItemContainer2}>
              <Text style={styles.valueText}>{item.permanentAddress.address}</Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.rowItemContainer1}>
              <Text style={styles.labelText}>Driver Parmanent City</Text>
            </View>
            <View style={styles.rowItemContainer2}>
              <Text style={styles.valueText}>{item.permanentAddress.city}</Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={[styles.rowItemContainer1, {borderBottomWidth: 0}]}>
              <Text style={styles.labelText}>Driver Photo</Text>
            </View>
            <TouchableOpacity
              style={styles.rowItemContainer2}
              onPress={()=>openModal(item.driverPhoto)}>
              <Image source={{uri: item.driverPhoto}} style={styles.imageStyle} />
            </TouchableOpacity>
            
          </View>
           <View style={styles.rowContainer}>
            <View style={[styles.rowItemContainer1, {borderBottomWidth: 0}]}>
              <Text style={styles.labelText}>Driver Licence</Text>
            </View>
            <TouchableOpacity
              style={styles.rowItemContainer2}
              onPress={()=>openModal(item.driverLicence)}>
              <Image source={{uri: item.driverLicence}} style={styles.imageStyle} />
            </TouchableOpacity>
            
          </View>
          <View style={styles.rowContainer}>
            <View style={[styles.rowItemContainer1, {borderBottomWidth: 0}]}>
              <Text style={styles.labelText}>Driver Aadhar Front</Text>
            </View>
            <TouchableOpacity
              style={styles.rowItemContainer2}
              onPress={()=>openModal(item.aadharFront)}>
              <Image source={{uri: item.aadharFront}} style={styles.imageStyle} />
            </TouchableOpacity>
            
          </View>

          <View style={styles.rowContainer}>
            <View style={[styles.rowItemContainer1, {borderBottomWidth: 0}]}>
              <Text style={styles.labelText}>Driver Aadhar Back</Text>
            </View>
            <TouchableOpacity
              style={styles.rowItemContainer2}
              onPress={()=>openModal(item.aadharBack)}>
              <Image source={{uri: item.aadharBack}} style={styles.imageStyle} />
            </TouchableOpacity>
            
          </View>
           
          <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={closeModal}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <TouchableOpacity
                    onPress={closeModal}
                    style={styles.closeButton}>
                    <Text style={{color:'black'}}><CloseIcon/></Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={closeModal}>
                    <Image
                      source={{uri: selectedImage}}
                      style={styles.imageStyle1}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
        </ScrollView>
      </View>
    ) 
   
};

export default DriverDetailsView;