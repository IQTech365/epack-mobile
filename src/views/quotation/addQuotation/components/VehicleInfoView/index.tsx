import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import styles from './style';
import Label from '../../../../../common/Label';
import DropdownComponent, { IDropdownHandler } from '../../../../../common/DropdownComponent';
import {TDropdownItem} from '../../../../../type/TDropdownItem';
import {useQuotationFormContextHook} from '../../../../../provider/QuotationFormContextProvider';
import shiftingLuggages from '../../../../../data/shiftingLuggage.json';
import {useAppSelector} from '../../../../../redux/hooks';
import {
  getVehicleCompanyList,
  getVehicleModelList,
  getVehicleTypeList,
} from '../../../../order/orderDetails/components/CarConditionFormView/utils';
import { IGetQuotationData } from '../../../../../interface/quotation/IGetQuotationsResponse';

interface IProps {
  fromEnquiry?:boolean;
  isEdit?:boolean;
  item?:IGetQuotationData;
}

const VehicleInfoView: React.FC<IProps> = ({fromEnquiry, isEdit, item}) => {
  const {state, setVehicleType, setVehicleManufacturer, setVehicleModel} =
    useQuotationFormContextHook();
  const [vehicleTypeId, setVehicleTypeId] = useState<string>('');
  const [vehicleCompanyId, setVehicleCompanyId] = useState<string>('');
  const vehicleTypeCompRef = useRef<IDropdownHandler>(null);
  const vehicleManufaturerCompRef = useRef<IDropdownHandler>(null);
  const vehicleModelCompRef = useRef<IDropdownHandler>(null);

  const {vehicleTypes, vehicleCompanies, vehicleModels} = useAppSelector(
    state => state.Common,
  );

  useEffect(() => {
    if(vehicleTypes && state.shifting_luggage == shiftingLuggages[3].label) {
      const list = getVehicleTypeList(vehicleTypes);
      if(list.length > 0) {
        const firstItem = list[0];
        setVehicleTypeId(firstItem.value);
        setVehicleType(firstItem.label);
      }
    }
  }, [vehicleTypes]);

  useEffect(() => {
    if(isEdit && item && state.shifting_luggage == shiftingLuggages[3].label) {
      const vehicleTypeItem:TDropdownItem = getVehicleTypeList(vehicleTypes).find((d:TDropdownItem) => d.label === item.vehicleType) as TDropdownItem;
      if(vehicleTypeItem) {
        vehicleTypeCompRef.current?.setDefaultValue(vehicleTypeItem);
        setVehicleTypeId(vehicleTypeItem.value);
        setVehicleType(vehicleTypeItem.label);
      }
    }
  }, [isEdit, item, state.shifting_luggage, vehicleTypes]);

  useEffect(() => {
    if(isEdit && item && vehicleTypeId) {
      const vehicleCompanyItem:TDropdownItem = getVehicleCompanyList(vehicleTypeId, vehicleCompanies).find((d:TDropdownItem) => d.label === item.manufacture) as TDropdownItem;
      if(vehicleCompanyItem) {
        vehicleManufaturerCompRef.current?.setDefaultValue(vehicleCompanyItem);
        setVehicleCompanyId(vehicleCompanyItem.value);
        setVehicleManufacturer(vehicleCompanyItem.label);
      }
    }
  }, [isEdit, item, vehicleTypeId]);

  useEffect(() => {
    if(isEdit && item && vehicleCompanyId) {
      const vehicleModelItem:TDropdownItem = getVehicleModelList(vehicleCompanyId, vehicleModels).find((d:TDropdownItem) => d.label === item.model) as TDropdownItem;
      if(vehicleModelItem) {
        vehicleModelCompRef.current?.setDefaultValue(vehicleModelItem);
        setVehicleModel(vehicleModelItem.label);
      }
    }
  }, [isEdit, item, vehicleCompanyId]);

  if (state.shifting_luggage !== shiftingLuggages[3].label) return null;

  return (
    <>
      <View style={styles.fullWidthContainer}>
        <Label text="Vehicle Type" style={styles.label} />
        <DropdownComponent
          data={getVehicleTypeList(vehicleTypes)}
          onSelect={(item: TDropdownItem) => {
            setVehicleTypeId(item.value);
            setVehicleType(item.label);
          }}
          //@ts-ignore
          ref={vehicleTypeCompRef}
        />
      </View>
      <View style={styles.fullWidthContainer}>
        <Label text="Vehicle Manufacturer" style={styles.label} />
        <DropdownComponent
          data={getVehicleCompanyList(vehicleTypeId, vehicleCompanies)}
          onSelect={(item: TDropdownItem) => {
            setVehicleCompanyId(item.value);
            setVehicleManufacturer(item.label);
          }}
          //@ts-ignore
          ref={vehicleManufaturerCompRef}
        />
      </View>
      <View style={styles.fullWidthContainer}>
        <Label text="Vehicle Model" style={styles.label} />
        <DropdownComponent
          data={getVehicleModelList(vehicleCompanyId, vehicleModels)}
          onSelect={(item: TDropdownItem) => {
            setVehicleModel(item.label);
          }}
          //@ts-ignore
          ref={vehicleModelCompRef}
        />
      </View>
    </>
  );
};

export default VehicleInfoView;
