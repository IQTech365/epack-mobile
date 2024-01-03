import React from 'react';
import {View} from 'react-native';
import styles from './style';
import {useAppSelector} from '../../../../../redux/hooks';
import {TDropdownItem} from '../../../../../type/TDropdownItem';
import {IVehicleSize} from '../../../../../interface/vehicle/IGetVehicleSizeResponse';
import DropdownComponent from '../../../../../common/DropdownComponent';
import Label from '../../../../../common/Label';
import {useQuotationFormContextHook} from '../../../../../provider/QuotationFormContextProvider';
import Spacer from '../../../../../common/Spacer';

interface IProps {
  //
}

const VehicleLoadSizeView: React.FC<IProps> = ({}) => {
  const {vehicleSizeData} = useAppSelector(state => state.Vehicle);
  const {state, setLorryType} = useQuotationFormContextHook();

  if (!state.freight_full_load) return null;

  const _getVehicleSizes = () => {
    let vehicleSizes: TDropdownItem[] = [];
    const {data} = vehicleSizeData || {};
    if (data && Array.isArray(data) && data.length > 0) {
      vehicleSizes = data.map((d: IVehicleSize) => {
        const item: TDropdownItem = {
          label: d.vehicleSize,
          value: d.vehicleSize,
        };
        return item;
      });
    }
    return vehicleSizes;
  };

  return (
    <>
      <Spacer height={4} />
      <View style={styles.fullWidthContainer}>
        <Label text="Vehicle Load Size" style={styles.label} />
        <DropdownComponent
          data={_getVehicleSizes()}
          onSelect={(item: TDropdownItem) => {
            setLorryType(item.label);
          }}
        />
      </View>
    </>
  );
};

export default VehicleLoadSizeView;
