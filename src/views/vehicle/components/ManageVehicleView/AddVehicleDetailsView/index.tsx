import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {VehicleManagementStackParamList} from '../../../../../navigation/params/VehicleManagementStackParamList';
import {IVehicle} from '../../../../../interface/vehicle/IGetLorryResponse';
import Header from '../../../../../common/Header';
import Spacer from '../../../../../common/Spacer';
import styles from './style';
import {COLOR_WHITE} from '../../../../../utils/colors';
import {useAppSelector} from '../../../../../redux/hooks';
import {getVehicleType} from '../../utils';
import CloseIcon from '../../../../../images/icons/close_icon2.svg';

type Props = NativeStackScreenProps<
  VehicleManagementStackParamList,
  'VehicleDetails'
>;

const AddVehicleDetailsView: React.FC<Props> = ({route, navigation}) => {
  const item: IVehicle = route.params?.item;
  const {vehicleTypes, vehicleModels} = useAppSelector(state => state.Common);

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
      <Header label="VEHICLE DETAILS" canGoBack={true} />
      <Spacer height={10} />
      <ScrollView contentContainerStyle={styles.contentWrapper}>
        <View style={styles.rowContainer}>
          <View style={styles.rowItemContainer1}>
            <Text style={styles.labelText}>Entity Type</Text>
          </View>
          <View style={styles.rowItemContainer2}>
            <Text style={styles.valueText}>{item.entityType}</Text>
          </View>
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.rowItemContainer1}>
            <Text style={styles.labelText}>Vehicle Company</Text>
          </View>
          <View style={styles.rowItemContainer2}>
            <Text style={styles.valueText}>{item.vehicleCompanyName}</Text>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.rowItemContainer1}>
            <Text style={styles.labelText}>V. Mnf. Year</Text>
          </View>
          <View style={styles.rowItemContainer2}>
            <Text style={styles.valueText}>
              {item.vehicleManufacturingYear}
            </Text>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.rowItemContainer1}>
            <Text style={styles.labelText}>Vehicle Type</Text>
          </View>
          <View style={styles.rowItemContainer2}>
            <Text style={styles.valueText}>
              {getVehicleType(item.vehicleType, vehicleTypes)}
            </Text>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.rowItemContainer1}>
            <Text style={styles.labelText}>Vehicle Model</Text>
          </View>
          <View style={styles.rowItemContainer2}>
            <Text style={styles.valueText}>{item.vehicleModel || 'NA'}</Text>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.rowItemContainer1}>
            <Text style={styles.labelText}>Vehicle Reg. No.</Text>
          </View>
          <View style={styles.rowItemContainer2}>
            <Text style={styles.valueText}>{item.vehicleRegistrationNo}</Text>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.rowItemContainer1}>
            <Text style={styles.labelText}>Vehicle Chasis No.</Text>
          </View>
          <View style={styles.rowItemContainer2}>
            <Text style={styles.valueText}>{item.vehicleChassisNo}</Text>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.rowItemContainer1}>
            <Text style={styles.labelText}>Vehicle Engine No.</Text>
          </View>
          <View style={styles.rowItemContainer2}>
            <Text style={styles.valueText}>{item.vehicleEngineNo}</Text>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.rowItemContainer1}>
            <Text style={styles.labelText}>Vehicle Permit No.</Text>
          </View>
          <View style={styles.rowItemContainer2}>
            <Text style={styles.valueText}>{item.permitNo}</Text>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={[styles.rowItemContainer1, {borderBottomWidth: 0}]}>
            <Text style={styles.labelText}>Vehicle Permit Doc</Text>
          </View>
          <TouchableOpacity
            style={styles.rowItemContainer2}
            onPress={()=>openModal(item.permitDoc)}>
            <Image source={{uri: item.rcDoc}} style={styles.imageStyle} />
          </TouchableOpacity>
          
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.rowItemContainer1}>
            <Text style={styles.labelText}>V. Permit Rnwl. Date</Text>
          </View>
          <View style={styles.rowItemContainer2}>
            <Text style={styles.valueText}>{item.permitRenewalDate}</Text>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.rowItemContainer1}>
            <Text style={styles.labelText}>V. RC No.</Text>
          </View>
          <View style={styles.rowItemContainer2}>
            <Text style={styles.valueText}>{item.vehicleRCNo}</Text>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={[styles.rowItemContainer1, {borderBottomWidth: 0}]}>
            <Text style={styles.labelText}>RC Doc</Text>
          </View>
          <TouchableOpacity
            style={styles.rowItemContainer2}
            onPress={()=>openModal(item.rcDoc)}>
            <Image source={{uri: item.rcDoc}} style={styles.imageStyle} />
          </TouchableOpacity>
          
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.rowItemContainer1}>
            <Text style={styles.labelText}>V. Pollut. Cert. No.</Text>
          </View>
          <View style={styles.rowItemContainer2}>
            <Text style={styles.valueText}>{item.pollutionCertificateNo}</Text>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={[styles.rowItemContainer1, {borderBottomWidth: 0}]}>
            <Text style={styles.labelText}>Pollution Doc</Text>
          </View>
          <TouchableOpacity
            style={styles.rowItemContainer2}
            onPress={()=>openModal(item.pollutionDoc)}>
            <Image source={{uri: item.pollutionDoc}} style={styles.imageStyle} />
          </TouchableOpacity>
          
        </View>
        <View style={styles.rowContainer}>
          <View style={[styles.rowItemContainer1, {borderBottomWidth: 0}]}>
            <Text style={styles.labelText}>V. Pollut. Ren. Date</Text>
          </View>
          <View style={[styles.rowItemContainer2, {borderBottomWidth: 0}]}>
            <Text style={styles.valueText}>{item.pollutionRenewalDate}</Text>
          </View>
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
  );
};

export default AddVehicleDetailsView;
