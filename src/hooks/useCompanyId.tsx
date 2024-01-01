import React from "react";
import { useAppSelector } from "../redux/hooks";
import { getCurrentCompanyId } from "../utils/storage";
import { ICompanyInfoData } from "../interface/companyRegistration/IGetCompaniesResponse";

const _getCurrentCompanyId = async () => {

}

const useCompanyId = async () => {
    const {addCompanyInfo, companies} = useAppSelector(state => state.Company);
    let companyId;
    const {data} = addCompanyInfo || {};
    const {data: companiesData} = companies || {};
    if (data && Object.keys(data).length > 0) {
      companyId = data._id;
    } else if (
      companiesData &&
      Array.isArray(companiesData) &&
      companiesData.length > 0
    ) {
      // const firstCompany = companiesData[0];
      companyId = await getCurrentCompanyId();
    } else if(companiesData && companiesData.hasOwnProperty('_id')) {
      companyId = companiesData._id;
    }
    console.log('companyId--', companyId);
    return companyId;
}

export default useCompanyId;