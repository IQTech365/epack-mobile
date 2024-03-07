import React, { useEffect, useRef } from 'react';
import {View} from 'react-native';
import styles from './style';
import {useAppSelector} from '../../../../../redux/hooks';
import {TDropdownItem} from '../../../../../type/TDropdownItem';
import {IVehicleSize} from '../../../../../interface/vehicle/IGetVehicleSizeResponse';
import DropdownComponent from '../../../../../common/DropdownComponent';
import Label from '../../../../../common/Label';
import {useQuotationFormContextHook} from '../../../../../provider/QuotationFormContextProvider';
import Spacer from '../../../../../common/Spacer';
import shiftingLuggages from '../../../../../data/shiftingLuggage.json';
import { IQuotationFreight } from '../../../../../interface/quotation/IGetSingleQuotationResponse';
import { IGetQuotationData } from '../../../../../interface/quotation/IGetQuotationsResponse';
interface IProps {
  isEdit?:boolean;
  item?:IGetQuotationData;
}

const VehicleLoadSizeView: React.FC<IProps> = ({isEdit, item}) => {
  const {vehicleSizeData} = useAppSelector(state => state.Vehicle);
  const {state, setLorryType} = useQuotationFormContextHook();
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
    if(state.editQuotation && state.item) {
      const {item} = state;
      if(item) {
        const quotationfreight:IQuotationFreight = item.quotationfreights;
        if(quotationfreight && quotationfreight.lorryType) {
          const lorryTypeItem:TDropdownItem = _getVehicleSizes().find((d:TDropdownItem) => d.label == quotationfreight?.lorryType) as TDropdownItem;
          if(lorryTypeItem) {
            //@ts-ignore
            lorryTypeDropdownRef && lorryTypeDropdownRef?.current?.setDefaultValue(lorryTypeItem);
            setLorryType(lorryTypeItem.value);
          }
        }
      }
    }
  }, [state.editQuotation, state.item]);

  if (!state.freight_full_load || (state.shifting_luggage == shiftingLuggages[3].label)) return null;

  return (
    <>
      <Spacer height={4} />
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
