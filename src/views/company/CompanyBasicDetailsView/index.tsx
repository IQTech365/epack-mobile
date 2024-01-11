import React from 'react';
import {
  CompanyRegistrationContextProvider,
} from '../../../provider/CompanyRegistrationContextProvider';
import CompanyBasicDetailsForm from './CompanyBasicDetailsForm';

interface IProps {}

const CompanyBasicDetailsView: React.FC<IProps> = (props: any) => {
  return (
    <CompanyRegistrationContextProvider>
      <CompanyBasicDetailsForm navigation={props.navigation} />
    </CompanyRegistrationContextProvider>
  );
};

export default CompanyBasicDetailsView;
