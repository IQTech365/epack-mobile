import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Modal,
  StyleSheet,
  Dimensions,
  Text,
  Pressable,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import CloseIcon from '../../images/icons/close_icon.svg';
import PlusIcon from '../../images/icons/plus_icon.svg';
import MinusIcon from '../../images/icons/minus_icon.svg';
import {
  COLOR_BLACK,
  COLOR_BLUE,
  COLOR_GRAY2,
  COLOR_GRAY4,
  COLOR_GRAY5,
  COLOR_WHITE,
} from '../../utils/colors';
import {IMaterial} from '../../interface/enquiry/IPackingMaterialsResponse';
import Spacer from '../Spacer';
import _ from 'underscore';
import Label from '../Label';
import DropdownComponent from '../DropdownComponent';
import {useAppSelector} from '../../redux/hooks';
import {TDropdownItem} from '../../type/TDropdownItem';

interface IProps {
  visible: boolean;
  item: IMaterial | null;
  index: number;
  onClose: () => void;
  onUpdate?: (index: number, item: IMaterial) => void;
}

const MaterialListUpdateVehicleSizeModal = ({
  visible,
  item,
  index,
  onClose,
  onUpdate,
}: IProps) => {
  const [newQuantity, setNewQuantity] = useState<string | undefined>(
    item?.quantity,
  );
  const [vehicleLoadSize, setVehicleLoadSize] = useState('');
  const {vehicleSizeData} = useAppSelector(state => state.Vehicle);
  const {data: VehicleSize} = vehicleSizeData || {};
  const vehicleSizeArray = () => {
    let _data: any[] = [];
    if (VehicleSize && Array.isArray(VehicleSize) && VehicleSize.length > 0) {
      _data = VehicleSize.map((item: any) => ({
        value: item._id,
        label: item.vehicleSize,
      }));
    }
    return _data;
  };

  const _handleClose = useCallback(() => {
    setNewQuantity(undefined);
    onClose && onClose();
  }, []);

  const _handleUpdate = () => {
    if (!_.isNull(item)) {
      const updatedItem: IMaterial = {
        ...item,
        quantity: newQuantity as string,
      };
      onUpdate && onUpdate(index, updatedItem);
    }
  };

  const handleLorryType = (item: TDropdownItem) => {
    setVehicleLoadSize(item.value);
  };

  useEffect(() => {
    setNewQuantity(item?.quantity);
  }, [item]);
  

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          _handleClose();
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.headerContainer}>
              <Text style={[styles.modalText]}>UPDATE</Text>
              <Pressable onPress={_handleClose}>
                <CloseIcon />
              </Pressable>
            </View>
            <View style={styles.textContainer2}>
              <Label text="Vehicle Load Size" style={styles.label} />
              <DropdownComponent
                data={vehicleSizeArray()}
                onSelect={handleLorryType}
              />
            </View>
            <Spacer height={20} />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={_handleUpdate}>
              <Text style={styles.textStyle}>UPDATE</Text>
            </Pressable>
            <Spacer height={20} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MaterialListUpdateVehicleSizeModal;

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0, 0.6)',
  },

  textContainer2: {
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'center',
    paddingHorizontal: 8,
  },

  label: {
    color: COLOR_BLACK,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'WorkSans-Medium',
  },
  modalView: {
    width: width * 0.9,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    // elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'center',
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 16,
    color: COLOR_WHITE,
  },
  labelText: {
    textAlign: 'center',
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 16,
    color: COLOR_GRAY4,
  },
  valueText: {
    textAlign: 'center',
    fontFamily: 'WorkSans-Medium',
    fontSize: 16,
    color: COLOR_GRAY4,
  },
  headerContainer: {
    width: '100%',
    paddingHorizontal: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLOR_BLUE,
  },
  infoContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: COLOR_GRAY5,
  },
  labelContainer: {
    width: '30%',
    paddingVertical: 10,
    borderRightWidth: 0.5,
    borderRightColor: COLOR_GRAY5,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  valueContainer: {
    width: '70%',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingLeft: 8,
    justifyContent: 'flex-start',
  },
  countActionContainer: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR_WHITE,
  },
  inputContainer: {
    width: '40%',
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: COLOR_GRAY2,
    paddingLeft: 4,
    height: 40,
  },
  input: {
    color: COLOR_BLACK,
    fontSize: 14,
    textAlign: 'center',
  },
});
