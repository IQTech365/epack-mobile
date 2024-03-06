import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import styles from './style';
import Label from '../../../../../../../common/Label';
import DropdownComponent from '../../../../../../../common/DropdownComponent';
import {TDropdownItem} from '../../../../../../../type/TDropdownItem';
import shiftingLuggages from '../../../../../../../data/shiftingLuggage.json';
import {useAppSelector} from '../../../../../../../redux/hooks';
import {
  getVehicleCompanyList,
  getVehicleModelList,
  getVehicleTypeList,
} from '../../../CarConditionFormView/utils';
import { useInvoiceFormContextHook } from '../../../../../../../provider/InvoiceFormContextProvider';
import { IInvoice } from '../../../../../../../interface/order/IGetInvoiceListResponse';

interface IProps {
  isEdit?:boolean;
  invoiceData?:IInvoice;
}

const VehicleInfoView: React.FC<IProps> = ({isEdit, invoiceData}) => {
  const {state, setVehicleType, setVehicleManufacturer, setVehicleModel} = useInvoiceFormContextHook();
  const [vehicleTypeId, setVehicleTypeId] = useState<string>('');
  const [vehicleCompanyId, setVehicleCompanyId] = useState<string>('');
  const vehicleTypeCompRef = useRef(null);
  const vehicleManufaturerCompRef = useRef(null);
  const vehicleModelCompRef = useRef(null);

  const {vehicleTypes, vehicleCompanies, vehicleModels} = useAppSelector(
    state => state.Common,
  );

  useEffect(() => {
    if(isEdit && invoiceData) {
      const {vehicleType, manufacture, model} = invoiceData || {};
      setVehicleType(vehicleType);
      const vechileTypeList = getVehicleTypeList(vehicleTypes);
      if(vechileTypeList && vechileTypeList.length > 0) {
        const vechileTypeItem:TDropdownItem = vechileTypeList.find((e:TDropdownItem) => e.label == vehicleType) as TDropdownItem;
        if(vechileTypeItem !== undefined){
          setVehicleTypeId(vechileTypeItem.value);
          //@ts-ignore
          vehicleTypeCompRef && vehicleTypeCompRef?.current?.setDefaultValue(vechileTypeItem);
        }
      }
    }
  }, [isEdit]);

  useEffect(() => {
    if(isEdit && invoiceData) {
      const {manufacture} = invoiceData || {};
      setVehicleManufacturer(manufacture);
      const vehicleCompanyList = getVehicleCompanyList(vehicleTypeId, vehicleCompanies);
      if(vehicleCompanyList && vehicleCompanyList.length > 0) {
        const vechileCompanyItem:TDropdownItem = vehicleCompanyList.find((e:TDropdownItem) => e.label == manufacture) as TDropdownItem;
        if(vechileCompanyItem !== undefined){
          setVehicleCompanyId(vechileCompanyItem.value);
          //@ts-ignore
          vehicleManufaturerCompRef && vehicleManufaturerCompRef?.current?.setDefaultValue(vechileCompanyItem);
        }
      }
    }
  }, [vehicleTypeId]);

  useEffect(() => {
    if(isEdit && invoiceData) {
      const {model} = invoiceData || {};
      setVehicleModel(model);
      const vehicleModelList = getVehicleModelList(vehicleCompanyId, vehicleModels);
      if(vehicleModelList && vehicleModelList.length > 0) {
        const vechileModelItem:TDropdownItem = vehicleModelList.find((e:TDropdownItem) => e.label == model) as TDropdownItem;
        if(vechileModelItem !== undefined){
          //@ts-ignore
          vehicleModelCompRef && vehicleModelCompRef?.current?.setDefaultValue(vechileModelItem);
        }
      }
    }
  }, [vehicleCompanyId]);

  useEffect(() => {
    if(!isEdit && vehicleTypes && state.shifting_luggage == shiftingLuggages[3].label) {
      const list = getVehicleTypeList(vehicleTypes);
      if(list.length > 0) {
        const firstItem = list[0];
        setVehicleTypeId(firstItem.value);
        setVehicleType(firstItem.label);
      }
    }
  }, [vehicleTypes]);

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
