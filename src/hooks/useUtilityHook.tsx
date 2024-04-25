import { useEffect } from 'react';
import {IFloor, IInsurancePercentage, ISubmodule} from '../interface/common/common';
import { IList, IPurchasedSubscription, ISubscription } from '../interface/subscription/subscription';
import {useAppSelector} from '../redux/hooks';
import { TDropdownItem } from '../type/TDropdownItem';
import { getQuotationHtmlRequest, getQuotationsRequest } from '../redux/slices/QuotationSlice';
import { useDispatch } from 'react-redux';
import { getBiltyListRequest, getCarConditionListRequest, getInvoiceListRequest, getMoneyReceiptListRequest } from '../redux/slices/OrderSlice';
import { addSurveyItemRequest, getSurveyItemListRequest } from '../redux/slices/EnquirySlice';
import { getCurrentCompanyId } from '../utils/storage';
import { IGetQuotationRequest } from '../interface/quotation/IGetQuotationRequest';

const useUtilityHook = () => {
  const dispatch = useDispatch()
  const {insurancePercentages, floors, submodules} = useAppSelector(state => state.Common);
  const {purchasedSubscriptions} = useAppSelector(state => state.Subscription);


  // useEffect(()=>{
  //   _getQuotationsRequest();
  //   dispatch(getMoneyReceiptListRequest())
  //   dispatch(getCarConditionListRequest())
  //   dispatch(getInvoiceListRequest())
  // },[])


  const _getQuotationsRequest = () => {
    getCurrentCompanyId()
      .then(id => {
        const payload: IGetQuotationRequest = {
          companyId: id as string,
        };
        dispatch(getQuotationsRequest(payload));
      })
      .catch(err => console.log(err));
  };

  // Quotation
  const {quotations = []} = useAppSelector(state => state.Quotation);
  const getTotalQuotations = () => {
    const { data } = quotations || {};
    let _count = 0;
    if (data && Array.isArray(data)) {
      _count = data.length;
    }    
    return _count;
  };

  // Bilty
  const {biltyList, invoices, moneyReceiptList, carConditionList} = useAppSelector(state => state.Order);
  const getTotalBilty = () => {
    const {data} = biltyList || {};
    let _count = 0;
    if (data && Array.isArray(data)) {
      _count = data.length;
    }
    return _count;
  };

  // Invoice
  const getTotalInvoice = () => {
    const { data } = invoices || {};
    let _count = 0;
    if (data && Array.isArray(data)) {
      _count = data.length;
    }
    return _count;
  };

  // Money Receipt
  const getMoneyReceiptDocCount = ():number => {
    const {data} = moneyReceiptList || {};
    let count:number = 0;
    if(data && Array.isArray(data)) {
      count = data.length;
    }
    return count;
  }

  // Vehicle Conditions
  const getVehicleConditionsDocCount = ():number => {
    const {data} = carConditionList || {};
    let count:number = 0;
    if(data && Array.isArray(data)) {
      count = data.length;
    }
    return count;
  }
  

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

  const getAllDocCountWithSubscriptionStatus = () => {
    const quotationCount = getTotalQuotations();
    const biltyCount = getTotalBilty();
    const invoiceCount = getTotalInvoice();
    const carConditionsCount = getVehicleConditionsDocCount();
    const moneyReceiptCount = getMoneyReceiptDocCount();
    const totalDocs = quotationCount + invoiceCount + biltyCount + carConditionsCount + moneyReceiptCount;
    const hasSubscription = _getCurrentPlanInfo() !== null;
    console.log('totalDocs----', totalDocs);
    console.log('hasSubscription----', hasSubscription);
    return {totalDocs, hasSubscription};
  }


  return {getInsurancePercentageList, getFloorsList, getDocumentLimitCount, getAllDocCountWithSubscriptionStatus};
};

export default useUtilityHook;
