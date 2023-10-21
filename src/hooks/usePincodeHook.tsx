import React, {useEffect, useState} from 'react';
import {PINCODE} from '../http/Endpoint';
import {PincodeService} from '../service/PincodeService';

export enum PINCODE_REQUEST_KEY {
  ADD_QUOTATION_PICKUP_ADDRESS = 'ADD_QUOTATION_PICKUP_ADDRESS',
  ADD_QUOTATION_DELIVERY_ADDRESS = 'ADD_QUOTATION_DELIVERY_ADDRESS',
  ADD_ORDER_PICKUP_ADDRESS = 'ADD_ORDER_PICKUP_ADDRESS',
  ADD_ORDER_DELIVERY_ADDRESS = 'ADD_ORDER_DELIVERY_ADDRESS',
  ADD_ENQUIRY_PICKUP_ADDRESS = 'ADD_ENQUIRY_PICKUP_ADDRESS',
  ADD_ENQUIRY_DELIVERY_ADDRESS = 'ADD_ENQUIRY_DELIVERY_ADDRESS',
  BILTY_CONSIGNER_ADDRESS = 'BILTY_CONSIGNER_ADDRESS',
  BILTY_LOADING_ADDRESS = 'BILTY_LOADING_ADDRESS',
  BILTY_CONSIGNEE_ADDRESS = 'BILTY_CONSIGNEE_ADDRESS',
  BILTY_UNLOADING_ADDRESS = 'BILTY_UNLOADING_ADDRESS',
  ADD_FRANCHISE_ADDRESS = 'ADD_FRANCHISE_ADDRESS',
}

const usePincodeHook = (setError: () => void, resetError: () => void) => {
  const [result, setResult] = useState<any>(null);
  const [fetching, setFetching] = useState<boolean>(false);
  const [pincode, setPincode] = useState<string>('');

  const resetPincodeHookState = () => {
    setResult(null);
    setPincode('');
  };

  // console.log('pincode---------', pincode);
  const getAddressByPincode = async () => {
    try {
      resetPincodeHookState();
      setFetching(true);
      const result = await PincodeService(PINCODE(pincode));
      console.log('result---------', JSON.stringify(result));
      setFetching(false);
      if (result && Array.isArray(result) && result.length > 0) {
        const pinCodeApiResult = result[0];
        if (pinCodeApiResult.Status == 'Error') {
          setError();
          setResult(pinCodeApiResult);
        } else {
          resetError();
          setResult(pinCodeApiResult);
        }
      }
    } catch (error) {
      setFetching(false);
      console.log('error----', error);
    }
  };

  useEffect(() => {
    if (pincode.length >= 6) {
      getAddressByPincode();
    }
  }, [pincode]);

  return {result, fetching, setPincode, resetPincodeHookState};
};

export default usePincodeHook;
