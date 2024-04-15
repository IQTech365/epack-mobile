import {IFloor, IInsurancePercentage, ISubmodule} from '../interface/common/common';
import { IList, IPurchasedSubscription, ISubscription } from '../interface/subscription/subscription';
import {useAppSelector} from '../redux/hooks';
import { TDropdownItem } from '../type/TDropdownItem';

const useUtilityHook = () => {
  const {insurancePercentages, floors, submodules} = useAppSelector(state => state.Common);
  const {purchasedSubscriptions} = useAppSelector(state => state.Subscription);

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

  const _getCurrentPlanInfo = () => {
    const {data} = purchasedSubscriptions || {};
    let plan: IPurchasedSubscription | null = null;
    if (data && Array.isArray(data) && data.length > 0) {
      plan = data[0] as IPurchasedSubscription;
    }
    return plan;
  };

  //658d3c30585e3dde644da94d - Enquiry
  const getDocumentLimitCount = (submoduleId:string) => {
    let count:number = 0;
    const purchasedPlan:IPurchasedSubscription = _getCurrentPlanInfo() as IPurchasedSubscription;
    if(purchasedPlan) {
      const subscription:ISubscription[] = purchasedPlan.subscription;
      if(subscription && Array.isArray(subscription) && subscription.length > 0) {
        const list:IList[] = purchasedPlan.subscription[0].list;
        if(list && Array.isArray(list) && list.length > 0) {
          const document:IList = list.find((d:IList) => d.subModuleId == submoduleId) as IList;
          if(document) {
            count = parseInt(document.qty);
          }
        }

      }
    }
    return count === 0 ? 10 : count;
  }

  return {getInsurancePercentageList, getFloorsList, getDocumentLimitCount};
};

export default useUtilityHook;
