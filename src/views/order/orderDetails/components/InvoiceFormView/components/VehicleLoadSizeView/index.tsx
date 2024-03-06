import React, { useEffect, useRef } from 'react';
import {View} from 'react-native';
import styles from './style';
import {useAppSelector} from '../../../../../../../redux/hooks';
import {TDropdownItem} from '../../../../../../../type/TDropdownItem';
import {IVehicleSize} from '../../../../../../../interface/vehicle/IGetVehicleSizeResponse';
import DropdownComponent from '../../../../../../../common/DropdownComponent';
import Label from '../../../../../../../common/Label';
import { useInvoiceFormContextHook } from '../../../../../../../provider/InvoiceFormContextProvider';
import { IInvoice } from '../../../../../../../interface/order/IGetInvoiceListResponse';
interface IProps {
  isEdit?:boolean;
  invoiceData?:IInvoice;
}

const VehicleLoadSizeView: React.FC<IProps> = ({isEdit, invoiceData}) => {
  const {vehicleSizeData} = useAppSelector(state => state.Vehicle);
  const {setLorryType} = useInvoiceFormContextHook();
  const lorryTypeDropdownRef = useRef(null);

  const _getVehicleSizes = () => {
    let vehicleSizes: TDropdownItem[] = [];
    const {data} = vehicleSizeData || {};
    if (data && Array.isArray(data) && data.length > 0) {
      vehicleSizes = data.map((d: IVehicleSize) => {
        const item: TDropdownItem = {
          label: d.vehicleSize,
          value: d._id,
        };
        return item;
      });
    }
    return vehicleSizes;
  };

  useEffect(() => {
    if(isEdit && invoiceData) {
      const {vehicleLoadSize} = invoiceData || {};
      setLorryType(vehicleLoadSize);
      const vehicleSizeList = _getVehicleSizes();
      if(vehicleSizeList && vehicleSizeList.length > 0) {
        const vechileSizeItem:TDropdownItem = vehicleSizeList.find((e:TDropdownItem) => e.value == vehicleLoadSize) as TDropdownItem;
        if(vechileSizeItem !== undefined){
          //@ts-ignore
          lorryTypeDropdownRef && lorryTypeDropdownRef?.current?.setDefaultValue(vechileSizeItem);
        }
      }
    }
  }, [isEdit]);

  return (
    <>
      <View style={styles.fullWidthContainer}>
        <Label text="Vehicle Load Size" style={styles.label} />
        <DropdownComponent
          data={_getVehicleSizes()}
          onSelect={(item: TDropdownItem) => {
            setLorryType(item.value);
          }}
          //@ts-ignore
          ref={lorryTypeDropdownRef}
        />
      </View>
    </>
  );
};

export default VehicleLoadSizeView;
