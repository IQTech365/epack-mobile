import moment from 'moment';
import { PINCODE } from '../http/Endpoint';
import { PincodeService } from '../service/PincodeService';
import { TDropdownItem } from '../type/TDropdownItem';

export const formatDate = (date: Date): string => {
  return moment(date).format('DD-MM-YYYY');
};

export const formatDate2 = (date: Date): string => {
  return moment(date).format('YYYY-MM-DD');
};

export const formatDate3 = (date: Date): string => {
  return moment(date).format('MMM D, h:mm a');
};

export const formatDate4 = (date: Date): string => {
  return moment(date).format('MM-DD-YYYY');
};

export const getStates = (arr: any): TDropdownItem[] => {
  let states: TDropdownItem[] = [{label: '', value: ''}];
  const {PostOffice} = arr || {};
  if (PostOffice && Array.isArray(PostOffice)) {
    const stateArr = PostOffice.map(e => e.State);
    const nonDuplicateStateArr = new Set(stateArr);
    states = Array.from(nonDuplicateStateArr).map(e => {
        return {label: e, value: e}
    });
  }
  return states;
};

export const getCities = (arr: any): TDropdownItem[] => {
    let cities: TDropdownItem[] = [{label: '', value: ''}];
    const {PostOffice} = arr || {};
    if (PostOffice && Array.isArray(PostOffice)) {
      const cityArr = PostOffice.map(e => `${e.District}-${e.Name}`);
      const nonDuplicateCityArr = new Set(cityArr);
      cities = Array.from(nonDuplicateCityArr).map(e => {
        return {label: e, value: e}
    });
    }
    return cities;
  };

  const getAddressByPincode = async (pincode:string) => {
    try {
      const result = await PincodeService(PINCODE(pincode));
        console.log('result---------', JSON.stringify(result));
      if (result && Array.isArray(result) && result.length > 0) {
        const pinCodeApiResult = result[0];
        if (pinCodeApiResult.Status == 'Error') {
            // setError();
            // setResult(pinCodeApiResult);
        } else {
        //   resetError();
        //   setResult(pinCodeApiResult);
        }
      }
    } catch (error) {
    //   setFetching(false);
      console.log('error----', error);
    }
  };
