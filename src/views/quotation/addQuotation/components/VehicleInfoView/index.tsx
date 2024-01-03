import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import styles from './style';
import Label from '../../../../../common/Label';
import DropdownComponent from '../../../../../common/DropdownComponent';
import {TDropdownItem} from '../../../../../type/TDropdownItem';
import {useQuotationFormContextHook} from '../../../../../provider/QuotationFormContextProvider';
import shiftingLuggages from '../../../../../data/shiftingLuggage.json';
import {useAppSelector} from '../../../../../redux/hooks';
import {
  getVehicleCompanyList,
  getVehicleModelList,
  getVehicleTypeList,
} from '../../../../order/orderDetails/components/CarConditionFormView/utils';

interface IProps {}

const VehicleInfoView: React.FC<IProps> = ({}) => {
  const {state, setVehicleType, setVehicleManufacturer, setVehicleModel} =
    useQuotationFormContextHook();
  const [vehicleTypeId, setVehicleTypeId] = useState<string>('');
  const [vehicleCompanyId, setVehicleCompanyId] = useState<string>('');
  const vehicleTypeCompRef = useRef(null);
  const vehicleManufaturerCompRef = useRef(null);
  const vehicleModelCompRef = useRef(null);

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
