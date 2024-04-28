import {useEffect, useState} from 'react';
import {
  IFloor,
  IInsurancePercentage,
  ISubmodule,
} from '../interface/common/common';
import {
  IList,
  IPurchasedSubscription,
  ISubscription,
} from '../interface/subscription/subscription';
import {useAppSelector} from '../redux/hooks';
import {TDropdownItem} from '../type/TDropdownItem';
import {useDispatch} from 'react-redux';
import {getCurrentCompanyId} from '../utils/storage';
import {
  getAllDocCountRequest,
  resetGetAllDocCountRequest,
} from '../redux/slices/CommonSlice';

const useUtilityHook = () => {
  const dispatch = useDispatch();
  const {
    insurancePercentages,
    floors,
    submodules,
    allDocCount,
    getAllDocCountRequesting,
    getAllDocCountSuccess,
    getAllDocCountFailure,
  } = useAppSelector(state => state.Common);
  const {purchasedSubscriptions} = useAppSelector(state => state.Subscription);
  console.log('allDocCount----', JSON.stringify(allDocCount));
  const [totalDocuments, setTotalDocuments] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!getAllDocCountRequesting && getAllDocCountSuccess) {
      setLoading(false);
      const {data} = allDocCount || {};
      console.log('allDocCount-2---', JSON.stringify(allDocCount));
      if (data) {
        setTotalDocuments(data?.totalCount);
      }
      dispatch(resetGetAllDocCountRequest());
    } else if (!getAllDocCountRequesting && getAllDocCountFailure) {
      setLoading(false);
      dispatch(resetGetAllDocCountRequest());
    }
  }, [
    getAllDocCountRequesting,
    getAllDocCountSuccess,
    getAllDocCountFailure,
    allDocCount,
  ]);

  const getTotalDocumentCount = () => {
    setLoading(true);
    getCurrentCompanyId()
      .then(id => {
        dispatch(getAllDocCountRequest(id as string));
      })
      .catch(err => console.log(err));
  };

  const getInsurancePercentageList = (): TDropdownItem[] => {
    let list: TDropdownItem[] = [];
    const {data} = insurancePercentages || {};
    if (data && Array.isArray(data) && data.length > 0) {
      list = data.map((d: IInsurancePercentage) => {
        const item: TDropdownItem = {
          label: d.insurancePercentage,
          value: d._id,
        };
        return item;
      });
    }
    return list;
  };

  const getFloorsList = (): TDropdownItem[] => {
    let list: TDropdownItem[] = [];
    const {data} = floors || {};
    if (data && Array.isArray(data) && data.length > 0) {
      list = data.map((d: IFloor) => {
        const item: TDropdownItem = {
          label: d.floor,
          value: d._id,
        };
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

  const getDocumentLimitCount = (submoduleId: string) => {
    let count: number = 0;
    const purchasedPlan: IPurchasedSubscription =
      _getCurrentPlanInfo() as IPurchasedSubscription;
    if (purchasedPlan) {
      const subscription: ISubscription[] = purchasedPlan.subscription;
      if (
        subscription &&
        Array.isArray(subscription) &&
        subscription.length > 0
      ) {
        const list: IList[] = purchasedPlan.subscription[0].list;
        if (list && Array.isArray(list) && list.length > 0) {
          const document: IList = list.find(
            (d: IList) => d.subModuleId == submoduleId,
          ) as IList;
          if (document) {
            count = parseInt(document.qty);
          }
        }
      }
    }
    return count === 0 ? 10 : count;
  };

  const hasSubscription = _getCurrentPlanInfo() !== null;
  console.log('hasSubscription----', hasSubscription);
  console.log('totalDocuments----', totalDocuments);

  return {
    getInsurancePercentageList,
    getFloorsList,
    getDocumentLimitCount,
    getTotalDocumentCount,
    hasSubscription,
    totalDocuments,
    loading,
  };
};

export default useUtilityHook;
