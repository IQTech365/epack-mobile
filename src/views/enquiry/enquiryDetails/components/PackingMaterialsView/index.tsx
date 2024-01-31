import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, FlatList} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import styles from './style';
import Spacer from '../../../../../common/Spacer';
import DropdownComponent from '../../../../../common/DropdownComponent';
import {TDropdownItem} from '../../../../../type/TDropdownItem';
import Label from '../../../../../common/Label';
import Button from '../../../../../common/Button';
import Input from '../../../../../common/Input';
import {COLOR_BLACK} from '../../../../../utils/colors';
import {IAddPackingMaterialRequest} from '../../../../../interface/enquiry/IAddPackingMaterialRequest';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import {
  addPackingMaterialRequest,
  resetPackingMaterialRequest,
} from '../../../../../redux/slices/EnquirySlice';
import Spinner from '../../../../../common/Spinner';
import {getUnitTypeRequest} from '../../../../../redux/slices/ProfileSettingSlice';
import {getVehicleSizeRequest} from '../../../../../redux/slices/VehicleSlice';
import useAuthId from '../../../../../hooks/useAuthId';
import {ToastType, showToast} from '../../../../../utils/utility';
import ManagePackingMaterialView from './ManagePackingMaterialView';
import {IPackingItem, getMaterialTypeEnum, materials} from './utils';
import { useNavigation } from '@react-navigation/native';

interface IProps {
  enquiryId: string;
}

const PackingMaterialsView: React.FC<IProps> = ({enquiryId}) => {
  const authId = useAuthId();
  const navigation = useNavigation();
  const [vehicleLoadSize, setVehicleLoadSize] = useState('');
  const [packingItems, setPackingItems] = useState<IPackingItem[]>([]);
  const [materialTypes, setMaterialTypes] = useState<string[]>(materials);
  const [extraMaterialName, setExtraMaterialName] = useState<string>('');
  console.log('packing-items---', JSON.stringify(packingItems));
  
  const {
    addPackingMaterialsRequesting,
    addPackingMaterialsSuccess,
    addPackingMaterialsFailure,
  } = useAppSelector(state => state.Enquiry);
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

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUnitTypeRequest());
    dispatch(getVehicleSizeRequest());
    if (!addPackingMaterialsRequesting && addPackingMaterialsSuccess) {
      showToast('Packing Materials Added.', ToastType.SUCCESS);
      dispatch(resetPackingMaterialRequest());
    } else if (!addPackingMaterialsRequesting && addPackingMaterialsFailure) {
      showToast('Packing Materials Not Addded.', ToastType.ERROR);
      dispatch(resetPackingMaterialRequest());
    }
  }, [
    addPackingMaterialsRequesting,
    addPackingMaterialsSuccess,
    addPackingMaterialsFailure,
    dispatch,
  ]);

  const handleLorryType = (item: TDropdownItem) => {
    setVehicleLoadSize(item.value);
  };

  const _handlePackingMaterialChange = (item:IPackingItem, index: number) => {
    const copy = [...packingItems];
    copy.splice(index, 1, item);
    setPackingItems(copy);
  };

  const handleAddInput = (text: string) => {
    setExtraMaterialName(text);
  };

  const addItem = () => {
    const copy = [...materialTypes];
    copy.push(extraMaterialName);
    setMaterialTypes(copy);
  };

  const onSubmit = () => {
    const payload: IAddPackingMaterialRequest = {
      enquiryId: enquiryId,
      vehicleLoadSize: vehicleLoadSize,
      packingMaterial: packingItems,
      addedBy: authId,
    };
    dispatch(addPackingMaterialRequest(payload));
  };

  const handleShowList = () => {
    //@ts-ignore
    navigation.navigate('EditPackingMaterials', {enquiryId: enquiryId})
  };

  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.container}>
        <Spacer height={4} />
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>Material List Form</Text>
          <TouchableOpacity
            style={styles.showListButtonContainer}
            onPress={handleShowList}>
            <Text style={styles.buttonText}>SHOW LIST</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.textContainer2}>
          <Label text="Vehicle Load Size" style={styles.label} />
          <DropdownComponent
            data={vehicleSizeArray()}
            onSelect={handleLorryType}
          />
        </View>
        <Spacer height={4} />
        <FlatList
          data={materialTypes}
          renderItem={({item, index}) => (
            <ManagePackingMaterialView
              title={item}
              unitRequired={item !== materialTypes[0]}
              materialType={getMaterialTypeEnum(item)}
              index={index}
              onChange={_handlePackingMaterialChange}
            />
          )}
        />
        <Spacer height={8} />
        <View style={styles.mainWrapper}>
          <View style={styles.textContainer}>
            <Label text="Others" style={styles.label} />
            <View style={styles.wrapConatiner}>
              <Input
                onChangeText={handleAddInput}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />

              <View style={styles.dropDownStyle}>
                <Button
                  text="ADD"
                  onPress={addItem}
                  disabled={false}
                  style={styles.previewAddButtonStyle}
                  textStyle={styles.textStyle}
                />
              </View>
            </View>
          </View>
        </View>
        <Spacer height={8} />
        <Button
          text="SUBMIT"
          onPress={onSubmit}
          disabled={false}
          style={styles.previewButtonStyle}
          textStyle={styles.textStyle}
        />
        <Spacer height={12} />
        <Spinner show={addPackingMaterialsRequesting} />
      </View>
    </AvoidSoftInputViewHOC>
  );
};

export default PackingMaterialsView;
