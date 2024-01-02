import React, { useState } from 'react';
import {useAppSelector} from '../redux/hooks';
import {getCurrentCompanyId} from '../utils/storage';

const useCompanyId = () => {
  const [companyId, setCompanyId] = useState<string>('');
  const {addCompanyInfo, companies} = useAppSelector(state => state.Company);

  const _getCompanyIdFromStorage = async () => {
    const result = await getCurrentCompanyId();
    setCompanyId(result as string);
  }
  const {data} = addCompanyInfo || {};
  const {data: companiesData} = companies || {};
  if (data && Object.keys(data).length > 0) {
    // companyId = data._id;
    setCompanyId(data._id);
  } else if (
    companiesData &&
    Array.isArray(companiesData) &&
    companiesData.length > 0
  ) {
    _getCompanyIdFromStorage();
  } else if (companiesData && companiesData.hasOwnProperty('_id')) {
    setCompanyId(companiesData._id)
  }
  console.log('companyId--', companyId);
  return companyId;
};

export default useCompanyId;
