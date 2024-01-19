import {IFloor, IInsurancePercentage} from '../interface/common/common';
import {useAppSelector} from '../redux/hooks';
import { TDropdownItem } from '../type/TDropdownItem';

const useUtilityHook = () => {
  const {insurancePercentages, floors} = useAppSelector(state => state.Common);

  const getInsurancePercentageList = (): TDropdownItem[] => {
    let list: TDropdownItem[] = [];
    const {data} = insurancePercentages || {};
    if (data && Array.isArray(data) && data.length > 0) {
      list = data.map((d:IInsurancePercentage) => {
        const item:TDropdownItem = {
          label: d.insurancePercentage,
          value: d._id
        }
        return item;
      });
    }
    return list;
  };

  const getFloorsList = (): TDropdownItem[] => {
    let list: TDropdownItem[] = [];
    const {data} = floors || {};
    if (data && Array.isArray(data) && data.length > 0) {
      list = data.map((d:IFloor) => {
        const item:TDropdownItem = {
          label: d.floor,
          value: d._id,
        }
        return item;
      });
    }
    return list;
  };

  return {getInsurancePercentageList, getFloorsList};
};

export default useUtilityHook;
